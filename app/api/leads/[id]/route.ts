import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * PATCH /api/leads/:id
 * Update lead status
 */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();

    const updatedLead = await prisma.lead.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updatedLead, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 });
  }
}
