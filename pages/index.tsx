import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="bg-purple-700  py-2">
        <h1 className="flex justify-center text-white text-xl font-mono">
          Project Clairvoyance
        </h1>
      </div>
      <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-3 px-10 py-10">
        <Link href="/projects/alookso_u">
          <div className="h-96 shadow-lg rounded-xl border-2 hover:ring-2 hover:ring-purple-700 cursor-pointer">
            <div className="relative h-4/5 m-5">
              <Image
                className="rounded-xl"
                layout="fill"
                src="/static/images/project1_alookso_u.PNG"
                alt=""
              />
            </div>
            <span className="flex items-center justify-center text-lg font-medium -mt-1">
              Alookso user network
            </span>
          </div>
        </Link>
        <Link href="/projects/alookso_u_HL">
          <div className="h-96 shadow-lg rounded-xl border-2 hover:ring-2 hover:ring-purple-700 cursor-pointer">
            <div className="relative h-4/5 m-5">
              <Image
                className="rounded-xl"
                layout="fill"
                src="/static/images/project4_alookso_u_HL.PNG"
                alt=""
              />
            </div>
            <span className="flex items-center justify-center text-lg font-medium -mt-1">
              Alookso user network(HL)
            </span>
          </div>
        </Link>
        <Link href="/projects/21st_law">
          <div className="h-96 shadow-lg rounded-xl border-2 hover:ring-2 hover:ring-purple-700 cursor-pointer">
            <div className="relative h-4/5 m-5">
              <Image
                className="rounded-xl"
                layout="fill"
                src="/static/images/project2_21st_law.PNG"
                alt=""
              />
            </div>
            <span className="flex items-center justify-center text-lg font-medium -mt-1">
              21st National Assembly Voting
            </span>
          </div>
        </Link>
        <Link href="/projects/youtube_map">
          <div className="h-96 shadow-lg rounded-xl border-2 hover:ring-2 hover:ring-purple-700 cursor-pointer">
            <div className="relative h-4/5 m-5">
              <Image
                className="rounded-xl"
                layout="fill"
                src="/static/images/project3_youtube_map.PNG"
                alt=""
              />
            </div>
            <span className="flex items-center justify-center text-lg font-medium -mt-1">
              Youtube map
            </span>
          </div>
        </Link>
        <Link href="/projects/your_network">
          <div className="h-96 shadow-lg rounded-xl border-2 hover:ring-2 hover:ring-purple-700 cursor-pointer">
            <div className="relative h-4/5 m-5">
              <Image
                className="rounded-xl"
                layout="fill"
                src="/static/images/project0_your_network.PNG"
                alt=""
              />
            </div>
            <span className="flex items-center justify-center text-lg font-medium -mt-1">
              Visualize your network
            </span>
          </div>
        </Link>
      </div>

      <footer className="footer mt-auto bg-purple-700 text-white">
        <p className="p-1 text-right text-s mr-4">mons1220@gmail.com</p>
      </footer>
    </div>
  );
};

export default Home;
