'use client'
import { Dial } from '@/app/_components/Dial/Dial';
import { PetList } from '@/app/_components/PetList/PetList';
import illustration from '../../_assets/vet-illustration.svg'

export default function Page() {
    return (
        <>
            <section>
                <PetList />
                <Dial />
            </section>
        </>
    );
}
