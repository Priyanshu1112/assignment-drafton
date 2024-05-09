"use client";

import { getDataFromAi, updateProposal } from "@/actions/proposal";
import { getCompanyNameAndLogo } from "@/actions/user";

import { TextareaAutosize } from "@mui/base";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const { data } = useSession();
  const [proposal, setProposal] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getCompanyDetails = async (id: string) => {
      const res = await getCompanyNameAndLogo(id);
      setUser(res);
    };

    if (id.length > 0 && data?.user.id) {
      getCompanyDetails(data.user.id);
    }
  }, [id, data]);

  useEffect(() => {
    const fetchFromAi = async (
      id: string | string[],
      userId: string,
      user: any
    ) => {
      if (id.length > 0 && data?.user.id && user) {
        getDataFromAi(id, userId, user, setProposal);
      }
    };

    fetchFromAi(id, data?.user.id!, user);
  }, [id, data, user]);

  const handleChange = (field: string, value: string) => {
    setProposal((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePriceChange = (packageName: string, price: string) => {
    console.log({ packageName, price });
    setProposal((prev: any) => {
      const packageIndex = prev.pricing.findIndex(
        (item: any) => Object.keys(item)[0] === packageName
      );

      if (packageIndex !== -1) {
        const newPricing = [
          ...prev.pricing.slice(0, packageIndex),
          { [packageName]: price },
          ...prev.pricing.slice(packageIndex + 1),
        ];

        return { ...prev, pricing: newPricing };
      }

      return prev;
    });
  };

  const handleSave = async () => {
    updateProposal(proposal);
  };

  return (
    <div className="w-full mt-2 min-h-full bg-slate-100 p-5">
      <input
        type="text"
        value={proposal?.name || id[0].split("%20").join(" ")}
        onChange={(e) => handleChange("name", e.target.value)}
        className="p-1 outline-none rounded-md block mb-3 capitalize"
      />
      <hr />
      <div className="flex flex-col gap-5 p-3">
        <div>
          <div className="flex justify-center gap-5">
            <h2 className="text-center text-xl font-medium">
              {user?.companyName || data?.user.name}
            </h2>
            {user?.logo && (
              <Image src={user?.logo} alt="Logo" width={30} height={30} />
            )}
          </div>
          <TextareaAutosize
            onChange={(e) => handleChange("intro", e.target.value)}
            className="w-full mt-2 p-1 rounded-md bg-slate-50 outline-none"
            value={proposal?.intro || ""}
            placeholder="Intro"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold">Goals</h4>
          <TextareaAutosize
            onChange={(e) => handleChange("goals", e.target.value)}
            className="w-full mt-2 p-1 rounded-md bg-slate-50 outline-none"
            value={proposal?.goals || ""}
            placeholder="Goals"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold">Objective</h4>
          <TextareaAutosize
            onChange={(e) => handleChange("objective", e.target.value)}
            className="w-full mt-2 p-1 rounded-md bg-slate-50 outline-none"
            value={proposal?.objective || ""}
            placeholder="Objective"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold">Pricing</h4>
          <div className="overflow-hidden  border-gray-200 md:rounded-lg">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50 border-2">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-start text-sm font-normal text-gray-700"
                  >
                    Category
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-start text-sm font-normal text-gray-700 "
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {proposal?.pricing?.map((price: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-4 capitalize">
                        {Object.keys(price)} Package
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        ₹
                        <input
                          type="number"
                          name=""
                          className="outline-none focus:outline-blue-400 ml-2 rounded-md px-1"
                          value={Object.values(price)}
                          id=""
                          onChange={(e) =>
                            handlePriceChange(
                              Object.keys(price)[0],
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Why Choose Us</h4>
          <TextareaAutosize
            onChange={(e) => handleChange("whyChooseUs", e.target.value)}
            className="w-full mt-2 p-1 rounded-md bg-slate-50 outline-none"
            value={proposal?.whyChooseUs || ""}
            placeholder="Why Choose Us"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mt-5 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        Save
      </button>
    </div>
  );
};

export default Page;
