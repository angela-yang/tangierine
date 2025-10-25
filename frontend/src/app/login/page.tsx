"use client";
import NavBar from "../../components/NavBar";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-indigo-200 flex justify-center">
        <NavBar />
        <LoginForm />
    </div>
  );
}
