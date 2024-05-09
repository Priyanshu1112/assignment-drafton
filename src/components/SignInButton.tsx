"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInButton = () => {
  const handleSignIn = () => {
    signIn("google").then((res) => {
      console.log(res);
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-3 text-lg border px-3 py-1 rounded-md bg-purple-200 hover:bg-purple-100 transition-colors duration-300"
    >
      <Image
        height={25}
        width={25}
        style={{ width: "auto" }}
        src="/google.png"
        alt=""
      />
      Google
    </button>
  );
};

export default SignInButton;
