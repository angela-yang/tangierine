"use client";
import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import SignUpForm from "../../components/SignUpForm";

export default function SignUp() {

  return (
    <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center flex justify-center">
      <NavBar />
      <SignUpForm />
    </div>
  );
}
