"use client";

import { FullVideoProps } from "@/slices/FullVideo";
import ReactPlayer from "react-player";
import { Content } from "@prismicio/client";

type VideoPlayerProps = {
  slice: Content.FullVideoSlice;
};

const VideoPlayer = ({ slice }: VideoPlayerProps) => {
  return (
    <div className="aspect-w-16 aspect-h-9 h-full rounded-xl">
      <ReactPlayer url={slice.primary.background_video.embed_url} playing controls width="100%" height="100%" className="rounded-xl" />
    </div>
  );
};

export default VideoPlayer;
