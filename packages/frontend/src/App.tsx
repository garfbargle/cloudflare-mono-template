import { useEffect, useState } from 'react';
import type { HelloResponse } from '@cloudflare-mono-template/shared';

function App() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN || 'http://localhost:8787';
        const res = await fetch(`${backendOrigin}/`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-800 rounded-xl shadow-2xl p-8 border border-neutral-700">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Cloudflare Monorepo
        </h1>

        {loading && (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        {data && (
          <div className="space-y-4">
            <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-700">
              <p className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Message</p>
              <p className="text-xl font-medium text-blue-300">{data.message}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-700">
                <p className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Version</p>
                <p className="text-lg font-mono text-purple-300">{data.version}</p>
              </div>
              <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-700">
                <p className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Timestamp</p>
                <p className="text-xs font-mono text-gray-400 mt-1">{data.timestamp}</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-neutral-500 mt-8 text-sm">
          Frontend @cloudflare-mono-template/frontend
        </p>
      </div>
    </div>
  );
}

export default App;
