import { Graph, Node, Path, Edge, Platform, StringExt } from '@antv/x6';

export const connecting = {
  snap: true,
  allowBlank: false,
  allowLoop: false,
  highlight: true,
  sourceAnchor: {
    name: 'left',
    args: {
      dx: Platform.IS_SAFARI ? 4 : 8,
    },
  },
  targetAnchor: {
    name: 'right',
    args: {
      dx: Platform.IS_SAFARI ? 4 : -8,
    },
  },
};