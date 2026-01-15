import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { SplitContent, SplitItem, Center } from './components/split-content';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) => <ImageZoom {...(props as any)} />,
    strong: (props) => (
      <strong className="font-extrabold" {...props} />
    ),
    SplitContent,
    SplitItem,
    Center,
    ...components,
  };
}
