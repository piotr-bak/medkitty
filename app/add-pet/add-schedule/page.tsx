'use client'
import Link from "next/link";
import { AnimalProvider } from "@/utils/state";

export default function AddSchedule() {
  return (
    <AnimalProvider>
      <main className="">
        <h2>when would you want to be notified?</h2>
        <Link href="../active-pet">done!</Link>
        </main>
      </AnimalProvider>
  );
}
