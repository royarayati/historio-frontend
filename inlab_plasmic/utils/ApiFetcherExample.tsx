import React from 'react';
import { ApiFetcherComponentPlusCache, useApiFetcher } from './ApiFetcherComponentPlusCache';

// Example component showing how to use the enhanced ApiFetcherComponentPlusCache
export const ApiFetcherExample: React.FC = () => {
  return (
    <div>
      <h2>API Fetcher with Cache - Examples</h2>
      
      {/* Example 1: Basic usage with slot children */}
      <ApiFetcherComponentPlusCache
        path="/api/patients"
        method="GET"
        cache="yes"
        patientId="12345"
        cacheKey="patients-list"
        showData={true}
        dataClassName="my-data-container"
        slotChildren={
          <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '10px' }}>
            <h3>Slot Children Content</h3>
            <p>This content is rendered in the slot children area</p>
          </div>
        }
      >
        <div style={{ padding: '10px', border: '1px solid #ccc' }}>
          <h3>Regular Children Content</h3>
          <p>This content is rendered in the regular children area</p>
        </div>
      </ApiFetcherComponentPlusCache>

      {/* Example 2: Using the context hook */}
      <ApiFetcherComponentPlusCache
        path="/api/lab-results"
        method="GET"
        cache="yes"
        patientId="12345"
        cacheKey="lab-results"
        debugMode={true}
      >
        <DataDisplayComponent />
      </ApiFetcherComponentPlusCache>
    </div>
  );
};

// Component that uses the context hook
const DataDisplayComponent: React.FC = () => {
  const { data, loading, error, fromCache, reload, clearCache } = useApiFetcher();

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        Error: {error instanceof Error ? error.message : String(error)}
        <button onClick={reload} style={{ marginLeft: '10px' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd' }}>
      <h4>Lab Results</h4>
      {fromCache && <span style={{ color: 'green' }}>✓ From Cache</span>}
      <button onClick={reload} style={{ marginLeft: '10px' }}>
        Reload
      </button>
      <button onClick={clearCache} style={{ marginLeft: '10px' }}>
        Clear Cache
      </button>
      <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default ApiFetcherExample;

