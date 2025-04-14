import React, { useState } from "react";
import axios from "axios";

function ReorderForm() {
  const [product, setProduct] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReorder = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/inventory/api/reorder", {
        product,
        email,
      });
      setMessage("✅ Email sent successfully!");
    } catch (error) {
      console.error("❌ Error sending email:", error);
      setMessage("❌ Failed to send email. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Reorder Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleReorder} style={{ width: "100%", padding: "10px" }}>
        Send Reorder Email
      </button>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default ReorderForm;
