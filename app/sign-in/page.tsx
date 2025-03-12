"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function SignInPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      signIn();
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input type="email" value={email} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input type="password" value={password} readOnly />
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button type="submit" className={styles.submitBtn}>Sign In</button>
      </form>
    </div>
  );
}
