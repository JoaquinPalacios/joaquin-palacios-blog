// ./src/slices/Hero/index.tsx

import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicText } from "@prismicio/react";
import { RichText } from "@/components/RichText";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section className="w-full max-w-4xl flex gap-6" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <PrismicNextImage field={slice.primary.image} sizes="100vw" className="w-full rounded-3xl lg:w-1/3" />
      <div className="flex flex-col gap-2 justify-center">
        <h1 className="uppercase">
          <PrismicText field={slice.primary.title} />
        </h1>
        <RichText field={slice.primary.description} />
      </div>
    </section>
  );
};

export default Hero;
