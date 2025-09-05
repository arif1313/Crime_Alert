import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/forgot-password", {
        email,
      });
      setResetToken(res.data.data.resetToken);
      alert("Reset token generated (check email in real app).");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to request reset token");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Request Reset Token</button>
      </form>

      {resetToken && (
        <div>
          <h4>Your Reset Token (for testing):</h4>
          <code>{resetToken}</code>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
