import React, { useState, useEffect } from 'react';
import { getCache, setCache, deleteCache } from './indexdb/CacheService';

interface CacheValidatorProps {
  patientId: string;
  cacheKey: string;
  className?: string;
}

export const CacheValidator: React.FC<CacheValidatorProps> = ({ 
  patientId, 
  cacheKey, 
  className = "" 
}) => {
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateCache = async () => {
    if (!patientId || !cacheKey) {
      setValidationResult({ error: 'Missing patientId or cacheKey' });
      return;
    }

    setIsValidating(true);
    try {
      console.log(`[CACHE VALIDATOR] Starting validation for patientId: "${patientId}", cacheKey: "${cacheKey}"`);
      
      // Test 1: Try to retrieve data
      const cachedData = await getCache(patientId, cacheKey);
      
      if (!cachedData) {
        setValidationResult({
          status: 'MISS',
          message: 'No cached data found',
          patientId,
          cacheKey
        });
        return;
      }

      // Test 2: Verify data integrity
      const dataString = JSON.stringify(cachedData);
      const dataHash = btoa(dataString).slice(0, 16);
      
      // Test 3: Check data structure
      const isArray = Array.isArray(cachedData);
      const isObject = typeof cachedData === 'object' && cachedData !== null;
      const hasData = dataString.length > 0;

      setValidationResult({
        status: 'HIT',
        message: 'Cached data found and validated',
        patientId,
        cacheKey,
        dataType: typeof cachedData,
        isArray,
        isObject,
        hasData,
        dataSize: dataString.length,
        dataHash,
        sampleData: isArray ? cachedData.slice(0, 3) : Object.keys(cachedData).slice(0, 5),
        timestamp: new Date().toISOString()
      });

      console.log(`[CACHE VALIDATOR] Validation completed for ${patientId}/${cacheKey}`, validationResult);
    } catch (error) {
      console.error(`[CACHE VALIDATOR ERROR] Failed to validate cache for ${patientId}/${cacheKey}:`, error);
      setValidationResult({
        status: 'ERROR',
        message: `Validation failed: ${error}`,
        patientId,
        cacheKey,
        error: String(error)
      });
    } finally {
      setIsValidating(false);
    }
  };

  const clearCache = async () => {
    try {
      await deleteCache(patientId, cacheKey);
      setValidationResult({
        status: 'CLEARED',
        message: 'Cache cleared successfully',
        patientId,
        cacheKey,
        timestamp: new Date().toISOString()
      });
      console.log(`[CACHE VALIDATOR] Cache cleared for ${patientId}/${cacheKey}`);
    } catch (error) {
      console.error(`[CACHE VALIDATOR ERROR] Failed to clear cache for ${patientId}/${cacheKey}:`, error);
    }
  };

  useEffect(() => {
    if (patientId && cacheKey) {
      validateCache();
    }
  }, [patientId, cacheKey]);

  if (!patientId || !cacheKey) {
    return (
      <div className={`p-4 bg-red-100 border border-red-300 rounded ${className}`}>
        <h3 className="font-bold text-red-800">Cache Validator Error</h3>
        <p className="text-red-600">Missing patientId or cacheKey</p>
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded ${className} ${
      validationResult?.status === 'HIT' ? 'bg-green-100 border-green-300' :
      validationResult?.status === 'MISS' ? 'bg-yellow-100 border-yellow-300' :
      validationResult?.status === 'ERROR' ? 'bg-red-100 border-red-300' :
      'bg-gray-100 border-gray-300'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">Cache Validator</h3>
        <div className="space-x-2">
          <button
            onClick={validateCache}
            disabled={isValidating}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
          >
            {isValidating ? 'Validating...' : 'Refresh'}
          </button>
          <button
            onClick={clearCache}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Clear Cache
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Patient ID:</span> 
          <code className="ml-2 bg-gray-200 px-2 py-1 rounded">{patientId}</code>
        </div>
        <div>
          <span className="font-medium">Cache Key:</span> 
          <code className="ml-2 bg-gray-200 px-2 py-1 rounded">{cacheKey}</code>
        </div>

        {validationResult && (
          <div className="mt-4 space-y-2">
            <div className={`font-medium ${
              validationResult.status === 'HIT' ? 'text-green-800' :
              validationResult.status === 'MISS' ? 'text-yellow-800' :
              validationResult.status === 'ERROR' ? 'text-red-800' :
              'text-gray-800'
            }`}>
              Status: {validationResult.status}
            </div>
            <div className="text-gray-700">{validationResult.message}</div>
            
            {validationResult.status === 'HIT' && (
              <div className="space-y-1 text-xs">
                <div><span className="font-medium">Data Type:</span> {validationResult.dataType}</div>
                <div><span className="font-medium">Is Array:</span> {validationResult.isArray ? 'Yes' : 'No'}</div>
                <div><span className="font-medium">Data Size:</span> {validationResult.dataSize} characters</div>
                <div><span className="font-medium">Data Hash:</span> <code>{validationResult.dataHash}</code></div>
                <div><span className="font-medium">Sample Data:</span></div>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-auto max-h-32">
                  {JSON.stringify(validationResult.sampleData, null, 2)}
                </pre>
              </div>
            )}
            
            {validationResult.timestamp && (
              <div className="text-xs text-gray-500">
                Last checked: {new Date(validationResult.timestamp).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CacheValidator;





