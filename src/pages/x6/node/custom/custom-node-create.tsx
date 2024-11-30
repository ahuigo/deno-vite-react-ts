import { Graph, Node, Path, Edge, Platform, StringExt } from '@antv/x6';
import { NodeType, Position, PROCESSING_TYPE_LIST } from './custom-types';
import { getPortsByType } from './custom-port';
/**
 * 创建节点并添加到画布
 * @param type 节点类型
 * @param graph
 * @param position 节点位置
 * @returns
 */
export const createNode = (
  type: NodeType,
  graph: Graph,
  position?: Position,
) => {
  if (!graph) {
    return {} as Node;
  }
  let newNode: Node = {} as Node;
  const sameTypeNodes = graph
    .getNodes()
    .filter((item) => item.getData()?.type === type);
  const typeName = PROCESSING_TYPE_LIST?.find(
    (item) => item.type === type,
  )?.name;
  const id = StringExt.uuid();
  const node = {
    id,
    shape: 'task-node',
    x: position?.x,
    y: position?.y,
    ports: getPortsByType(type, id),
    data: {
      name: `${typeName}_${sameTypeNodes.length + 1}`,
      type,
    },
  };
  newNode = graph.addNode(node);
  return newNode;
};
