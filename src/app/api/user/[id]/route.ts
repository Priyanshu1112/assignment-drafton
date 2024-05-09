import prisma from "@/server/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const { id } = params;
    console.log("user-id", { id });

    const user = await prisma.user.findUnique({
      where: { id },
      select: { companyName: true, logo: true },
    });

    return new Response(JSON.stringify(user));
  } catch (error: any) {
    console.log(error);
    return new Response(error.message);
  }
}
