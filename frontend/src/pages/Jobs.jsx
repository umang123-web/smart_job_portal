import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Job Listings</h2>
      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <Link to={`/jobs/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
