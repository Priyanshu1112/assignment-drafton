"use client";
import { ChevronsUpDown, Inbox, StickyNote } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import DropDown from "./DropDown";
import Proposals from "./Proposals";
import { usePathname, useRouter } from "next/navigation";
import UserSettings from "./UserSettings";

const Sidebar = () => {
  const router = useRouter();
  const { data } = useSession();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const path = usePathname();



  return (
    <aside className="w-[15vw] flex flex-col gap-1 border-r-[1px] h-screen pr-2 pt-5">
      <div
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        className="flex gap-3 border-b-2 pb-3 mb-3 cursor-pointer relative "
      >
        <Image
          className="rounded-full"
          width={30}
          height={30}
          src={data?.user?.image ?? (data?.user?.name && data.user.name[0])!}
          alt=""
        />
        <span>
          <p className="text-sm">{data?.user?.name}</p>
          <p className="text-xs text-gray-500">Personal Account</p>
        </span>
        <ChevronsUpDown className="ml-auto" />
        {isDropDownOpen && <DropDown />}
      </div>
      <div
        onClick={() => router.push("/dashboard")}
        className={`py-3 rounded-xl  flex items-center pl-4 cursor-pointer ${
          path === "/dashboard" ? "bg-[#7C3AED] text-white" : "text-black"
        }`}
      >
        <StickyNote size={16} />
        <span className=" font-medium ml-2">Proposals</span>
      </div>
     
    </aside>
  );
};

export default Sidebar;
