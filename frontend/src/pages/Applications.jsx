import { useEffect, useState } from "react";
import api from "../api";

export default function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/applications").then(res => setApps(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Candidate Applications</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {apps.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.title}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
