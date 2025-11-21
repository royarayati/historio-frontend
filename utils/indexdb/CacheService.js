// Enhanced cacheService.js with better error handling and performance
const DB_NAME = 'HospitalCache';
const STORE_NAME = 'cacheStore';
const TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const DB_VERSION = 2; // Incremented for new features

// Cache metrics for debugging
const cacheMetrics = {
  hits: 0,
  misses: 0,
  errors: 0,
  lastCleanup: Date.now()
};

// Connection pooling to avoid multiple DB connections
let dbConnection = null;
let connectionPromise = null;

function openDB() {
  // Return existing connection if available
  if (dbConnection && !dbConnection.version) {
    return Promise.resolve(dbConnection);
  }

  // Return existing promise if connection is in progress
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: ['patientId', 'cacheKey'] });
        store.createIndex('expiresAt', 'expiresAt', { unique: false });
        store.createIndex('patientId', 'patientId', { unique: false });
        store.createIndex('storedAt', 'storedAt', { unique: false });
      }

      // Add new indexes for better performance
      if (event.oldVersion < 2) {
        const store = request.transaction.objectStore(STORE_NAME);
        if (!store.indexNames.contains('patientId')) {
          store.createIndex('patientId', 'patientId', { unique: false });
        }
        if (!store.indexNames.contains('storedAt')) {
          store.createIndex('storedAt', 'storedAt', { unique: false });
        }
      }
    };

    request.onsuccess = () => {
      dbConnection = request.result;
      resolve(dbConnection);
    };

    request.onerror = () => {
      cacheMetrics.errors++;
      reject(request.error);
    };

    request.onblocked = () => {
      console.warn('IndexedDB upgrade blocked. Please close other tabs.');
    };
  });

  return connectionPromise;
}

// Cleanup expired entries periodically
async function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - cacheMetrics.lastCleanup < 60 * 60 * 1000) return; // Only cleanup once per hour

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('expiresAt');
    
    const range = IDBKeyRange.upperBound(now);
    const request = index.openCursor(range);
    
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
    
    await tx.complete;
    cacheMetrics.lastCleanup = now;
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}

export async function setCache(patientId, cacheKey, data, options = {}) {
  // CRITICAL: Validate inputs before proceeding
  if (!patientId || typeof patientId !== 'string') {
    throw new Error(`CRITICAL: Invalid patientId provided to setCache: ${patientId}`);
  }
  if (!cacheKey || typeof cacheKey !== 'string') {
    throw new Error(`CRITICAL: Invalid cacheKey provided to setCache: ${cacheKey}`);
  }
  if (data === null || data === undefined) {
    throw new Error(`CRITICAL: Invalid data provided to setCache for ${patientId}/${cacheKey}`);
  }

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const ttl = options.ttl || TTL_MS;
    const now = Date.now();
    const record = {
      patientId: String(patientId).trim(), // Ensure string and trim whitespace
      cacheKey: String(cacheKey).trim(),   // Ensure string and trim whitespace
      data,
      storedAt: now,
      expiresAt: now + ttl,
      version: options.version || 1,
      tags: options.tags || [],
      // Add validation hash for data integrity
      dataHash: btoa(JSON.stringify(data)).slice(0, 16), // Simple hash for validation
    };

    console.log(`[CACHE SET] Storing data for patientId: "${record.patientId}", cacheKey: "${record.cacheKey}"`, {
      dataSize: JSON.stringify(data).length,
      dataHash: record.dataHash,
      expiresAt: new Date(record.expiresAt).toISOString()
    });

    await new Promise((resolve, reject) => {
      const req = store.put(record);
      req.onsuccess = () => {
        console.log(`[CACHE SET SUCCESS] Data stored for ${record.patientId}/${record.cacheKey}`);
        resolve(req.result);
      };
      req.onerror = (error) => {
        console.error(`[CACHE SET ERROR] Failed to store data for ${record.patientId}/${record.cacheKey}:`, error);
        reject(error);
      };
    });

    await tx.complete;
    
    // Trigger cleanup if needed
    cleanupExpiredEntries();
    
    return true;
  } catch (error) {
    cacheMetrics.errors++;
    console.error(`[CACHE SET CRITICAL ERROR] Failed to store data for patientId: "${patientId}", cacheKey: "${cacheKey}":`, error);
    throw error;
  }
}

export async function getCache(patientId, cacheKey) {
  // Fail-safe: If inputs are invalid, just return null (no error)
  if (!patientId || typeof patientId !== 'string' || patientId.trim() === '') {
    console.log(`[CACHE GET] Invalid patientId, skipping cache: ${patientId}`);
    cacheMetrics.misses++;
    return null;
  }
  if (!cacheKey || typeof cacheKey !== 'string' || cacheKey.trim() === '') {
    console.log(`[CACHE GET] Invalid cacheKey, skipping cache: ${cacheKey}`);
    cacheMetrics.misses++;
    return null;
  }

  // Normalize inputs (trim whitespace)
  const normalizedPatientId = String(patientId).trim();
  const normalizedCacheKey = String(cacheKey).trim();

  console.log(`[CACHE GET] Retrieving data for patientId: "${normalizedPatientId}", cacheKey: "${normalizedCacheKey}"`);

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const record = await new Promise((resolve, reject) => {
      const req = store.get([normalizedPatientId, normalizedCacheKey]);
      req.onsuccess = () => {
        console.log(`[CACHE GET] Database query completed for ${normalizedPatientId}/${normalizedCacheKey}`, {
          found: !!req.result,
          recordExists: !!req.result
        });
        resolve(req.result);
      };
      req.onerror = (error) => {
        console.log(`[CACHE GET] Database query failed, falling back to API: ${normalizedPatientId}/${normalizedCacheKey}`);
        resolve(null); // Don't reject, just return null
      };
    });

    await tx.complete;

    if (!record) {
      console.log(`[CACHE MISS] No data found for patientId: "${normalizedPatientId}", cacheKey: "${normalizedCacheKey}"`);
      cacheMetrics.misses++;
      return null;
    }

    // Fail-safe: If record doesn't match exactly, just return null (no error)
    if (record.patientId !== normalizedPatientId || record.cacheKey !== normalizedCacheKey) {
      console.log(`[CACHE MISMATCH] Data mismatch, falling back to API. Expected: ${normalizedPatientId}/${normalizedCacheKey}, Got: ${record.patientId}/${record.cacheKey}`);
      cacheMetrics.misses++;
      return null;
    }

    // Check if expired
    const now = Date.now();
    if (now > record.expiresAt) {
      console.log(`[CACHE EXPIRED] Data expired, falling back to API for patientId: "${normalizedPatientId}", cacheKey: "${normalizedCacheKey}"`, {
        storedAt: new Date(record.storedAt).toISOString(),
        expiresAt: new Date(record.expiresAt).toISOString(),
        ageMinutes: Math.round((now - record.storedAt) / 60000)
      });
      cacheMetrics.misses++;
      // Delete expired record asynchronously
      deleteCache(normalizedPatientId, normalizedCacheKey).catch(() => {}); // Silent fail
      return null;
    }

    // Fail-safe: If data integrity check fails, just return null (no error)
    if (record.dataHash) {
      const currentDataHash = btoa(JSON.stringify(record.data)).slice(0, 16);
      if (currentDataHash !== record.dataHash) {
        console.log(`[CACHE DATA CORRUPTION] Data hash mismatch, falling back to API for ${normalizedPatientId}/${normalizedCacheKey}`);
        cacheMetrics.misses++;
        return null;
      }
    }

    console.log(`[CACHE HIT] Data retrieved successfully for patientId: "${normalizedPatientId}", cacheKey: "${normalizedCacheKey}"`, {
      dataSize: JSON.stringify(record.data).length,
      dataHash: record.dataHash,
      ageMinutes: Math.round((now - record.storedAt) / 60000),
      expiresInMinutes: Math.round((record.expiresAt - now) / 60000)
    });

    cacheMetrics.hits++;
    return record.data;
  } catch (error) {
    cacheMetrics.errors++;
    console.log(`[CACHE GET] Error occurred, falling back to API for patientId: "${normalizedPatientId}", cacheKey: "${normalizedCacheKey}":`, error.message);
    return null; // Always return null on error, never throw
  }
}

export async function deleteCache(patientId, cacheKey) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    await new Promise((resolve, reject) => {
      const req = store.delete([patientId, cacheKey]);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    await tx.complete;
    return true;
  } catch (error) {
    cacheMetrics.errors++;
    console.error('Cache delete failed:', error);
    throw error;
  }
}

