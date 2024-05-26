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
            const response = await fetch( "/api/pets" );
            const data = await response.json();
            setPets( data );
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
            <button className={styles.buttonAdd} aria-label="add pet">{'+'}</button>
        </div>
    )
}
