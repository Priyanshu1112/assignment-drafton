"use client";

import { StickyNote } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Proposals from "@/components/Proposals";
import Template from "@/components/Template";

const Page = () => {
  const [active, setActive] = useState(false);

  const { data, status } = useSession();

  useEffect(() => {
    console.log({ data, status });
  }, [data, status]);

  const closeTemplate = () => {
    setActive(!active);
  };

  return (
    <div className="relative flex-1">
      <div className="flex-1 p-6">
        <div className="border-[1px] h-[50vh] rounded-xl flex-col flex items-center justify-center">
          <div className=" flex items-center  flex-col gap-2">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white bg-[#7C3AED]">
              <StickyNote size={30} />
            </div>
            <h2 className=" font-bold text-xl">Create Proposal</h2>
            <h3 className=" text-sm font-normal">
              Get started by creating a proposal.
            </h3>
          </div>
          <div
            onClick={() => setActive(!active)}
            className=" border-[1px] rounded-md px-3 py-2 mt-7 cursor-pointer"
          >
            Create proposal
          </div>
        </div>

        <div className="mt-7">
          <div>
            <span className="text-[30px] font-medium">Proposals</span>
          </div>

          <div>
            <div className="mt-6 flex flex-col">
              <Proposals />
            </div>
          </div>
        </div>
      </div>

      {active && <Template close={closeTemplate} />}
    </div>
  );
};

export default Page;
