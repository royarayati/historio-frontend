import Dexie from 'dexie';

// Initialize the database
const db = new Dexie('PatientCacheDB');

// Define database schema
db.version(1).stores({
  patientCache: '&[patientId+cacheKey], patientId, cacheKey, lastUpdated, expiresAt'
});

// Add automatic timestamps and expiration
db.patientCache.hook('creating', (primKey, obj) => {
  obj.lastUpdated = new Date();
  if (obj.ttl) {
    obj.expiresAt = new Date(Date.now() + obj.ttl);
  }
});

db.patientCache.hook('updating', (modifications, primKey, obj) => {
  modifications.lastUpdated = new Date();
  if (modifications.ttl) {
    modifications.expiresAt = new Date(Date.now() + modifications.ttl);
  }
  return modifications;
});

// Cache Service Implementation
const cacheService = {
  /**
   * Store data with a specific cache key for a patient
   * @param {string} patientId - The patient identifier
   * @param {string} cacheKey - Unique key for this data type (e.g., "lab_results", "profile")
   * @param {*} data - The data to store
   * @param {Object} [options] - Optional settings
   * @param {number} [options.ttl] - Time-to-live in milliseconds
   */
  async setPatientData(patientId, cacheKey, data, options = {}) {
    try {
      return await db.patientCache.put({
        patientId,
        cacheKey,
        data,
        lastUpdated: new Date(),
        ttl: options.ttl,
        expiresAt: options.ttl ? new Date(Date.now() + options.ttl) : undefined
      });
    } catch (error) {
      console.error('Error setting patient data:', error);
      throw error;
    }
  },

  /**
   * Get cached data for a patient by cache key
   * @param {string} patientId - The patient identifier
   * @param {string} cacheKey - The cache key to retrieve
   * @returns {Promise<*>} The cached data or null if not found/expired
   */
  async getPatientData(patientId, cacheKey) {
    try {
      const record = await db.patientCache.get([patientId, cacheKey]);
      if (!record) return null;
      
      // Check if expired
      if (record.expiresAt && new Date(record.expiresAt) < new Date()) {
        await this.deletePatientData(patientId, cacheKey);
        return null;
      }
      
      return record.data;
    } catch (error) {
      console.error('Error getting patient data:', error);
      return null;
    }
  },

  /**
   * Get all cached data for a patient as { cacheKey: data } object
   * @param {string} patientId - The patient identifier
   * @returns {Promise<Object>} Object with all cached data for the patient
   */
  async getAllPatientData(patientId) {
    try {
      const records = await db.patientCache
        .where('patientId')
        .equals(patientId)
        .toArray();
      
      const result = {};
      const now = new Date();
      
      for (const record of records) {
        // Skip and delete expired records
        if (record.expiresAt && new Date(record.expiresAt) < now) {
          await this.deletePatientData(patientId, record.cacheKey);
          continue;
        }
        result[record.cacheKey] = record.data;
      }
      
      return result;
    } catch (error) {
      console.error('Error getting all patient data:', error);
      return {};
    }
  },

  /**
   * Delete specific cached data for a patient
   * @param {string} patientId - The patient identifier
   * @param {string} cacheKey - The cache key to delete
   */
  async deletePatientData(patientId, cacheKey) {
    try {
      return await db.patientCache.delete([patientId, cacheKey]);
    } catch (error) {
      console.error('Error deleting patient data:', error);
      throw error;
    }
  },

  /**
   * Delete all cached data for a patient
   * @param {string} patientId - The patient identifier
   */
  async clearPatientData(patientId) {
    try {
      return await db.patientCache.where('patientId').equals(patientId).delete();
    } catch (error) {
      console.error('Error clearing patient data:', error);
      throw error;
    }
  },

  /**
   * Clear all cached data (for debugging/reset)
   */
  async clearAll() {
    try {
      return await db.patientCache.clear();
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  },

  /**
   * Get recently updated cache entries
   * @param {number} [limit=5] - Maximum number of entries to return
   * @returns {Promise<Array>} Array of recent cache entries
   */
  async getRecent(limit = 5) {
    try {
      return await db.patientCache
        .orderBy('lastUpdated')
        .reverse()
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Error getting recent entries:', error);
      return [];
    }
  }
};

export default cacheService;