import type { Node } from "./App";

const hairColor = "#4400FF";

export const defaultModel: Node[] = [
  {
    id: "257498b0-cb4d-4cb7-896c-e55b1c19c643",
    name: "head",
    type: "sphere",
    children: [
      {
        id: "946da4b3-c089-4890-bb9b-e767e93bacf4",
        name: "ears",
        type: "prism",
        children: [],
        opacity: 1,
        translateX: 0,
        translateY: -3,
        translateZ: -8,
        scaleX: 0.8,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 105,
        rotateY: 90,
        rotateZ: 0,
        width: 393,
        height: 395,
        depth: 108,
        radius: 50,
        baseSides: 12,
        color: undefined,
        borderColor: undefined,
      },
      {
        id: "9c500404-f97a-4905-b4d9-1c22d5694293",
        name: "left eye",
        type: "sphere",
        children: [
          {
            id: "2699f558-9b98-4b9d-a163-9ef5cee4c584",
            name: "pupil",
            type: "sphere",
            children: [],
            color: "#ad5400",
            opacity: 1,
            translateX: 10,
            translateY: 30,
            translateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            width: 200,
            height: 200,
            depth: 200,
            radius: 15,
            baseSides: 0,
            borderColor: undefined,
          },
          {
            id: "ad2425a4-90b1-48f3-9843-05dd9ef3ae7a",
            name: "eyebrow",
            type: "cuboid",
            children: [],
            color: hairColor,
            opacity: 1,
            translateX: 0,
            translateY: -40,
            translateZ: 59,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: -11,
            rotateZ: 0,
            width: 94,
            height: 15,
            depth: 17,
            radius: 200,
            baseSides: 0,
            borderColor: undefined,
          },
        ],
        color: "#ffffff",
        opacity: 1,
        translateX: -90,
        translateY: 152,
        translateZ: 10,
        scaleX: 1,
        scaleY: 0.25,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 32,
        width: 200,
        height: 200,
        depth: 200,
        radius: 40,
        baseSides: 0,
        borderColor: undefined,
      },
      {
        id: "867acc6b-54bc-4693-af49-259887e17d40",
        name: "right eye",
        type: "sphere",
        children: [
          {
            id: "20fe4b22-6fc6-417f-878c-8b9963d4b6bf",
            name: "pupil",
            type: "sphere",
            children: [],
            color: "#ad5400",
            borderColor: undefined,
            opacity: 1,
            translateX: -10,
            baseSides: 0,
            translateY: 30,
            translateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            width: 200,
            height: 200,
            depth: 200,
            radius: 15,
          },
          {
            id: "8e849e44-0394-4429-9816-adf07a3ee479",
            name: "eyebrow",
            type: "cuboid",
            children: [],
            color: hairColor,
            opacity: 1,
            translateX: 0,
            translateY: -40,
            translateZ: 59,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 4,
            rotateZ: 0,
            width: 94,
            height: 15,
            depth: 17,
            baseSides: 0,
            borderColor: undefined,
            radius: 200,
          },
        ],
        color: "#ffffff",
        opacity: 1,
        translateX: 90,
        translateY: 152,
        translateZ: 10,
        scaleX: 1,
        scaleY: 0.25,
        baseSides: 0,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: -32,
        width: 200,
        height: 200,
        depth: 200,
        radius: 40,
        borderColor: undefined,
      },
      {
        id: "ef498a28-3d81-4fd6-85eb-f023186de5be",
        name: "nose",
        type: "sphere",
        children: [],
        opacity: 1,
        translateX: 0,
        translateY: 143,
        translateZ: -28,
        scaleX: 1,
        borderColor: undefined,
        scaleY: 2.78,
        scaleZ: 1.3,
        baseSides: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 200,
        depth: 200,
        radius: 40,
        color: "#e52424",
      },
      {
        id: "c547e1b2-076f-4b1e-b5ba-5affec08a904",
        name: "hair",
        type: "sphere",
        children: [],
        color: hairColor,
        opacity: 1,
        translateX: 0,
        borderColor: undefined,
        translateY: -44,
        translateZ: 41,
        scaleX: 1,
        scaleY: 1.12,
        scaleZ: 0.93,
        rotateX: 0,
        baseSides: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 200,
        height: 200,
        depth: 200,
        radius: 200,
      },
      {
        id: "546c2cc9-1232-4bdc-850c-f53d464d1fae",
        name: "mouth",
        type: "cuboid",
        children: [
          {
            id: "9b61265d-77f8-4b47-9a72-6f87fc6e35e8",
            name: "teeth",
            type: "cuboid",
            children: [],
            color: "#ffffff",
            opacity: 1,
            translateX: 0,
            translateY: 7,
            translateZ: 8,
            baseSides: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            borderColor: undefined,
            rotateZ: 0,
            width: 133,
            height: 33,
            depth: 33,
            radius: 200,
          },
        ],
        color: "#bd0000",
        opacity: 1,
        translateX: 0,
        translateY: 119,
        translateZ: -107,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: -53,
        baseSides: 0,
        rotateY: 0,
        rotateZ: 0,
        width: 150,
        borderColor: undefined,
        height: 39,
        depth: 53,
        radius: 200,
      },
      {
        id: "4358367a-00f5-4f21-8ad0-9b7a6dbd92d7",
        name: "hat",
        type: "pyramid",
        children: [
          {
            id: "8cccfd28-974a-4345-aeb2-1f9dce6a562b",
            name: "poof",
            type: "sphere",
            children: [],
            color: "#e5cc2a",
            opacity: 1,
            translateX: 0,
            translateY: 0,
            translateZ: 93,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            rotateX: 0,
            rotateY: 0,
            borderColor: undefined,
            rotateZ: 0,
            width: 200,
            height: 200,
            depth: 200,
            radius: 30,
            baseSides: 4,
          },
        ],
        color: "#19ae9d",
        opacity: 1,
        translateX: 53,
        translateY: -48,
        translateZ: 278,
        borderColor: undefined,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 3,
        rotateY: 10,
        rotateZ: 0,
        width: 200,
        height: 200,
        depth: 200,
        radius: 91,
        baseSides: 12,
      },
    ],
    color: "#ff6bf3",
    borderColor: "#000000",
    opacity: 1,
    translateX: 500,
    translateY: 500,
    translateZ: 251,
    scaleX: 1,
    baseSides: 0,
    scaleY: 1,
    scaleZ: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    width: 200,
    height: 200,
    depth: 200,
    radius: 200,
  },
];
