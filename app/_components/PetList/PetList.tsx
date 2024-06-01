'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Pet } from "@/app/_types";
import styles from './petlist.module.scss';

export function PetList() {
    const [pets, setPets] = useState<Pet[]>( [] );

    useEffect( () => {
        const fetchPets = async () => {
            try {
                const response = await fetch( "/api/pets" );
                if ( !response.ok ) {
                    throw new Error( `HTTP error! status: ${response.status}` );
                }
                const data = await response.json();
                setPets( data );
            } catch ( error ) {
                console.error( "Failed to fetch pets:", error );
            }
        };
        fetchPets();
    }, [] );

    return (
        <div className={styles.board}>
            <ul className={styles.list}>
                {pets.map( pet => {
                    return (
                        <li key={pet.id} className={styles.item}>
                            <p>{pet.name}</p>
                            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet?id=${pet.id}`}>
                                <button className={styles.buttonDetails} aria-label="see more">{'->'}</button>
                            </Link>
                        </li>
                    )
                } )}
            </ul>
        </div >
    )
}
