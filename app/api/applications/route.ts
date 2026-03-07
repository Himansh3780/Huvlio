import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateApplicationContent } from "@/lib/huggingface";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const generateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  type: z.enum(["job", "university", "scholarship", "visa", "internship"]),
  experience: z.string().min(10),
  skills: z.string().min(5),
  achievements: z.string().min(10),
  motivations: z.string().min(10),
  template: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const input = generateSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check generation limit
    const subscription = user.subscription || {
      generationsUsed: 0,
      monthlyGenerations: 5,
    };

    if (subscription.generationsUsed >= subscription.monthlyGenerations) {
      return NextResponse.json(
        { error: "Monthly generation limit reached. Upgrade to premium." },
        { status: 429 }
      );
    }

    // Generate content
    const prompt = `Generate a professional ${input.type} application for: ${input.name}. 
    Experience: ${input.experience}. Skills: ${input.skills}. 
    Achievements: ${input.achievements}. Motivation: ${input.motivations}`;

    const generatedContent = await generateApplicationContent(prompt, input);

    // Save application
    const application = await prisma.application.create({
      data: {
        userId: user.id,
        title: `${input.type} Application - ${input.name}`,
        type: input.type,
        content: generatedContent,
        userInput: input,
        template: input.template || "standard",
      },
    });

    // Update generation count
    if (user.subscription) {
      await prisma.subscription.update({
        where: { id: user.subscription.id },
        data: { generationsUsed: user.subscription.generationsUsed + 1 },
      });
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Generation error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate application" },
      { status: 500 }
    );
  }
}

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const applications = await prisma.application.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
