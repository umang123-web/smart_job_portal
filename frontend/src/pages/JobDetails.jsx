import { useState } from "react";
import { useParams } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams(); // job ID from URL
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    if (!file) {
      setMessage("Please select a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", id);
    formData.append("user_id", 1); // hardcoded for now; replace with logged-in user ID
    formData.append("resume", file);

    try {
      const res = await fetch("http://localhost:5000/applications", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Job Details</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />
      <button onClick={handleApply}>Apply</button>
      <p>{message}</p>
    </div>
  );
}
