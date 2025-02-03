import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link
        href="/documents/123"
        className="hover:underline hover:underline-offset-2 hover:decoration-blue-500"
      >
        Open Document 123
      </Link>
    </div>
  );
};

export default Home;
