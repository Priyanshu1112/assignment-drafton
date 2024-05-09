import { Proposal } from "@prisma/client";
import { FilePen, LoaderCircle, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { deleteProposal, getAllProposals } from "../actions/proposal";

const Proposals = () => {
  const router = useRouter();
  const { data } = useSession();
  const [proposals, setProposals] = useState<Array<Proposal> | null>(null);

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const fetchedProposals = await getAllProposals(userId);
      setProposals(fetchedProposals.proposals);
    };

    if (data?.user.id) fetchData(data.user.id);
  }, [data]);

  const handleDelete = async (proposalId: string) => {
    deleteProposal(proposalId, setProposals);
  };

  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  <span>Created</span>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Title
                </th>

                <th
                  scope="col"
                  className="px-4 py-3.5 text-end text-sm font-normal text-gray-700 "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {proposals?.length == 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-3">
                    No Proposals !
                  </td>
                </tr>
              ) : (
                proposals?.map((proposal, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(proposal.createdAt).toLocaleString(
                              "en-GB",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      <div className="text-sm text-gray-900 ">
                        {proposal.name}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 flex items-center justify-end gap-2">
                      <div
                        onClick={() =>
                          router.push("/dashboard/proposal/edit/" + proposal.id)
                        }
                        className=" border-[1px] rounded-lg w-fit py-2 px-4 bg-[#7C3AED] text-white cursor-pointer flex items-center gap-3"
                      >
                        <FilePen size={14} /> Edit
                      </div>
                      <div
                        onClick={() => {
                          handleDelete(proposal.id);
                        }}
                        className=" border-[1px] rounded-lg w-fit py-2 px-4 bg-red-600 text-white cursor-pointer flex items-center gap-3"
                      >
                        <Trash size={14} /> Delete
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!proposals && ( // If proposals is null or undefined
                <tr>
                  <td colSpan={3} className="p-5">
                    <LoaderCircle className="rotate mx-auto" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
