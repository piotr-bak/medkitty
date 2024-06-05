import type { Pet } from "@/app/_types";
import Link from "next/link";
import styles from './PetList.module.scss';
import { useFetch } from "@/app/_lib/hooks/useFetch";

export function PetList() {
    const { data: pets, isError } = useFetch<Pet[]>( "/api/pets" );

    if ( isError ) return <div>an error occured</div>

    return (
        <div className={styles.board}>
            <ul className={styles.list}>
                {( pets && pets.length > 0 ) ? (
                    pets.map( pet => {
                        return (
                            <li key={pet.id} className={styles.item}>
                                <p>{pet.name}</p>
                                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet?id=${pet.id}`}>
                                    <button className={styles.buttonDetails} aria-label="see more">{'->'}</button>
                                </Link>
                            </li>
                        )
                    } )
                ) : ( !isError ) && <p>loading data</p>}
            </ul>
        </div >
    )
}
