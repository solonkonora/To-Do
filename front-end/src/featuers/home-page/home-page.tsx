import Image from "next/image";
import Link from "next/link";
import Team from "./team";

export default function HomePage() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-start">
      <div className="flex flex-col gap-4 items-center pt-8">
        <p className="text-secondary-color font-semibold">Welcome To The</p>
        <p className="text-primary-color font-bold text-3xl">R-Devs Todo App</p>
      </div>

      <Image src="/assets/landing.svg" alt="My Icon" width={500} height={500} />

      <div className="flex flex-col w-[80%] items-center pb-10 border-b-2 border-background-primary-color">
        <p className="text-secondary-color pt-10">
          Create track, and manage your daily tasks
        </p>

        <Link
          href="/todos"
          className="bg-primary-color text-white px-16 py-2 rounded-md mt-6"
        >
          Get Started
        </Link>
      </div>

      <div className="flex items-center pt-10">
        <p className="text-primary-color text-4xl">Meet our Team</p>
      </div>

      <Team />
    </main>
  );
}
