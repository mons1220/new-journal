import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import alookso_u_img from "../public/static/img/project1_alookso_u.png";

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
          <Link key={i} href="/projects/alookso_u">
            <div className="h-96 shadow-lg rounded-xl border-2 hover:ring-2 hover:ring-purple-700 cursor-pointer">
              <div className="relative h-4/5 m-5">
                <Image
                  className="rounded-xl"
                  layout="fill"
                  src={alookso_u_img}
                  alt=""
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
