'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Eye, Calendar, Globe, Monitor, 
  Smartphone, ShieldAlert, RefreshCw 
} from 'lucide-react';

interface MetricStats {
  totalVisitors: number;
  uniqueVisitors: number;
  todayVisitors: number;
}

interface AggregationStat {
  _id: string;
  count: number;
}

interface LogEntry {
  _id: string;
  timestamp: string;
  city: string;
  country: string;
  url: string;
  os: string;
  browser: string;
  referrer: string;
}

interface DashboardData {
  metrics: MetricStats;
  timelineStats: AggregationStat[];
  topCountries: AggregationStat[];
  browserStats: AggregationStat[];
  deviceStats: AggregationStat[];
  recentLogs: LogEntry[];
}

export default function AdminDashboard() {
  const [passphrase, setPassphrase] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchStats = async (tokenString: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/stats?token=${encodeURIComponent(tokenString)}`);
      if (!res.ok) {
        throw new Error(res.status === 401 ? 'Invalid Authorization Passphrase' : 'Could not fetch stats');
      }
      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
      localStorage.setItem('_admin_token', tokenString);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('_admin_token');
    if (storedToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassphrase(storedToken);
      fetchStats(storedToken);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim()) return;
    fetchStats(passphrase);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
        <form onSubmit={handleLoginSubmit} className="bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 tracking-tight text-zinc-900 dark:text-zinc-50">Portfolio Telemetry</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Enter your administrative passphrase to load metrics.</p>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3 text-xs rounded-lg mb-4 flex items-center gap-2">
              <ShieldAlert size={16} />
              <span>{error}</span>
            </div>
          )}

          <input
            type="password"
            placeholder="Passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-transparent rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Unlock Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">System Telemetry</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Live operational usage maps and performance telemetry data.</p>
          </div>
          <button
            onClick={() => fetchStats(passphrase)}
            disabled={loading}
            className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-zinc-400 uppercase">Total Impressions</p>
              <h3 className="text-2xl font-bold">{data.metrics.totalVisitors}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-lg">
              <Eye size={24} />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-zinc-400 uppercase">Unique Nodes</p>
              <h3 className="text-2xl font-bold">{data.metrics.uniqueVisitors}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-zinc-400 uppercase">Today&apos;s Cycle</p>
              <h3 className="text-2xl font-bold">{data.metrics.todayVisitors}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl lg:col-span-2">
            <h3 className="text-sm font-bold font-mono tracking-wide text-zinc-400 uppercase mb-6">7-Day Run Ingestion Trend</h3>
            <div className="h-48 flex items-end gap-3 pt-4 border-b border-zinc-200 dark:border-zinc-800">
              {data.timelineStats.map((day) => {
                const maxVal = Math.max(...data.timelineStats.map((d) => d.count), 1);
                const heightPercentage = (day.count / maxVal) * 100;
                return (
                  <div key={day._id} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="text-[10px] font-mono font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white px-1 rounded">
                      {day.count}
                    </div>
                    <div 
                      style={{ height: `${heightPercentage}%` }} 
                      className="w-full bg-purple-500 dark:bg-purple-600 rounded-t-sm hover:bg-purple-400 transition-all"
                    />
                    <span className="text-[9px] font-mono mt-2 text-zinc-400 whitespace-nowrap overflow-hidden max-w-full">
                      {day._id.split('-').slice(1).join('/')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl">
            <h3 className="text-sm font-bold font-mono tracking-wide text-zinc-400 uppercase mb-4 flex items-center gap-2">
              <Globe size={16} /> Demographics
            </h3>
            <div className="space-y-3">
              {data.topCountries.map((c) => (
                <div key={c._id} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{c._id}</span>
                  <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs font-bold">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl">
            <h3 className="text-sm font-bold font-mono tracking-wide text-zinc-400 uppercase mb-4 flex items-center gap-2">
              <Monitor size={16} /> Browser Platforms
            </h3>
            <div className="space-y-2">
              {data.browserStats.slice(0, 5).map((b) => (
                <div key={b._id} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">{b._id}</span>
                  <span className="font-mono font-bold">{b.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl">
            <h3 className="text-sm font-bold font-mono tracking-wide text-zinc-400 uppercase mb-4 flex items-center gap-2">
              <Smartphone size={16} /> Device Types
            </h3>
            <div className="space-y-2">
              {data.deviceStats.map((d) => (
                <div key={d._id} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">{d._id}</span>
                  <span className="font-mono font-bold">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold font-mono tracking-wide text-zinc-400 uppercase">Realtime Connection Log</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 font-mono text-zinc-400">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Target Node Path</th>
                  <th className="p-4">OS / Browser</th>
                  <th className="p-4">Referrer Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {data.recentLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 whitespace-nowrap text-zinc-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td className="p-4 font-medium">{log.city}, {log.country}</td>
                    <td className="p-4 max-w-50 truncate text-purple-600 dark:text-purple-400">{log.url.replace(window.location.origin, '') || '/'}</td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">{log.os} / {log.browser}</td>
                    <td className="p-4 max-w-37.5 truncate text-zinc-500">{log.referrer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}