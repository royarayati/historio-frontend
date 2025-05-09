import Dexie from 'dexie';

// Initialize the database
const db = new Dexie('PatientCacheDB');

// Define database schema
db.version(1).stores({
  patientCache: '&[patientId+cacheKey], patientId, cacheKey, lastUpdated, expiresAt'
});

class CacheService {
  constructor() {
    // Setup periodic cleanup every 24 hours
    this.cleanupInterval = setInterval(
      () => this.clearExpiredData(),
      24 * 60 * 60 * 1000
    );
  }

  /**
   * Stores or updates patient data
   * @param {string} patientId - The patient identifier (use 'api' for non-patient data)
   * @param {string} cacheKey - Unique identifier for this data type
   * @param {*} data - The data to store
   * @param {object} [options] - Configuration options
   * @param {number} [options.ttl] - Time-to-live in milliseconds
   */
  async setPatientData(patientId, cacheKey, data, options = {}) {
    const expiresAt = options.ttl ? new Date(Date.now() + options.ttl) : null;
    await db.patientCache.put({
      patientId,
      cacheKey,
      data,
      lastUpdated: new Date(),
      expiresAt
    });
  }

  /**
   * Gets patient data by cache key
   * @param {string} patientId - The patient identifier (use 'api' for non-patient data)
   * @param {string} cacheKey - The cache key to retrieve
   * @returns {Promise<*>} The cached data or null if not found/expired
   */
  async getPatientData(patientId, cacheKey) {
    const record = await db.patientCache.get([patientId, cacheKey]);
    if (!record) return null;
    
    // Check if expired
    if (record.expiresAt && record.expiresAt < new Date()) {
      await this.deletePatientData(patientId, cacheKey);
      return null;
    }
    
    return record.data;
  }

  /**
   * Deletes specific patient data
   * @param {string} patientId - The patient identifier (use 'api' for non-patient data)
   * @param {string} cacheKey - The cache key to delete
   */
  async deletePatientData(patientId, cacheKey) {
    await db.patientCache.delete([patientId, cacheKey]);
  }

  /**
   * Clears all data for a specific patient
   * @param {string} patientId - The patient identifier (use 'api' for non-patient data)
   */
  async clearAllPatientData(patientId) {
    await db.patientCache.where('patientId').equals(patientId).delete();
  }

  /**
   * Clears expired cache entries
   */
  async clearExpiredData() {
    const now = new Date();
    await db.patientCache
      .where('expiresAt')
      .below(now)
      .delete();
  }

  /**
   * Clears the entire cache
   */
  async clearAll() {
    await db.patientCache.clear();
  }

  /**
   * Cleanup interval when service is destroyed
   */
  destroy() {
    clearInterval(this.cleanupInterval);
  }
}

// Export singleton instance
export const cacheService = new CacheService();