"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserSettings from "./UserSettings";
import Link from "next/link";

const DropDown = () => {
  const { data } = useSession();

  return (
    <div className="absolute bottom-0 bg-white rounded-md translate-y-[105%] left-1/2 -translate-x-1/2  w-[90%]  p-4 shadow-md">
      <div className="flex gap-3 border-b-2 pb-3">
        <Image
          className="rounded-full"
          width={25}
          height={12}
          src={data?.user?.image ?? (data?.user?.name && data.user.name[0])!}
          alt=""
        />
        <span>
          <p className="text-xs">{data?.user?.name}</p>
          <p className="text-xs text-gray-500">Personal Account</p>
        </span>
      </div>
      <Link
        href={"/dashboard/user"}
        className="hover:bg-slate-100 w-full mt-3 rounded-md py-1 px-2 text-start inline-block"
      >
        User Settings
      </Link>
      <button
        onClick={() => signOut()}
        className="bg-red-300 w-full mt-3 rounded-md py-1 px-2 text-start"
      >
        Logout
      </button>
    </div>
  );
};

export default DropDown;
