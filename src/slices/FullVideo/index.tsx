import VideoPlayer from "@/components/VideoPlayer";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FullVideo`.
 */
export type FullVideoProps = SliceComponentProps<Content.FullVideoSlice>;

/**
 * Component for "FullVideo" Slices.
 */
const FullVideo = ({ slice }: FullVideoProps): JSX.Element => {
  return (
    <section className="w-full max-w-7xl h-[720px] rounded-xl" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="flex flex-col gap-2 z-10 relative h-full rounded-xl">
        <VideoPlayer slice={slice} />
      </div>
    </section>
  );
};

export default FullVideo;
