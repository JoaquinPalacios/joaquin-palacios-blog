import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Quote from "@/components/Quote";

/**
 * Props for `Blockquote`.
 */
export type BlockquoteProps = SliceComponentProps<Content.BlockquoteSlice>;

/**
 * Component for "Blockquote" Slices.
 */
const Blockquote = ({ slice }: BlockquoteProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="m-auto">
      <Quote slice={slice} />
    </section>
  );
};

export default Blockquote;
