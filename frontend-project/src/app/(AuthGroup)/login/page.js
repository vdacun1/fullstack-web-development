"use client";
import { setToken } from "@/middleware/AuthService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Locale from "./locale";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const text = Locale["es"];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await setToken(email + password).then(() => {
      router.push("/");
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {text.title}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {text.email}
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={email}
                onChange={handleEmailChange}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {text.password}
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {text.forgotPassword}
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={password}
                onChange={handlePasswordChange}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {text.login}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {text.needToRegister}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {text.register}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
