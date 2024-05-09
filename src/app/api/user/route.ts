import prisma from "@/server/prisma";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const field = req.nextUrl.searchParams.get("field");
    let user;
    if (field == "companyName") {
      const { id, companyName } = await req.json();

      user = await prisma.user.update({
        where: { id },
        data: { companyName: companyName },
      });
    } else if (field == "logo") {
      const { id, url } = await req.json();

      user = await prisma.user.update({
        where: { id },
        data: { logo: url },
      });
    }
    return new Response();
  } catch (error: any) {
    console.log(error);
    return { message: error.message, status: 500 };
  }
}
