"use client";
import LoginForm from "../../components/LoginForm";
import HomeNav from "../../components/HomeNav";

export default function Login() {
  return (
    <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center flex justify-center">
        <HomeNav />
        <LoginForm />
    </div>
  );
}
