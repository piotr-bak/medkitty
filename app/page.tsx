import { SignInButton } from "./_components/SignInButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>MedKitty</h1>
      <SignInButton />
    </main>
  );
}
