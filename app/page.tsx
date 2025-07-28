import { MainContent, Navigation, Sidebar } from "@/src/components";

export default function Home() {
  return (
    <main className="flex flex-col h-screen overflow-auto">
      <Navigation />
      <section className="grid grid-cols-[auto_1fr] flex-1 overflow-auto gap-[clamp(20px,3.3vw,64px)] p-10">
        <Sidebar />
        <MainContent />
      </section>
    </main>
  );
}
