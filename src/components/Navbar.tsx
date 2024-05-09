"use client";
import { Bell } from "lucide-react";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <nav className="flex items-center justify-between p-3 shadow-md">
      <div className="flex gap-3 font-bold text-lg">
        <Logo /> Drafton
      </div>
      <div className="ml-3 mt-4 flex items-center gap-4">
        <div className="p-2 rounded-full flex items-center justify-center border-[1px]">
          <Bell />
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-red-500">
          {data?.user?.name && data.user.name[0]}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
