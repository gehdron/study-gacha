import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-neutral-950 to-black text-white flex flex-col">
      <nav className="flex justify-between items-center px-8 py-6">
        <span className="text-xl font-bold tracking-tight">Study Gacha</span>
        <div className="flex gap-4 text-sm">
          <Link href="/login" className="hover:text-purple-300">Log in</Link>
          <Link
            href="/signup"
            className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-6">
        <h1 className="text-5xl font-bold tracking-tight max-w-2xl">
          Study. Earn. Decorate.
        </h1>
        <p className="text-neutral-400 max-w-md text-lg">
          Turn your study sessions into pulls, and build a room worth showing off.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/signup"
            className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-medium"
          >
            Get started
          </Link>
          <Link
            href="/room"
            className="bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-lg font-medium"
          >
            View demo room
          </Link>
        </div>
      </main>
    </div>
  );
}