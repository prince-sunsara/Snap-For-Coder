"use server";
import { signIn, signOut } from "@/auth";

// both for signin and signup
export async function authAction() {
  try {
    await signIn("github");
  } catch (error: any) {
    if (error.message == "NEXT_REDIRECT") {
      throw error;
    }
    return error.message;
  }
}

export const logoutAction = async () => {
  "use server";
  await signOut();
};
