"use client";
import React, { useState } from "react";
import NavBar from "../../components/NavBar"

export default function Commission() {
  const [details, setDetails] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/commission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details }),
    });
  };

  return (
    <div className="min-h-screen bg-indigo-200 pt-24">
      <NavBar />
      <div className="max-w-md mx-auto p-6 bg-indigo-50 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Request a Commission</h2>
        <form className="flex flex-col space-y-4 text-gray-700">
          <input type="text" placeholder="Your Name" className="border p-2 rounded-lg text-gray-400"/>
          <input type="email" placeholder="Your Email" className="border p-2 rounded-lg text-gray-400"/>
          <textarea placeholder="Describe your commission" className="border p-2 rounded-lg h-32 text-gray-400"/>
          <div>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button className="bg-indigo-300 text-gray-800 p-2 rounded-full hover:bg-indigo-200 transition-colors" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
