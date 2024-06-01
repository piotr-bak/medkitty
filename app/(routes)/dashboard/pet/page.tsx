'use client'
import { PetDetails } from "@/app/_components/PetDetails/PetDetails";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const petId = searchParams.get( 'id' );

    return (
        <>
            <PetDetails petId={petId} />
            <Link href={'/dashboard'}>
                <button>go back</button>
            </Link>
        </>
    )
}
