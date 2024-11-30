import {
  NodeType, Position, PROCESSING_TYPE_LIST,
} from './custom-types';

// 根据节点的类型获取ports
export const getPortsByType = (type: NodeType, nodeId: string) => {
  let ports = [];
  switch (type) {
    case NodeType.INPUT:
      ports = [
        {
          id: `${nodeId}-out`,
          group: 'out',
        },
      ];
      break;
    case NodeType.OUTPUT:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in',
        },
      ];
      break;
    default:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in',
        },
        {
          id: `${nodeId}-out`,
          group: 'out',
        },
      ];
      break;
  }
  return ports;
};