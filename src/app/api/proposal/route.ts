import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, name } = await req.json();
    const newProposal = await prisma.proposal.create({
      data: { userId, name },
    });
    // console.log("createProposal====", newProposal);

    return new Response(
      JSON.stringify({ name: newProposal.name, id: newProposal.id })
    );
  } catch (error) {
    console.log(error);

    return new Response("Internal Server Error!");
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    const { proposalId } = await req.json();
    console.log({ proposalId });

    const deletedProposal = await prisma.proposal.delete({
      where: { id: proposalId },
    });

    return new Response();
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error!");
  }
}

export async function GET(req: NextRequest) {
  try {
    const proposalId = req.nextUrl.searchParams.get("proposalId") ?? undefined;

    // console.log("proposal-get===", { proposalId });

    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
    });

    return new Response(JSON.stringify(proposal));
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error!");
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, pricing, intro, whyChooseUs, goals, objective } =
      await req.json();

    console.log("update proposal====", {
      id,
      name,
      pricing,
      intro,
      whyChooseUs,
      goals,
      objective,
    });
    const updateProposal = await prisma.proposal.update({
      where: { id: id },
      data: { name, pricing, intro, whyChooseUs, goals, objective },
    });

    return new Response(JSON.stringify(updateProposal));
  } catch (err: any) {
    console.log(err);
    return new Response(err.message);
  }
}
