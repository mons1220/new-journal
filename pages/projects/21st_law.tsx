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
import raw_data from "../../data/law_21st/G_law_21st_rejct";

const ForceGraph = dynamic(() => import("../../components/ForceGraph"), {
  ssr: false,
});

const App = () => {
  const [width, height] = useWindowSize();
  const [GD, setGD] = useState<GraphData & any>();
  const initialdensity = "2";

  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center bg-purple-200">
        <div className=" w-full ">
          <ForceGraph
            graphData={GD}
            width={width * 1}
            height={height * 1}
            // nodeAutoColorBy="소속"
            nodeRelSize={3}
            nodeColor={(node: any) => {
              node.소속 == "국민의힘"
                ? "red"
                : node.소속 === "더불어민주당"
                ? "Aqua"
                : node.소속 === "국민의당"
                ? "Orange"
                : node.소속 === "열린민주당"
                ? "blue"
                : node.소속 === "정의당"
                ? "yellow"
                : node.소속 === "기본소득당"
                ? "Lime"
                : node.소속 === "무소속"
                ? "Silver"
                : node.소속 === "의안"
                ? "white"
                : "Navy";
            }}
            nodeThreeObject={(node: any) => {
              if (node.소속 != "의안") {
                const sprite = new SpriteText(node.view);
                sprite.color =
                  node.소속 == "국민의힘"
                    ? "red"
                    : node.소속 === "더불어민주당"
                    ? "Aqua"
                    : node.소속 === "국민의당"
                    ? "Orange"
                    : node.소속 === "열린민주당"
                    ? "blue"
                    : node.소속 === "정의당"
                    ? "yellow"
                    : node.소속 === "기본소득당"
                    ? "Lime"
                    : node.소속 === "무소속"
                    ? "Silver"
                    : node.소속 === "의안"
                    ? "white"
                    : "Navy";
                sprite.textHeight = 10;
                return sprite;
              }
            }}
            linkDirectionalParticles={1}
            linkDirectionalParticleWidth={1}
            linkDirectionalParticleColor={() => "pink"}
            enableNodeDrag={false}
            nodeLabel="id"
            linkWidth={0.2}
          />
        </div>
      </div>

      <button
        className="fixed hover:bg-purple-500 border-0 aspect-square 
        border-transparent transition-colors cursor-pointer 
        bottom-[5%] right-[5%] shadow-xl bg-purple-700 rounded-full 
        w-20 flex items-center justify-center text-white"
        onClick={() => {
          const data_load: GraphData & any = {
            nodes: raw_data.nodes,
            links: raw_data.links,
          };
          setGD(data_load);
        }}
      >
        Load
      </button>
      <Link href="/">
        <a
          className="fixed top-[2%] left-[2%] w-20 font-medium text-purple-700
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
