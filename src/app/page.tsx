"use client";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import SignInButton from "@/components/SignInButton";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    const user = await fetch("/api/createUser", {
      method: "DELETE",
      body: JSON.stringify({ id: "6639c52b2b464cdffe0435e8" }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(await user.json());
  };

  useEffect(() => {
    if (status == "authenticated") return router.push("/dashboard");
  }, [status]);

  return (
    <main className="loginContainer">
      {status == "loading" ? (
        "Loading..."
      ) : (
        <div className="flex flex-col items-center gap-10 py-20 px-32 border-2 rounded-md">
          <h1 className="flex gap-3 text-2xl">
            Welcome to Drafton <Logo />
          </h1>
          <SignInButton />
        </div>
      )}
    </main>
  );
}
