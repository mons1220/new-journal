import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <div className="bg-purple-700">
        <h1 className="flex justify-center text-white py-4 text-2xl">
          Project Clairvoyance
        </h1>
      </div>
      <div className="grid gap-14 lg:grid-cols-2 xl:grid-cols-3 px-10 py-10">
        {[...Array(1)].map((_, i) => (
          <Link href="/projects/alookso_u">
            <div className="shadow-lg rounded-xl border-2 hover:ring-2 hover:ring-purple-700 cursor-pointer">
              <div className="flex items-center justify-center m-5">
                <img
                  className="object-fill rounded-xl"
                  src="/images/project1_alookso_u.png"
                />
              </div>
              <span className="flex items-center justify-center text-md font-medium my-2">
                #1 - Alookso user network
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
