import { Content } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";

type QuoteProps = {
  slice: Content.BlockquoteSlice;
};

const Quote = ({ slice }: QuoteProps) => {
  return (
    <article className="w-full max-w-xl justify-center flex gap-6" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <blockquote className="italic text-xl">
        <PrismicText field={slice.primary.blockquote} />
      </blockquote>
    </article>
  );
};

export default Quote;
