import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        { password, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      localStorage.setItem("token", res.data.token);
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        size="small"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Register</button>
    </div>
  );
}

export default Login;
