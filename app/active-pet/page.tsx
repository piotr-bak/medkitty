import { AnimalProvider } from "@/utils/state";
import Calendar from "../components/dashboard/Calendar";
import PillPanel from "../components/dashboard/PillPanel";
import DashboardImg from "../components/dashboard/Glyph";

export default function Home() {
  return (
    <AnimalProvider>
      <main className="flex items-center justify-center">
        <div className="pt-12">
          <Calendar />
          <PillPanel />
          <DashboardImg />
        </div>
      </main>
    </AnimalProvider>
  );
}
