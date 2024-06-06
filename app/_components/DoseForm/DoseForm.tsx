import styles from './DoseForm.module.scss';

export function DoseForm( { dayId }: { dayId: string } ) {
    return (
        <>
            <h3>add a dose</h3>
            <p>for a day of id {dayId}</p>
        </>
    )
}
