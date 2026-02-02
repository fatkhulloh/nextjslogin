import Image from "next/image";
import Navbars from "./layout/Navbars";
import Footer from "./layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbars />


      <main className="flex-1 flex items-start">
        <h1 className="text-4xl font-bold">Home</h1>
      </main>

      <Footer />
    </div>
  );
}
