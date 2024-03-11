import Link from "next/link";
import { cookies } from "next/headers";
import LocalProxy from "@/components/client/LocalProxy";
import { validateToken } from "@/middleware/AuthService";

async function getData() {
  return validateToken(cookies().get("token"));
}

export default async function LandingPage() {
  const data = await getData();

  if (data) {
    return <LocalProxy page="/home" />;
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href="/login">Login</Link>
      </main>
    );
  }
}
