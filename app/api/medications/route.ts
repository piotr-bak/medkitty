import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

// export async function GET(request: Request) {
//     const session = await getSession();

//     if (!session?.user)
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const user = await prisma.user.findUnique({
//         where: {
//             foreignId: session.user.sub,
//         },
//     });

//     if (!user) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const { searchParams } = new URL(request.url);
//     const petId = searchParams.get("id");

//     try {
//         if (petId) {
//             const pet = await prisma.pet.findFirst({
//                 where: {
//                     id: petId,
//                     OR: [
//                         {
//                             owners: {
//                                 some: {
//                                     id: user.id,
//                                 },
//                             },
//                         },
//                         {
//                             caretakers: {
//                                 some: {
//                                     id: user.id,
//                                 },
//                             },
//                         },
//                     ],
//                 },
//             });

//             if (!pet)
//                 return NextResponse.json(
//                     { error: "Pet not found" },
//                     { status: 404 }
//                 );

//             return NextResponse.json(pet);
//         } else if (!petId) {
//             const pets = await prisma.pet.findMany({
//                 where: {
//                     OR: [
//                         {
//                             owners: {
//                                 some: {
//                                     id: user.id,
//                                 },
//                             },
//                         },
//                         {
//                             caretakers: {
//                                 some: {
//                                     id: user.id,
//                                 },
//                             },
//                         },
//                     ],
//                 },
//             });

//             return NextResponse.json(pets);
//         }
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }

export async function POST(request: Request) {
    const session = await getSession();

    if (!session?.user)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { name, totalDoses, doseUnit } = await request.json();
        const user = await prisma.user.findUnique({
            where: {
                foreignId: session.user.sub,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const totalDosesNumber = parseInt(totalDoses);

        if (isNaN(totalDosesNumber)) {
            return NextResponse.json(
                { error: "Invalid total doses value" },
                { status: 400 }
            );
        }

        const newMedication = await prisma.medication.create({
            data: {
                name,
                totalDoses: totalDosesNumber,
                doseUnit,
                userId: user.id,
            },
        });
        return NextResponse.json(newMedication, { status: 201 });
    } catch (error) {
        console.error("Error adding medication:", error);
        return NextResponse.json(
            { error: "Failed to add medication" },
            { status: 500 }
        );
    }
}

// export async function PUT(request: Request) {
//     const session = await getSession();

//     if (!session?.user)
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     try {
//         const { id: petId, name, species, breed, sex } = await request.json();
//         const user = await prisma.user.findUnique({
//             where: {
//                 foreignId: session.user.sub,
//             },
//         });

//         if (!user) {
//             return NextResponse.json(
//                 { error: "User not found" },
//                 { status: 404 }
//             );
//         }

//         const pet = await prisma.pet.findFirst({
//             where: {
//                 id: petId,
//                 owners: {
//                     some: {
//                         id: user.id,
//                     },
//                 },
//             },
//         });

//         if (!pet) {
//             return NextResponse.json(
//                 { error: "Pet not found" },
//                 { status: 404 }
//             );
//         }

//         const updatedPet = await prisma.pet.update({
//             where: {
//                 id: petId,
//             },
//             data: {
//                 name,
//                 species,
//                 breed,
//                 sex,
//             },
//         });

//         return NextResponse.json(updatedPet, { status: 200 });
//     } catch (error) {
//         console.error("Error adding pet:", error);
//         return NextResponse.json(
//             { error: "Failed to add pet" },
//             { status: 500 }
//         );
//     }
// }