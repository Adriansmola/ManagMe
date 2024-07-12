import React, { useState } from "react";
import { login } from "../api/auth";
import { LoginData } from "../types/auth";
import { TextField, FormControl, Button } from "@mui/material";

interface LoginFormProps {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}


const LoginForm = ({setLogged}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData: LoginData = { email, password };
    try {
      const response = await login(loginData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      console.log("Logged in successfully:", response);
      setLogged((prev) => !prev);
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email-input"
          required
          placeholder="Enter your email"
        />
        <TextField
          id="password-input"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="outlined">
          Login
        </Button>
      </FormControl>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
