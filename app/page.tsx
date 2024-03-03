import Link from "next/link";
import Calendar from "./components/dashboard/Calendar";
import PillPanel from "./components/dashboard/PillPanel";
import DashboardImg from "./components/dashboard/Glyph";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="pt-12">
      <h1>Welcome to MedKitty</h1>
      </div>
      <Link href="/add-pet">your pets</Link>
      <br></br>
      
    </main>
  );
}
