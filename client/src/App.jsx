import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_WEATHER_API_URL ?? 'http://localhost:5000';

const emptyReport = {
  date: '—',
  temperatureC: '--',
  temperatureF: '--',
  summary: 'Loading'
};

export default function App() {
  const [report, setReport] = useState(emptyReport);
  const [status, setStatus] = useState('Loading latest weather...');

  const loadWeather = async () => {
    try {
      setStatus('Loading latest weather...');
      const response = await fetch(`${apiBaseUrl}/weather`);
      if (!response.ok) {
        throw new Error('Weather service unavailable');
      }

      const data = await response.json();
      setReport(data);
      setStatus('Updated just now');
    } catch (error) {
      setStatus('Unable to load weather data.');
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <main className="page">
      <section className="card">
        <header>
          <p className="eyebrow">Weather Service</p>
          <h1>Today&apos;s Weather</h1>
          <p className="subheading">{status}</p>
        </header>
        <div className="grid">
          <div>
            <p className="label">Date</p>
            <p className="value">{report.date}</p>
          </div>
          <div>
            <p className="label">Summary</p>
            <p className="value">{report.summary}</p>
          </div>
          <div>
            <p className="label">Temperature (°C)</p>
            <p className="value">{report.temperatureC}</p>
          </div>
          <div>
            <p className="label">Temperature (°F)</p>
            <p className="value">{report.temperatureF}</p>
          </div>
        </div>
        <button type="button" className="button" onClick={loadWeather}>
          Refresh report
        </button>
        <p className="helper">API: {apiBaseUrl}/weather</p>
      </section>
    </main>
  );
}
