import prisma from "@/server/prisma";
import {
  notifyErrorPromise,
  notifyPendingPromise,
  notifySuccessPromise,
} from "@/utils/Toast";

export async function getAllProposals(userId: string) {
  try {
    const res = await fetch("/api/proposal/" + userId, {
      method: "GET",
    });

    return await res.json();
  } catch (err: any) {
    console.log(err);
    return { message: err.message, status: 500 };
  }
}

export async function getProposal(proposalId: string) {
  if (!proposalId) return null;

  const res = await fetch("/api/proposal?proposalId=" + proposalId).then(
    (res) => res.json()
  );

  return res;
}

export async function updateProposal(proposal: any) {
  const id = notifyPendingPromise("Updating...");

  const res = await fetch("/api/proposal", {
    method: "PUT",
    body: JSON.stringify(proposal),
  });

  if (res.status == 200) notifySuccessPromise(id, "Updated successfully!");
  else notifyErrorPromise(id, res.statusText);

  return res;
}

export async function deleteProposal(proposalId: string, setProposals: any) {
  const id = notifyPendingPromise("Deleting...");
  const res = await fetch("/api/proposal", {
    method: "DELETE",
    body: JSON.stringify({ proposalId }),
  });

  if (res)
    if (res.status == 200) {
      notifySuccessPromise(id, "Deleted successfully!");
      setProposals((prevProposals: any) =>
        prevProposals?.filter((proposal: any) => proposal.id !== proposalId)
      );
    } else notifyErrorPromise(id, res.statusText);
}

export async function getDataFromAi(
  id: string | string[],
  userId: string,
  user: any,
  setProposal: Function
) {
  const _id = notifyPendingPromise("Auto Generating Data...");

  const url = user?.companyName
    ? `/api/openai/${id[0].split("%20").join(" ")}/${user.companyName}`
    : `/api/openai/${id[0].split("%20").join(" ")}`;

  let res: any = await fetch(url);

  if (res.ok) {
    res = await res.json();
    notifySuccessPromise(_id, "Successfully fetched data!");
    const goals = res?.goals.join("\n");
    const objective = res?.objectives.join("\n");
    const whyChooseUs = res?.whyChooseUs.join("\n");
    setProposal({
      id: id[1],
      name: id[0].split("%20").join(" ") ?? "",
      intro: res?.intro ?? "",
      goals: goals ?? "",
      objective: objective ?? "",
      pricing: res?.pricing ?? [
        {
          basic: 5000,
        },
        { standard: 6000 },
        { premium: 8000 },
        { custom: 10000 },
        { enterprise: 12000 },
      ],
      whyChooseUs: whyChooseUs ?? "",
    });
  } else notifyErrorPromise(_id, "Fetching data failed");
}

