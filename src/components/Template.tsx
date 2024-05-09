"use client";
import {
  notifyError,
  notifyErrorPromise,
  notifyInfo,
  notifyPendingPromise,
  notifySuccess,
  notifySuccessPromise,
} from "@/utils/Toast";
import { ChevronLeft, Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Template = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const { data } = useSession();

  const handleCreate = async () => {
    if (!name) return notifyError("Name is required!");

    const id = notifyPendingPromise("Creating...");
    const res = await fetch("api/proposal", {
      method: "POST",
      body: JSON.stringify({ name, userId: data?.user.id }),
    });

    const response = await res.json();

    if (res.ok) {
      notifySuccessPromise(id, "Created proposal!");
      close();
      router.push("/dashboard/proposal/" + name + "/" + response.id);
    } else notifyErrorPromise(id, res.statusText);
  };

  return (
    <div className=" w-screen flex items-center justify-center h-screen p-10 bg-white/80 fixed top-0 left-0">
      <div className="bg-white shadow-md p-5 rounded-md flex flex-col gap-4 w-[30%]">
        <h3 className="text-lg font-semibold">Create Blank Proposal</h3>
        <input
          autoComplete="off"
          type="text"
          placeholder="Name"
          name="name"
          id=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-md outline-none border-2 focus:border-purple-500"
        />
        <div className="w-full flex gap-3 justify-end">
          <button
            onClick={() => close()}
            className="px-3 py-1 border-2 rounded-md flex"
          >
            <ChevronLeft /> Back
          </button>
          <button
            onClick={handleCreate}
            className="px-3 py-1 bg-purple-500 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template;
