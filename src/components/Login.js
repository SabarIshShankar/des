import { React, useState } from "react";
import axios from "axios";

const projectId = "";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": projectId,
      username: username,
      usersecret: password
    };
    try {
      await axios.get("https://api.chatEngine.io/chats", {
        headers: authObject
      });
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      window.location.reload();
      setError("");
    } catch (err) {
      setError("incorrect credentials");
    }
  };
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            palceholder="Try Username: second"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Try: 123456"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>start</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>
  );
};
export default LoginForm;
