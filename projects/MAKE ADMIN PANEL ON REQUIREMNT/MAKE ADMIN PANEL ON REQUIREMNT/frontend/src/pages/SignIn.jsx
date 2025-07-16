import axios from "axios";
import React, { useState } from "react";

const SignIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e) {
    try {
      e.preventDefault();
      let responce = await axios.post(
        "http://localhost:3690/user/login",
        input
      );
      console.log(responce);
      alert(responce.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="">Email:</label>
          <input
            type="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />

          <label htmlFor="">Password:</label>
          <input
            type="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />

          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
