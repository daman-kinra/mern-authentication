import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          "http://localhost:5000/auth/register",
          { name, password, email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(() => {
          props.history.push("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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

export default Register;
