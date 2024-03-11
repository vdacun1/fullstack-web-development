"use server";

import { cookies } from "next/headers";

async function setToken(token) {
  cookies().set("token", token);
}

async function removeToken() {
  cookies().delete("token");
}

async function validateToken(token) {
  if (!!token) {
    return true;
  }
  return false;
}

export { setToken, removeToken, validateToken };
