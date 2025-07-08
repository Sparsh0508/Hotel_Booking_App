import React from "react";
import { assets } from "../assets/assets";

export default function Newsletter() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[#0f1626] text-white py-16 px-4 md:px-8 rounded-2xl text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Inspired</h2>
        <p className="text-gray-300 mb-6">
          Join our newsletter and be the first to discover new destinations,
          exclusive offers, and travel inspiration.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md w-full sm:w-96 bg-[#1c2233] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition flex items-center gap-2"
          >
            Subscribe
            <img src={assets.arrowIcon} alt=""></img>
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6">
          By subscribing, you agree to our{" "}
          <span className="underline">Privacy Policy</span> and consent to
          receive updates.
        </p>
      </div>
    </div>
  );
}
