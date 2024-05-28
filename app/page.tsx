import { AuthButton } from "./_components/AuthButton/AuthButton";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>MedKitty</h1>
      <AuthButton role={'sign-in'} />
    </main>
  );
}
