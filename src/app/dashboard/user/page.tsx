"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import {
  getCompanyNameAndLogo,
  updateCompanyName,
  uploadLogo,
} from "@/actions/user";

const Page = () => {
  const { data } = useSession();
  const [imageURL, setImageURL] = useState("");
  const [user, setUser] = useState<any>(null);
  const [changeName, setChangeName] = useState<any>("");

  useEffect(() => {
    const getCompanyDetails = async (id: string) => {
      const res = await getCompanyNameAndLogo(id);
      setUser(res);
      setChangeName(res.companyName);
    };

    if (data?.user.id) getCompanyDetails(data.user.id);
  }, [data]);

  useEffect(() => {
    const handleUpload = async () => {
      uploadLogo(data?.user.id as string, imageURL);
    };

    if (imageURL && imageURL != "") {
      handleUpload();
    }
  }, [imageURL]);

  return (
    <div className="p-5 bg-slate-50 w-full flex flex-col items-center gap-5">
      <h2 className="text-xl font-medium">{data?.user.name}</h2>
      <div className="mt-10">
        <div className="flex gap-5">
          <span>Email</span>
          <span>{data?.user.email}</span>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <span>Company Name</span>
        <input
          type="text"
          value={changeName}
          onChange={(e) => setChangeName(e.target.value)}
          placeholder="Company Name"
          className="p-1 outline-none focus:outline-slate-400 rounded-md"
        />
        <button
          onClick={async () => {
            updateCompanyName(data?.user.id as string, changeName);
          }}
          disabled={changeName == user?.companyName}
          className="p-1 text-xs bg-purple-200 rounded-md disabled:bg-purple-100 disabled:cursor-not-allowed"
        >
          Update
        </button>
      </div>
      {user?.logo && (
        <Image
          width={300}
          height={300}
          src={imageURL || user.logo}
          alt="image"
          className="border-2"
        />
      )}
      <div className="flex gap-5">
        <span>Logo</span>
        <CldUploadButton
          className="bg-purple-200 px-3 py-1 text-sm rounded-md"
          uploadPreset="next-assignment"
          onSuccess={async (result: any) =>
            setImageURL(result?.info?.secure_url)
          }
        />
      </div>
    </div>
  );
};

export default Page;
