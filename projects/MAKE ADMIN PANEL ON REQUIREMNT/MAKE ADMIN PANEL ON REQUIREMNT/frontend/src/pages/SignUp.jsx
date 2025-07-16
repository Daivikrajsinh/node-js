import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
  });

  async function handleSignup(e) {
    e.preventDefault();
    try {
      let responce = await axios.post(
        "http://localhost:3690/user/register",
        input
      );
      console.log(responce);
      alert(responce.data.message);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
    setInput({
      userName: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <h1>Signup Page</h1>
      <div>
        <form onSubmit={handleSignup}>
          <label htmlFor="">User Name:</label>
          <input
            type="text"
            value={input.userName}
            onChange={(e) => setInput({ ...input, userName: e.target.value })}
          />
          <br />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <br />
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

export default SignUp;
