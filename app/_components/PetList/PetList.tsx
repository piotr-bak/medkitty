'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function PetList() {
    const { data: session, status } = useSession();
    const [pets, setPets] = useState( [] );

    useEffect( () => {
        const fetchPets = async () => {
            const response = await fetch( "/api/pets" );
            const data = await response.json();
            setPets( data );
        };

        fetchPets();
    }, [] );

    return (
        <div>
            here will be PetList
            {JSON.stringify( pets )}
        </div>
    )
}
