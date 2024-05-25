import { AuthButton } from "./_components/SignInOutButtons/AuthButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>MedKitty</h1>
      <AuthButton role={'sign-in'} />
    </main>
  );
}
