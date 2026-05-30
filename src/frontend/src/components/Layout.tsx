import { Outlet } from "react-router-dom";
import { FloatingDock } from "./FloatingDock";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ParticleBackground } from "./ParticleBackground";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <ParticleBackground />
      <Header />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingDock />
    </div>
  );
}
