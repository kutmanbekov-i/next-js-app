import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/leads
 * Fetch all leads
 */
export async function GET() {
  try {
    const leads = await prisma.lead.findMany();

    const formattedLeads = leads.map((lead) => ({
      ...lead,
      visas: lead.visas.split(","),
    }));

    return NextResponse.json(formattedLeads, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

/**
 * POST /api/leads
 * Create a new lead
 */
export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, linkedIn, visas, resumeUrl, additional } = await req.json();

    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        linkedIn,
        visas: visas.join(","),
        resumeUrl,
        additional,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
