import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Product-page
        </Link>
      </div>
    </header>
  );
}
