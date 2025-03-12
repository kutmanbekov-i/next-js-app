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
    const formData = await req.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const linkedIn = formData.get("linkedIn") as string;
    const visas = formData.get("visas") as string;
    const resume = formData.get("resume") as File | null;
    const additional = formData.get("additional") as string;

    if (!firstName || !lastName || !email || !linkedIn || !visas) {
      throw new Error("Missing required fields");
    }

    let resumeUrl = null;
    if (resume) {
      const buffer = await resume.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      console.log("Received resume file:", resume.name, "Size:", bytes.length);
      resumeUrl = `/uploads/${resume.name}`;
    }

    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        linkedIn,
        visas,
        resumeUrl,
        additional,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: error || "Unknown error" }, { status: 500 });
  }
}
