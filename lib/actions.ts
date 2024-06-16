"use server";
import { signIn } from "@/auth";

// both for signin and signup
export async function authAction() {
  "use server";
  await signIn("github");
}
