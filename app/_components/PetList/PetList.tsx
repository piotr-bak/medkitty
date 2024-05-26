'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Pet } from "@/app/_types";

export function PetList() {
    const { data: session, status } = useSession();
    const [pets, setPets] = useState<Pet[]>( [] );

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
            {status === 'loading' && <p>loading data...</p>}
            {( status !== 'loading' && pets ) && (
                <ul>
                    {pets.map( pet => {
                        return (
                            <li key={pet.id}>
                                <p>{pet.name}</p>
                                <button aria-label="see more">{'->'}</button>
                            </li>
                        )
                    } )}
                </ul>
            )}
            <button aria-label="add pet">{'+'}</button>
        </div>
    )
}
