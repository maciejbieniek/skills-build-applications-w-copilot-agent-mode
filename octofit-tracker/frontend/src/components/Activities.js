import React, { useEffect, useState } from 'react';

const endpointName = 'activities';
const API_BASE_URL = (() => {
  const name = process.env.REACT_APP_CODESPACE_NAME;
  if (!name) {
    console.warn('REACT_APP_CODESPACE_NAME is not set. Using localhost:8000 fallback.');
    return 'http://localhost:8000/api';
  }
  return `https://${name}-8000.app.github.dev/api/activities/`;
})();

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = `${API_BASE_URL}`;

  useEffect(() => {
    console.log(`[Activities] Fetching from endpoint: ${url}`);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('[Activities] raw data:', data);
        const results = Array.isArray(data) ? data : data?.results ?? [];
        console.log('[Activities] parsed results:', results);
        setItems(results);
      })
      .catch((err) => {
        console.error('[Activities] fetch error:', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  if (loading) return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading activities...</span>
      </div>
    </div>
  );
  if (error) return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Error loading activities</h4>
      <p>{error.message}</p>
    </div>
  );

  const columns = items.length > 0 ? Object.keys(items[0]) : [];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="display-4 text-primary mb-4">Activities</h1>
          <p className="text-muted">Endpoint: <code>{url}</code></p>
          {items.length === 0 ? (
            <div className="alert alert-info">
              <h5>No activities found.</h5>
              <p>Please check if the backend is running and data is available.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    {columns.map((col) => (
                      <th key={col} scope="col" className="text-capitalize">{col.replace(/_/g, ' ')}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id ?? index}>
                      {columns.map((col) => (
                        <td key={col}>
                          {typeof item[col] === 'object' ? JSON.stringify(item[col]) : String(item[col] || '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
