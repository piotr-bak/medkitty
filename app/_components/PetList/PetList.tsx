'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Pet } from "@/app/_types";
import styles from './petlist.module.scss';

export function PetList() {
    const { data: session, status } = useSession();
    const [pets, setPets] = useState<Pet[]>( [] );

    useEffect( () => {
        const fetchPets = async () => {
            try {
                const response = await fetch( "/api/pets" );

                // Check if the response is OK (status code 200-299)
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
            {status === 'loading' && <p>loading data...</p>}
            {( status !== 'loading' && pets ) && (
                <ul className={styles.list}>
                    {pets.map( pet => {
                        return (
                            <li key={pet.id} className={styles.item}>
                                <p>{pet.name}</p>
                                <button className={styles.buttonDetails} aria-label="see more">{'->'}</button>
                            </li>
                        )
                    } )}
                </ul>
            )}
            <button className={styles.buttonAdd} aria-label="add pet" onClick={() => { }}>{'+'}</button>
        </div>
    )
}
