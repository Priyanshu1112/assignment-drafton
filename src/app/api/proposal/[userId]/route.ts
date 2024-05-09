import prisma from "@/server/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const userId = await params;

    let proposals;
    if (userId) {
      proposals = await prisma.proposal.findMany({
        where: { userId: userId.userId },
      });
    }

    // console.log({ proposals });
    return new Response(JSON.stringify({ proposals }));
  } catch (error) {
    console.log(error);

    return new Response("Internal Server Error!");
  }
}
