import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center mt-5">
      <h1>front page</h1>
      <Button asChild>
        <Link href="/dashboard">Click here to go to app</Link>
      </Button>
    </main>
  );
}
