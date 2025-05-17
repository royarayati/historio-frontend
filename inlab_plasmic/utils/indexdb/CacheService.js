// import Dexie from 'dexie';

// // Initialize the database
// const db = new Dexie('PatientCacheDB');

// // Define database schema
// db.version(1).stores({
//   patientCache: '&[patientId+cacheKey], patientId, cacheKey, lastUpdated, expiresAt'
// });

// class CacheService {
//   constructor() {
//     // Setup periodic cleanup every 24 hours
//     this.cleanupInterval = setInterval(
//       () => this.clearExpiredData(),
//       24 * 60 * 60 * 1000
//     );
//   }

//   /**
//    * Stores or updates patient data
//    * @param {string} patientId - The patient identifier (use 'api' for non-patient data)
//    * @param {string} cacheKey - Unique identifier for this data type
//    * @param {*} data - The data to store
//    * @param {object} [options] - Configuration options
//    * @param {number} [options.ttl] - Time-to-live in milliseconds
//    */
//   async setPatientData(patientId, cacheKey, data, options = {}) {
//     const expiresAt = options.ttl ? new Date(Date.now() + options.ttl) : null;
//     await db.patientCache.put({
//       patientId,
//       cacheKey,
//       data,
//       lastUpdated: new Date(),
//       expiresAt
//     });
//   }

//   /**
//    * Gets patient data by cache key
//    * @param {string} patientId - The patient identifier (use 'api' for non-patient data)
//    * @param {string} cacheKey - The cache key to retrieve
//    * @returns {Promise<*>} The cached data or null if not found/expired
//    */
//   async getPatientData(patientId, cacheKey) {
//     const record = await db.patientCache.get([patientId, cacheKey]);
//     if (!record) return null;
    
//     // Check if expired
//     if (record.expiresAt && record.expiresAt < new Date()) {
//       await this.deletePatientData(patientId, cacheKey);
//       return null;
//     }
    
//     return record.data;
//   }

//   /**
//    * Deletes specific patient data
//    * @param {string} patientId - The patient identifier (use 'api' for non-patient data)
//    * @param {string} cacheKey - The cache key to delete
//    */
//   async deletePatientData(patientId, cacheKey) {
//     await db.patientCache.delete([patientId, cacheKey]);
//   }

//   /**
//    * Clears all data for a specific patient
//    * @param {string} patientId - The patient identifier (use 'api' for non-patient data)
//    */
//   async clearAllPatientData(patientId) {
//     await db.patientCache.where('patientId').equals(patientId).delete();
//   }

//   /**
//    * Clears expired cache entries
//    */
//   async clearExpiredData() {
//     const now = new Date();
//     await db.patientCache
//       .where('expiresAt')
//       .below(now)
//       .delete();
//   }

//   /**
//    * Clears the entire cache
//    */
//   async clearAll() {
//     await db.patientCache.clear();
//   }

//   /**
//    * Cleanup interval when service is destroyed
//    */
//   destroy() {
//     clearInterval(this.cleanupInterval);
//   }
// }

import Dexie from 'dexie';

// Initialize the database
const db = new Dexie('PatientCacheDB');

// Simplified schema with only the composite key and essential fields
db.version(1).stores({
  patientCache: '&id, data, lastUpdated'
});

// Set expiration to 3 days (in milliseconds)
const EXPIRATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

// Automatic ID generation and expiration handling
db.patientCache.hook('creating', (primKey, obj) => {
  obj.lastUpdated = new Date();
  obj.expiresAt = Date.now() + EXPIRATION_MS;
});

// Update expiration on modification
db.patientCache.hook('updating', (modifications) => {
  modifications.lastUpdated = new Date();
  modifications.expiresAt = Date.now() + EXPIRATION_MS;
  return modifications;
});

const cacheService = {
  /**
   * Store data with composite key
   * @param {string} patientId 
   * @param {string} cacheKey 
   * @param {*} data 
   */
  async set(patientId, cacheKey, data) {
    const id = `${cacheKey}_${patientId}`;
    try {
      await db.patientCache.put({ id, data });
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  },

  /**
   * Get data by composite key, auto-deletes if expired
   * @param {string} patientId 
   * @param {string} cacheKey 
   * @returns {Promise<*>} Cached data or null
   */
  async get(patientId, cacheKey) {
    const id = `${cacheKey}_${patientId}`;
    try {
      const record = await db.patientCache.get(id);
      
      if (!record) return null;
      
      // Check expiration (3 days)
      if (Date.now() > record.expiresAt) {
        await db.patientCache.delete(id);
        return null;
      }
      
      return record.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  /**
   * Delete entry by composite key
   * @param {string} patientId 
   * @param {string} cacheKey 
   */
  async delete(patientId, cacheKey) {
    const id = `${cacheKey}_${patientId}`;
    try {
      await db.patientCache.delete(id);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  },

  /**
   * Clear all cached data
   */
  async clearAll() {
    try {
      await db.patientCache.clear();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
};

export default cacheService;