import { Board } from "@/app/_components/Board/Board"
import styles from './page.module.scss';

export default function Dashboard() {
    return (
        <div className={styles.dashboard} >
            <Board />
        </div>
    )
}
