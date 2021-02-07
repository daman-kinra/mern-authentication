import React, { useState, useEffect } from "react";
import axios from "axios";

function Home(props) {
  const [user, setUser] = useState({});

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
  };

  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  }
  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUser(res.data);
  }, []);
  return (
    <div className="main">
      <h2>{user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
