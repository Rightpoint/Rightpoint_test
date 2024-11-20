import { useEffect, useState } from 'react';

export default function CSPReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch the reports from the API route
    fetch('/api/csp-violation-report-endpoint')
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
      });
  }, []);

  return (
    <div>
      <h1>CSP Violation Reports</h1>
      {reports.length > 0 ? (
        <ul>
          {reports.map((report, index) => (
            <li key={index}><br></br>{JSON.stringify(report)}</li>
          ))}
        </ul>
      ) : (
        <p>No CSP reports found</p>
      )}
    </div>
  );
}
