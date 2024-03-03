'use client'
import Link from 'next/link';
import { AnimalProvider } from '@/utils/state';

export default function AddName() {
  return (
    <AnimalProvider>
      <main className="">
        <h2>hello</h2>
        <p>what is your pet&#39;s name?</p>
        <form>
        </form>
        <Link href="./add-medication">next</Link>
        </main>
      </AnimalProvider>
  );
}
