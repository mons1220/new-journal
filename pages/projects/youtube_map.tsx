import { NextPage, PreviewData } from "next";
import { FieldErrors, useForm } from "react-hook-form";
import ForceGraph3D, {
  GraphData,
  ForceGraphMethods,
} from "react-force-graph-3d";
import { prepareServerlessUrl } from "next/dist/server/base-server";
import { useWindowSize } from "@react-hook/window-size";
import React, { useEffect, useState, useCallback, useRef } from "react";
import SpriteText from "three-spritetext";
import dynamic from "next/dynamic";
import * as THREE from "three";

// import raw_data from "../../data/youtube_map/test";
// import raw_data from "../../data/youtube_map/garosero";
import raw_data1 from "../../data/youtube_map/garosero_big";
import raw_data2 from "../../data/youtube_map/dotface";
import raw_data3 from "../../data/youtube_map/chim";
import Link from "next/link";
import { useRouter } from "next/router";

const ForceGraph = dynamic(() => import("../../components/ForceGraph"), {
  ssr: false,
});

interface EnterForm {
  videoID: string;
  maxResults: number;
}

interface idForm {
  kind: string;
  videoId: string;
  [x: string]: any;
}
interface thumbnailsDetailForm {
  url: string;
  [x: string]: any;
}
interface thumbnailsForm {
  medium: thumbnailsDetailForm;
  [x: string]: any;
}
interface snippetForm {
  channelID: string;
  channelTitle: string;
  title: string;
  publishedAt: string;
  thumbnails: thumbnailsForm;
  [x: string]: any;
}
interface itemsForm {
  id: idForm;
  snippet?: snippetForm;
  [x: string]: any;
}
interface SearchForm {
  etag: string;
  items: itemsForm[];
  [x: string]: any;
}

const YoutubeMap: NextPage = () => {
  const [width, height] = useWindowSize();
  const [apiState, setApiState] = useState<boolean>(true);
  const [loadState, setLoadState] = useState<number>(0);
  const router = useRouter();

  const [resultNum, setResultNum] = useState<number>(1);
  const [newTarget, setNewTarget] = useState<string[]>([]);
  const [endTarget, setEndTarget] = useState<string[]>([]);
  const [allNodes, setAllNodes] = useState<string[]>([]);
  const [newTmpTarget, setNewTmpTarget] = useState<string[]>([]);
  const [GD, setGD] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  const [GDlog, setGDlog] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<EnterForm>({
    mode: "onChange",
    defaultValues: {
      videoID: "aO-7L-_kvZk",
      maxResults: 1,
    },
  });
  const onValid = async (validForm: EnterForm) => {
    setResultNum(validForm.maxResults);
    const json: SearchForm = await fetch(
      `/api/json_loader?id=${validForm.videoID}&maxResults=${validForm.maxResults}`
    ).then((res) => res.json());

    if (json.error !== undefined) {
      console.log(json);
      setApiState(false);
    } else {
      setApiState(true);
      try {
        if (endTarget.includes(validForm.videoID) == false) {
          setGD((prev) => ({
            nodes: [
              ...prev.nodes,
              {
                id: validForm.videoID,
                view: `https://i.ytimg.com/vi/${validForm.videoID}/mqdefault.jpg`,
                title: "START FROM HERE!",
              },
            ],
            links: prev.links,
          }));
          setGDlog((prev) => ({
            nodes: [
              ...prev.nodes,
              {
                id: validForm.videoID,
                view: `https://i.ytimg.com/vi/${validForm.videoID}/mqdefault.jpg`,
                title: "START FROM HERE!",
              },
            ],
            links: prev.links,
          }));
          setAllNodes((prev) => [...prev, validForm.videoID]);

          json.items.map((content, i) => {
            setGD((prev) => ({
              nodes: [
                ...prev.nodes,
                {
                  id: content.id.videoId,
                  view: content.snippet?.thumbnails.medium.url,
                  title: content.snippet?.title,
                },
              ],
              links: [
                ...prev.links,
                {
                  source: validForm.videoID,
                  target: content.id.videoId,
                },
              ],
            }));
            setGDlog((prev) => ({
              nodes: [
                ...prev.nodes,
                {
                  id: content.id.videoId,
                  view: content.snippet?.thumbnails.medium.url,
                  title: content.snippet?.title,
                },
              ],
              links: [
                ...prev.links,
                {
                  source: validForm.videoID,
                  target: content.id.videoId,
                },
              ],
            }));
            setAllNodes((prev) => [...prev, content.id.videoId]);
            setNewTarget((prev) => [...prev, content.id.videoId]);
          });
          setEndTarget((prev) => [...prev, validForm.videoID]);
        }
      } catch (error) {
        console.log(json);
        console.log(error);
        // if (json.error.code === 403) {
        //   setApiState(false);
        // }
      }
    }
  };
  const onInvalid = (errors: FieldErrors) => {
    // console.log(errors);
  };

  const expandHandler = async () => {
    newTarget.map(async (vId, i) => {
      const json: SearchForm = await fetch(
        `/api/json_loader?id=${vId}&maxResults=${resultNum}`
      ).then((res) => res.json());
      try {
        if (endTarget.includes(vId) == false) {
          json.items.map((content, i) => {
            if (allNodes.includes(content.id.videoId)) {
              setGD((prev) => ({
                nodes: prev.nodes,
                links: [
                  ...prev.links,
                  {
                    source: vId,
                    target: content.id.videoId,
                  },
                ],
              }));
              setGDlog((prev) => ({
                nodes: prev.nodes,
                links: [
                  ...prev.links,
                  {
                    source: vId,
                    target: content.id.videoId,
                  },
                ],
              }));
            } else {
              setGD((prev) => ({
                nodes: [
                  ...prev.nodes,
                  {
                    id: content.id.videoId,
                    view: content.snippet?.thumbnails.medium.url,
                    title: content.snippet?.title,
                  },
                ],
                links: [
                  ...prev.links,
                  {
                    source: vId,
                    target: content.id.videoId,
                  },
                ],
              }));
              setGDlog((prev) => ({
                nodes: [
                  ...prev.nodes,
                  {
                    id: content.id.videoId,
                    view: content.snippet?.thumbnails.medium.url,
                    title: content.snippet?.title,
                  },
                ],
                links: [
                  ...prev.links,
                  {
                    source: vId,
                    target: content.id.videoId,
                  },
                ],
              }));
              setAllNodes((prev) => [...prev, content.id.videoId]);
              setNewTmpTarget((prev) => [...prev, content.id.videoId]);
            }
          });
          setEndTarget((prev) => [...prev, vId]);
        }
      } catch (error) {
        console.log(json);
        if (json.error.code === 403) {
          setApiState(false);
        }
      }
    });

    // newTarget = JSON.parse(JSON.stringify(newTmpTarget));
    setNewTarget(newTmpTarget);
    setNewTmpTarget([]);
  };

  useEffect(() => {
    // console.log(GD);
    // console.log(endTarget, newTarget, newTmpTarget);
    // console.log(GDlog);
  }, [GDlog]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    console.log(loadState);
  }, [loadState]);

  return (
    <div>
      {/* make DB */}
      {/* <div className="flex justify-center items-center bg-purple-200">
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className="space-y-2 my-2">
            <div className="flex flex-col">
              <label htmlFor="videoID">Input Video ID</label>
              <input
                className={`${
                  Boolean(errors.videoID?.message)
                    ? "ring-2 ring-red-500"
                    : "border border-gray-700"
                }`}
                // className=
                id="videoID"
                type="text"
                {...register("videoID", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="maxResult">Number of search</label>
              <input
                className={`${
                  Boolean(errors.maxResults?.message)
                    ? "ring-2 ring-offset-2 ring-red-500"
                    : "border border-gray-700"
                }`}
                id="maxResult"
                type="number"
                {...register("maxResults", {
                  required: true,
                  valueAsNumber: true,
                  min: {
                    message: "The max Results should be larger than 1",
                    value: 1,
                  },
                  max: {
                    message: "The max Results should be smaller than 5",
                    value: 5,
                  },
                })}
              />
            </div>
            <div className="flex justify-center items-center space-x-3">
              <button
                className={`${
                  apiState
                    ? "bg-purple-500 px-4 py-2 rounded-lg shadow-lg text-white"
                    : "bg-red-500 px-4 py-2 rounded-lg shadow-lg text-white"
                }`}
                type="submit"
              >
                {apiState ? "Get related video" : "API exceeded"}
              </button>
            </div>
          </div>
        </form>
      </div> */}

      <div className="flex items-center justify-center bg-purple-200">
        <div>
          <ForceGraph
            graphData={GD}
            width={width * 1}
            height={height}
            // height={height - 175} when making DB add -175
            // nodeAutoColorBy="id"
            nodeRelSize={3}
            nodeThreeObject={(node: any) => {
              if (node.view != undefined) {
                var manager = new THREE.LoadingManager();
                var loader = new THREE.TextureLoader(manager);
                var texture = loader.load("/api/image_loader?id=" + node.view);
                texture.needsUpdate = true;
                const material = new THREE.SpriteMaterial({
                  map: texture,
                });
                const sprite = new THREE.Sprite(material);
                if (node.title == "START FROM HERE!") {
                  sprite.scale.set(68, 40, 4);
                } else {
                  sprite.scale.set(34, 20, 4);
                }
                return sprite;
              } else {
                return false;
              }
            }}
            linkDirectionalParticles={1}
            linkDirectionalParticleWidth={1}
            linkDirectionalParticleColor={() => "pink"}
            enableNodeDrag={false}
            linkWidth={1}
            nodeLabel={(node: any) => {
              if (node.title == undefined) {
                return node.id;
              } else {
                return node.title;
              }
            }}
          />
        </div>
      </div>

      <button
        className="fixed hover:bg-purple-500 border-0 aspect-square 
        border-transparent transition-colors cursor-pointer 
        bottom-[5%] right-[15px] shadow-xl bg-purple-700 rounded-full 
        w-20 flex items-center justify-center text-white"
        onClick={() => {
          if (loadState == 0) {
            var raw_data = raw_data1;
            var data_load: GraphData & any = raw_data1;
            setLoadState(1);
          } else if (loadState == 1) {
            var raw_data = raw_data2;
            var data_load: GraphData & any = raw_data2;
            setLoadState(2);
          } else {
            var raw_data = raw_data3;
            var data_load: GraphData & any = raw_data3;
            setLoadState(0);
          }

          // ?????? naming ??????
          data_load.nodes = raw_data.nodes.reduce((prev: any, now: any) => {
            if (!prev.some((obj: any) => obj.id === now.id)) prev.push(now);
            return prev;
          }, []);

          setGD(data_load);
        }}
      >
        {loadState == 0
          ? "Load Sample1"
          : loadState == 1
          ? "Load Sample2"
          : "Load Sample3"}
      </button>

      {/* make DB */}
      {/* <button
        className={`${
          apiState
            ? "fixed hover:bg-purple-500 border-0 aspect-square border-transparent transition-colors cursor-pointer top-[190px] right-[15px] shadow-xl bg-purple-700 rounded-full w-20 flex items-center justify-center text-white"
            : "fixed hover:bg-red-500 border-0 aspect-square border-transparent transition-colors cursor-pointer top-[190px] right-[15px] shadow-xl bg-red-700 rounded-full w-20 flex items-center justify-center text-white"
        }`}
        onClick={expandHandler}
      >
        Expand
      </button> */}

      <Link href="/">
        <a
          className="fixed top-[2%] left-[2%] w-10 font-medium text-purple-700
        hover:text-purple-500 flex items-center justify-center cursor-pointer"
          onClick={() => {
            router.back();
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

export default YoutubeMap;
