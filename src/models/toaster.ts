import type { Node } from "../App";

export const toaster: Node[] = [
  {
    id: "ce4965a3-fef4-4532-9e08-75e33cfb4ebb",
    name: "Toaster",
    type: "group",
    color: "#3ca0b4",
    opacity: 1,
    translateX: 392,
    translateY: 500,
    translateZ: 138,
    scaleX: 0.7,
    scaleY: 0.7,
    scaleZ: 0.71,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 180,
    width: 200,
    height: 200,
    depth: 200,
    radius: 150,
    holeRadius: 0,
    baseSides: 3,
    collapsed: false,
    children: [
      {
        id: "23bf1c32-12c4-40b7-80ba-78db2639a81c",
        name: "innards",
        type: "group",
        opacity: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        scaleX: 1,
        scaleY: 4.37,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 200,
        depth: 200,
        radius: 200,
        holeRadius: 0,
        baseSides: 3,
        collapsed: true,
        children: [
          {
            id: "8a992ead-0c29-4b78-92fb-ec099582de0c",
            name: "toaster hole",
            type: "prism",
            color: "#cccccc",
            opacity: 1,
            translateX: -70,
            translateY: 0,
            translateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 45,
            width: 200,
            height: 288,
            depth: 200,
            radius: 100,
            holeRadius: 55,
            baseSides: 4,
            collapsed: true,
            children: [
              {
                id: "2f59d01f-5e9f-4281-9ce7-4f6972ab0bef",
                name: "darkness",
                type: "prism",
                color: "#404040",
                opacity: 1,
                translateX: 0,
                translateY: 0,
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                width: 200,
                height: 280,
                depth: 200,
                radius: 65,
                holeRadius: 55,
                baseSides: 4,
                children: [],
              },
            ],
          },
          {
            id: "2297bdec-fa2c-4bfb-a7a3-384ce7e0cf39",
            name: "toaster hole instance",
            type: "prism",
            instanceOf: "8a992ead-0c29-4b78-92fb-ec099582de0c",
            opacity: 1,
            translateX: 70,
            translateY: 0,
            translateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 45,
            width: 200,
            height: 288,
            depth: 200,
            radius: 200,
            holeRadius: 137,
            baseSides: 4,
            children: [],
          },
          {
            id: "d33f3cf3-e7af-403e-9797-7b643c815125",
            name: "bottom",
            type: "cuboid",
            color: "#000000",
            opacity: 1,
            translateX: 0,
            translateY: 0,
            translateZ: -106,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            width: 277,
            height: 127,
            depth: 36,
            radius: 200,
            holeRadius: 0,
            baseSides: 3,
            children: [],
          },
        ],
      },
      {
        id: "9b7f15d8-c1b0-4986-9fc5-74b9cd1efdec",
        name: "shell",
        type: "group",
        opacity: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        scaleX: 1.28,
        scaleY: 2.15,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 200,
        depth: 200,
        radius: 200,
        holeRadius: 0,
        baseSides: 3,
        collapsed: true,
        children: [
          {
            id: "d262d8c0-0b16-4f9f-8944-35eae3df5fce",
            name: "shell",
            type: "prism",
            opacity: 1,
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 45,
            width: 200,
            height: 320,
            depth: 200,
            radius: 205,
            holeRadius: 160,
            baseSides: 4,
            children: [],
          },
          {
            id: "e1cc89fb-51a8-414d-8575-9a9e945f37a1",
            name: "New cuboid",
            type: "cuboid",
            opacity: 1,
            translateX: 0,
            translateY: 0,
            translateZ: -162,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            width: 290,
            height: 291,
            depth: 36,
            radius: 200,
            holeRadius: 0,
            baseSides: 3,
            children: [],
          },
        ],
      },
      {
        id: "a0bc46c4-8b6c-4cd4-965f-e6401a5a182a",
        name: "front",
        type: "prism",
        opacity: 1,
        translateX: 0,
        translateY: -312,
        translateZ: -11,
        scaleX: 1,
        scaleY: 0.37,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 340,
        depth: 200,
        radius: 186,
        holeRadius: 0,
        baseSides: 14,
        children: [],
      },
      {
        id: "7c438944-f585-4c6e-b34b-b92558926770",
        name: "back",
        type: "prism",
        opacity: 1,
        translateX: 0,
        translateY: 312,
        translateZ: -11,
        scaleX: 1,
        scaleY: 0.37,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 340,
        depth: 200,
        radius: 186,
        holeRadius: 0,
        baseSides: 14,
        children: [],
      },
      {
        id: "cc581775-51e0-4f25-961f-be520ca72a23",
        name: "foot",
        type: "prism",
        color: "#00404d",
        opacity: 1,
        translateX: 130,
        translateY: -270,
        translateZ: -186,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 18,
        depth: 200,
        radius: 32,
        holeRadius: 0,
        baseSides: 12,
        children: [],
      },
      {
        id: "bfc89c0c-e2b4-4d23-9135-e9b65577ba77",
        name: "foot instance",
        type: "prism",
        instanceOf: "cc581775-51e0-4f25-961f-be520ca72a23",
        color: "#00404d",
        opacity: 1,
        translateX: -130,
        translateY: -270,
        translateZ: -186,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 18,
        depth: 200,
        radius: 32,
        holeRadius: 0,
        baseSides: 12,
        children: [],
      },
      {
        id: "1bf80c2a-4a44-4564-a142-c443b89a6dc1",
        name: "foot instance",
        type: "prism",
        instanceOf: "cc581775-51e0-4f25-961f-be520ca72a23",
        color: "#00404d",
        opacity: 1,
        translateX: -130,
        translateY: 270,
        translateZ: -186,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 18,
        depth: 200,
        radius: 32,
        holeRadius: 0,
        baseSides: 12,
        children: [],
      },
      {
        id: "d2e4589c-6673-4c17-a0fe-812fc7e24c0a",
        name: "foot instance",
        type: "prism",
        instanceOf: "cc581775-51e0-4f25-961f-be520ca72a23",
        color: "#00404d",
        opacity: 1,
        translateX: 130,
        translateY: 270,
        translateZ: -186,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 18,
        depth: 200,
        radius: 32,
        holeRadius: 0,
        baseSides: 12,
        children: [],
      },
      {
        id: "75f66bbd-20be-438e-babc-1bc633a52754",
        name: "lever hole",
        type: "cuboid",
        color: "#073f4b",
        opacity: 1,
        translateX: 0,
        translateY: -346,
        translateZ: 22,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 50,
        height: 70,
        depth: 216,
        radius: 200,
        holeRadius: 0,
        baseSides: 3,
        children: [],
      },
      {
        id: "fb337c52-23bb-4741-9cef-89ed1abac9c0",
        name: "lever",
        type: "group",
        color: "#cccccc",
        opacity: 1,
        translateX: 0,
        translateY: -413,
        translateZ: 103,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 200,
        depth: 200,
        radius: 200,
        holeRadius: 0,
        baseSides: 3,
        collapsed: true,
        children: [
          {
            id: "4d5c8b52-96b4-4aab-afd4-2e7dcf418230",
            name: "New cuboid",
            type: "cuboid",
            opacity: 1,
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            width: 156,
            height: 65,
            depth: 30,
            radius: 200,
            holeRadius: 0,
            baseSides: 3,
            children: [],
          },
          {
            id: "702ecdfd-e66a-43aa-9591-904267028dd8",
            name: "New prism",
            type: "prism",
            opacity: 1,
            translateX: 0,
            translateY: -32,
            translateZ: 0,
            scaleX: 1,
            scaleY: 0.5,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            width: 200,
            height: 30,
            depth: 200,
            radius: 78,
            holeRadius: 0,
            baseSides: 12,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "01c5fe55-01e1-40fd-a660-aaeb5bfeff02",
    name: "Toast",
    type: "group",
    opacity: 1,
    translateX: 696,
    translateY: 463,
    translateZ: 18,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 64,
    width: 200,
    height: 200,
    depth: 200,
    radius: 150,
    holeRadius: 0,
    baseSides: 3,
    collapsed: true,
    children: [
      {
        id: "d0f94925-1223-4469-b197-1b40b3eb07e9",
        name: "crust",
        type: "cuboid",
        color: "#8a4300",
        opacity: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 200,
        depth: 35,
        radius: 200,
        holeRadius: 0,
        baseSides: 3,
        collapsed: false,
        children: [
          {
            id: "86b77121-557a-4ee8-ad12-7d1b5ff1c4a0",
            name: "New prism",
            type: "prism",
            opacity: 1,
            translateX: 100,
            translateY: 0,
            translateZ: 0,
            scaleX: 0.48,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            width: 200,
            height: 35,
            depth: 200,
            radius: 118,
            holeRadius: 0,
            baseSides: 10,
            children: [],
          },
        ],
      },
      {
        id: "4e948532-9d3a-4ed2-9b92-39fcf1a4679f",
        name: "non-toast",
        type: "cuboid",
        color: "#c28042",
        opacity: 1,
        translateX: -3,
        translateY: 0,
        translateZ: 0,
        scaleX: 0.9,
        scaleY: 0.9,
        scaleZ: 1.02,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 200,
        depth: 35,
        radius: 200,
        holeRadius: 0,
        baseSides: 3,
        collapsed: false,
        children: [
          {
            id: "401b2ba1-1412-4bc1-a7a0-6d973fa2aafe",
            name: "New prism",
            type: "prism",
            opacity: 1,
            translateX: 114,
            translateY: 0,
            translateZ: 0,
            scaleX: 0.43,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            width: 200,
            height: 35,
            depth: 200,
            radius: 118,
            holeRadius: 0,
            baseSides: 10,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "c3665038-0880-4aae-b47e-acb7ab581394",
    name: "Toast instance",
    type: "group",
    instanceOf: "01c5fe55-01e1-40fd-a660-aaeb5bfeff02",
    opacity: 1,
    translateX: 341,
    translateY: 494,
    translateZ: 244,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    rotateX: 6,
    rotateY: -101,
    rotateZ: 0,
    width: 200,
    height: 200,
    depth: 200,
    radius: 150,
    holeRadius: 0,
    baseSides: 3,
    collapsed: true,
    children: [],
  },
  {
    id: "3d06b3ed-d314-4577-abd7-ab9d986f0ae9",
    name: "Butter",
    type: "group",
    color: "#ffe561",
    opacity: 1,
    translateX: 680,
    translateY: 479,
    translateZ: 42,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    width: 200,
    height: 200,
    depth: 200,
    radius: 150,
    holeRadius: 0,
    baseSides: 3,
    collapsed: false,
    children: [
      {
        id: "11a2b786-00fd-4e41-9008-c758402c523a",
        name: "melt",
        type: "pyramid",
        color: "#eaba53",
        opacity: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        scaleX: 1,
        scaleY: 1.86,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 11,
        depth: 200,
        radius: 40,
        holeRadius: 0,
        baseSides: 11,
        children: [],
      },
      {
        id: "170f4db7-3c2a-4ba3-9e62-da5ae019c73b",
        name: "New cuboid",
        type: "cuboid",
        opacity: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 38,
        height: 63,
        depth: 36,
        radius: 200,
        holeRadius: 0,
        baseSides: 3,
        children: [],
      },
    ],
  },
];
