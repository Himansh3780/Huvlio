import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const application = await prisma.application.findUnique({
      where: { id: params.id },
    });

    if (!application || application.userId !== user.id) {
      return NextResponse.json(
        { error: "Application not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.application.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const application = await prisma.application.findUnique({
      where: { id: params.id },
    });

    if (!application || application.userId !== user.id) {
      return NextResponse.json(
        { error: "Application not found or unauthorized" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const updated = await prisma.application.update({
      where: { id: params.id },
      data: {
        content: body.content,
        status: body.status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}
