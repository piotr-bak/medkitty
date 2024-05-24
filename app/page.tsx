import Image from "next/image";
import styles from "./page.module.css";
import { SignInButton } from "./_components/SignInButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <SignInButton />
      <h1>MedKitty</h1>
    </main>
  );
}
