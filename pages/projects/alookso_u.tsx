import React, { useState, useCallback, useRef } from "react";
import SpriteText from "three-spritetext";
import dynamic from "next/dynamic";
import ForceGraph3D, {
  GraphData,
  ForceGraphMethods,
} from "react-force-graph-3d";
import raw_data from "../../data/G_user";
import { useWindowSize } from "@react-hook/window-size";
import { useRouter } from "next/router";
import Link from "next/link";

const ForceGraph = dynamic(() => import("../../components/ForceGraph"), {
  ssr: false,
});

const App = () => {
  const [width, height] = useWindowSize();
  const [GD, setGD] = useState<GraphData & any>();
  const [BT, setBT] = useState(false);

  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center bg-purple-700">
        <div className=" w-full ">
          <ForceGraph
            graphData={GD}
            width={width * 1}
            height={height * 1}
            nodeAutoColorBy="category"
            nodeThreeObject={(node: any) => {
              const sprite = new SpriteText(node.id_name);
              sprite.color = node.color;
              sprite.textHeight = 9;
              return sprite;
            }}
            linkDirectionalParticles={1}
            linkDirectionalParticleWidth={1}
            linkDirectionalParticleColor={() => "red"}
            enableNodeDrag={false}
          />
        </div>
      </div>
      <button
        className="fixed hover:bg-purple-700 border-0 aspect-square 
        border-transparent transition-colors cursor-pointer 
        bottom-14 right-10 shadow-xl bg-purple-900 rounded-full 
        w-20 flex items-center justify-center text-white"
        onClick={() => {
          const data_load: GraphData & any = {
            nodes: raw_data.nodes,
            links: raw_data.links,
          };
          setGD(data_load);
          setBT(true);
        }}
      >
        Load
      </button>
      <Link href="/">
        <a
          className="fixed top-14 left-10 w-20 font-medium text-purple-900
        hover:text-purple-700 flex items-center justify-center cursor-pointer"
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
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </a>
      </Link>
    </div>
  );
};

export default App;
