import React, { useState, useCallback, useRef, useEffect } from "react";
import SpriteText from "three-spritetext";
import dynamic from "next/dynamic";
import ForceGraph3D, {
  GraphData,
  ForceGraphMethods,
} from "react-force-graph-3d";
import { useWindowSize } from "@react-hook/window-size";
import { useRouter } from "next/router";
import Link from "next/link";
import raw_data from "../../data/alookso_u/G_user_first_post_from_3";
import { FieldErrors, useForm } from "react-hook-form";

const ForceGraph = dynamic(() => import("../../components/ForceGraph"), {
  ssr: false,
});

interface IdForm {
  ID: string;
}

const App = () => {
  const [width, height] = useWindowSize();
  const [GD, setGD] = useState<GraphData & any>();
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  useEffect(() => {
    console.log(GD);
  }, [GD]);

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node: any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
      node.neighbors.forEach((neighbor: any) => highlightNodes.add(neighbor));
      node.links.forEach((link: any) => highlightLinks.add(link));
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const highlightNodeFunction = (node: any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
      node.neighbors.forEach((neighbor: any) => highlightNodes.add(neighbor));
      node.links.forEach((link: any) => highlightLinks.add(link));
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IdForm>({
    mode: "onChange",
    defaultValues: {
      ID: "x4WtnB",
    },
  });
  const onValid = async (validForm: IdForm) => {
    var found = GD.nodes.find(
      (node: any) => node.id === "/users/" + validForm.ID
    );
    highlightNodeFunction(found);
  };
  const onInvalid = (errors: FieldErrors) => {};

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center bg-purple-200">
        <div className=" w-full ">
          <ForceGraph
            graphData={GD}
            width={width * 1}
            height={height * 1}
            enableNodeDrag={false}
            nodeThreeObject={(node: any) => {
              const sprite = new SpriteText(node.id_name);
              sprite.color = highlightNodes.has(node)
                ? node === hoverNode
                  ? "rgb(255,0,0,1)"
                  : "rgba(255,160,0,0.8)"
                : "rgba(0,255,255,0.6)";
              sprite.textHeight = highlightNodes.has(node)
                ? node === hoverNode
                  ? 15
                  : 10
                : 5;
              //   sprite.textHeight = 5;
              return sprite;
            }}
            linkWidth={(link: any) => (highlightLinks.has(link) ? 1.5 : 0.1)}
            linkDirectionalParticles={(link: any) =>
              highlightLinks.has(link) ? 2 : 0
            }
            linkDirectionalParticleWidth={1.5}
          />
        </div>
      </div>

      <div
        className="fixed top-[15px] right-[15px] bg-purple-300 flex items-center justify-center
      px-2 rounded-xl"
      >
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className="space-y-2 my-2 w-24">
            <div className="flex flex-col">
              <label htmlFor="ID">User ID</label>
              <input
                className="border border-gray-700"
                // className=
                id="ID"
                type="text"
                {...register("ID", { required: true })}
              />
            </div>
            <div className="flex justify-center items-center space-x-3">
              <button
                className="bg-purple-500 px-4 py-2 rounded-lg shadow-lg text-white"
                type="submit"
              >
                {"Find"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {!isLoaded && (
        <button
          className="fixed hover:bg-purple-500 border-0 aspect-square 
        border-transparent transition-colors cursor-pointer 
        bottom-[15px] right-[15px] shadow-xl bg-purple-700 rounded-full 
        w-20 flex items-center justify-center text-white"
          onClick={() => {
            const data_load: GraphData & any = {
              nodes: raw_data.nodes,
              links: raw_data.links,
            };

            const dict_node_id: { [key: string]: number } = {};
            data_load.nodes.forEach((node: any, i: number) => {
              dict_node_id[node.id] = i;
            });

            // cross-link node objects
            data_load.links.forEach((link: any) => {
              data_load.nodes.find((node: any) => node.id === link.source);

              let a = data_load.nodes[dict_node_id[link.source]];
              let b = data_load.nodes[dict_node_id[link.target]];

              a.neighbors ??= [];
              b.neighbors ??= [];
              a.neighbors.push(b);
              b.neighbors.push(a);

              a.links ?? (a.links = []);
              b.links ?? (b.links = []);
              a.links.push(link);
              b.links.push(link);
            });
            setGD(data_load);
            setIsLoaded(true);
          }}
        >
          Load
        </button>
      )}
      {/* 
      <Link href="/">
        <a
          className="fixed top-[15px] left-[15px] w-20 font-medium text-purple-700
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
      </Link> */}
    </div>
  );
};

export default App;
