import React, { useState } from "react";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = (email, password) => {
    // const response = await login();
    console.log(email, password);
  };

  return (
    <form>
      <h2>Sign Up</h2>
      <div className="user-box">
        <input
          type="text"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Email</label>
      </div>
      <div className="user-box">
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
      </div>
      <button onClick={click}>Confirm</button>
    </form>
  );
};

export default Registration;
