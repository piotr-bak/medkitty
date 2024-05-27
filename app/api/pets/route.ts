import { auth, validateSession } from "@/auth";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await auth();
    const isSessionValid = await validateSession(session);

    if (!isSessionValid) return NextResponse.redirect("/", 401);

    const pets = await prisma.pet.findMany({
        where: {
            owners: {
                some: {
                    id: session?.user?.id,
                },
            },
        },
    });

    return NextResponse.json(pets);
}

export async function POST(request: Request) {
    const session = await auth();
    const isSessionValid = await validateSession(session);

    if (!isSessionValid) return NextResponse.redirect("/", 401);

    try {
        const { name, breed, age } = await request.json();
        const newPet = await prisma.pet.create({
            data: {
                name,
                breed,
                age: parseInt(age, 10),
                owners: {
                    connect: { id: session?.user?.id },
                },
            },
        });

        return NextResponse.json(newPet, { status: 201 });
    } catch (error) {
        console.error("Error adding pet:", error);
        return NextResponse.json(
            { error: "Failed to add pet" },
            { status: 500 }
        );
    }
}
