import {
  IconCubePlus,
  IconCube,
  IconSpherePlus,
  IconSphere,
  IconPyramidPlus,
  IconPyramid,
  IconPrismPlus,
  IconPrism,
  IconFolderPlus,
  IconFolder,
} from "@tabler/icons-react";
import type { Node } from "./App";
import type { ReactNode } from "react";

const iconSize = 20;
const smallIconSize = 18;

export const nodeTypesMap: Record<
  Node["type"],
  {
    dimensions: Partial<Record<keyof Node, boolean>>;
    addIcon: ReactNode;
    icon: ReactNode;
  }
> = {
  group: {
    dimensions: {},
    addIcon: <IconFolderPlus size={iconSize} />,
    icon: <IconFolder size={smallIconSize} />,
  },
  cuboid: {
    dimensions: { width: true, height: true, depth: true },
    addIcon: <IconCubePlus size={iconSize} />,
    icon: <IconCube size={smallIconSize} />,
  },
  pyramid: {
    dimensions: { radius: true, baseSides: true, height: true },
    addIcon: <IconPyramidPlus size={iconSize} />,
    icon: <IconPyramid size={smallIconSize} />,
  },
  prism: {
    dimensions: {
      radius: true,
      baseSides: true,
      height: true,
      holeRadius: true,
    },
    addIcon: <IconPrismPlus size={iconSize} />,
    icon: <IconPrism size={smallIconSize} />,
  },
  sphere: {
    dimensions: { radius: true },
    addIcon: <IconSpherePlus size={iconSize} />,
    icon: <IconSphere size={smallIconSize} />,
  },
};
