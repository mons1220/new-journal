import React, { useState, useCallback, useRef } from "react";
import SpriteText from "three-spritetext";
import dynamic from "next/dynamic";
import ForceGraph3D, {
  GraphData,
  ForceGraphMethods,
} from "react-force-graph-3d";
import { useWindowSize } from "@react-hook/window-size";
import { useRouter } from "next/router";
import Link from "next/link";
import raw_data_2 from "../../data/alookso_u/G_user_first_post_from_2";
import raw_data_3 from "../../data/alookso_u/G_user_first_post_from_3";
import raw_data_4 from "../../data/alookso_u/G_user_first_post_from_4";
import raw_data_5 from "../../data/alookso_u/G_user_first_post_from_5";

const ForceGraph = dynamic(() => import("../../components/ForceGraph"), {
  ssr: false,
});

const raw_data_array = [raw_data_2, raw_data_3, raw_data_4, raw_data_5];

const App = () => {
  const [width, height] = useWindowSize();
  const [GD, setGD] = useState<GraphData & any>();
  const initialdensity = "2";
  const [density, setDensity] = useState<string>(initialdensity);

  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  const densityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDensity(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center bg-purple-200">
        <div className=" w-full ">
          <ForceGraph
            graphData={GD}
            width={width * 1}
            height={height * 1}
            // nodeAutoColorBy="category"
            nodeColor={(node: any) => (node.category === 0 ? "red" : "blue")}
            nodeThreeObject={(node: any) => {
              const sprite = new SpriteText(node.id_name);
              sprite.color =
                node.category <= 3
                  ? node.category <= 1
                    ? "red"
                    : "pink"
                  : "blue";
              sprite.textHeight = 9;
              return sprite;
            }}
            linkDirectionalParticles={1}
            linkDirectionalParticleWidth={1}
            linkDirectionalParticleColor={() => "pink"}
            enableNodeDrag={false}
            linkWidth={0.3}
          />
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-start 
      fixed right-0 top-[10%]"
      >
        <input
          className="w-1/2 border-0 cursor-pointer -rotate-90"
          type="range"
          min="0"
          max="3"
          step="1"
          defaultValue={initialdensity}
          onChange={densityHandler}
        ></input>
        <p className="mt-6 text-white">Weight: {parseInt(density) + 2}</p>
      </div>

      <button
        className="fixed hover:bg-purple-500 border-0 aspect-square 
        border-transparent transition-colors cursor-pointer 
        bottom-[5%] right-[5%] shadow-xl bg-purple-700 rounded-full 
        w-20 flex items-center justify-center text-white"
        onClick={() => {
          const data_load: GraphData & any = {
            nodes: raw_data_array[parseInt(density)].nodes,
            links: raw_data_array[parseInt(density)].links,
          };
          setGD(data_load);
        }}
      >
        Load
      </button>
      <Link href="/">
        <a
          className="fixed top-[2%] left-[2%] w-10 font-medium text-purple-700
        hover:text-purple-500 flex items-center justify-center cursor-pointer"
          onClick={() => {
            onClick;
          }}
        >
          <svg
            className="w-15 h-15"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </a>
      </Link>
    </div>
  );
};

export default App;
