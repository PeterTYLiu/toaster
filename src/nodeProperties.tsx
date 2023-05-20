import {
  IconBox,
  IconInnerShadowTopRight,
  IconPyramid,
  IconCylinder,
  IconFolder,
} from "@tabler/icons-react";
import type { Node } from "./App";
import type { ReactNode } from "react";

const iconSize = 20;

export const nodeTypesMap: Record<
  Node["type"],
  { dimensions: Partial<Record<keyof Node, boolean>>; icon: ReactNode }
> = {
  group: { dimensions: {}, icon: <IconFolder size={iconSize} /> },
  cuboid: {
    dimensions: { width: true, height: true, depth: true },
    icon: <IconBox size={iconSize} />,
  },
  pyramid: {
    dimensions: { radius: true, baseSides: true, height: true },
    icon: <IconPyramid size={iconSize} />,
  },
  prism: {
    dimensions: {
      radius: true,
      baseSides: true,
      height: true,
      holeRadius: true,
    },
    icon: <IconCylinder size={iconSize} />,
  },
  sphere: {
    dimensions: { radius: true },
    icon: <IconInnerShadowTopRight size={iconSize} />,
  },
};
