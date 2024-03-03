import Link from 'next/link';
import AddAnimal from './add-name/page';
import AddMedication from './add-medication/page';
import AddSchedule from './add-schedule/page';


export default function AddPet() {
    return (
        <div className="">
            <Link href="add-pet/add-name">add fluff</Link>
        </div>
    )
}
