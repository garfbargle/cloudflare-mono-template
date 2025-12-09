import { Tabletop } from '@/components/tabletop';

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      <div className="absolute top-4 left-4 z-10">
        <img
          src="/wide-logo.png"
          alt="Dexsy Logo"
          width={150}
          height={37}
          loading="eager"
        />
      </div>
      <div className="w-full h-screen">
        <Tabletop />
      </div>
    </main>
  );
}

export default App;
