'use client'
import Link from "next/link";
import { AnimalProvider } from "@/utils/state";

export default function AddMedication() {
  return (
      <AnimalProvider>
        <main className="">
          <h2>what medication do you need to administer?</h2>
          <p>medication name</p>
          <p>frequency</p>
          <p>start date</p>
          <Link href="./add-schedule">next</Link>
        </main>
      </AnimalProvider>
    );
  }
  