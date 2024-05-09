import {
  notifyErrorPromise,
  notifyPendingPromise,
  notifySuccessPromise,
} from "@/utils/Toast";

export async function getCompanyNameAndLogo(id: string) {
  const res = await fetch("/api/user/" + id, { method: "GET" }).then((res) =>
    res.json()
  );

  return res;
}

export async function updateCompanyName(id: string, companyName: string) {
  const notifyId = notifyPendingPromise("Updating...");
  const res = await fetch("/api/user?field=companyName", {
    method: "PUT",
    body: JSON.stringify({ id, companyName }),
  });

  if (res.ok) notifySuccessPromise(notifyId, "Updated successfully!");
  else notifyErrorPromise(notifyId, "Error updating name!");
}

export async function uploadLogo(userId: string, url: string) {
  const notifyId = notifyPendingPromise("Updating...");
  const res = await fetch("/api/user?field=logo", {
    method: "PUT",
    body: JSON.stringify({ id: userId, url }),
  });

  if (res.ok) notifySuccessPromise(notifyId, "Updated successfully!");
  else notifyErrorPromise(notifyId, "Error updating logo!");
}
