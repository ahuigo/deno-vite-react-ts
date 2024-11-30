export const data = {
  "nodes": [{
    "id": "node-0",
    "shape": "task-node",
    "x": 0, "y": 100,
    "ports": [{ "id": "node-0-out", "group": "out" }],
    "data": { "name": "数据输入_1", "type": "INPUT", "checkStatus": "sucess" }
  }, { "id": "node-1", "shape": "task-node", "x": 250, "y": 100, "ports": [{ "id": "node-1-in", "group": "in" }, { "id": "node-1-out", "group": "out" }], "data": { "name": "数据筛选_1", "type": "FILTER" } }, { "id": "node-2", "shape": "task-node", "x": 250, "y": 200, "ports": [{ "id": "node-2-out", "group": "out" }], "data": { "name": "数据输入_2", "type": "INPUT" } }, { "id": "node-3", "shape": "task-node", "x": 500, "y": 100, "ports": [{ "id": "node-3-in", "group": "in" }, { "id": "node-3-out", "group": "out" }], "data": { "name": "数据连接_1", "type": "JOIN" } }, { "id": "node-4", "shape": "task-node", "x": 750, "y": 100, "ports": [{ "id": "node-4-in", "group": "in" }], "data": { "name": "数据输出_1", "type": "OUTPUT" } }], "edges": [{ "id": "edge-0", "source": { "cell": "node-0", "port": "node-0-out" }, "target": { "cell": "node-1", "port": "node-1-in" }, "shape": "data-processing-curve", "zIndex": -1, "data": { "source": "node-0", "target": "node-1" } }, { "id": "edge-1", "source": { "cell": "node-2", "port": "node-2-out" }, "target": { "cell": "node-3", "port": "node-3-in" }, "shape": "data-processing-curve", "zIndex": -1, "data": { "source": "node-2", "target": "node-3" } }, { "id": "edge-2", "source": { "cell": "node-1", "port": "node-1-out" }, "target": { "cell": "node-3", "port": "node-3-in" }, "shape": "data-processing-curve", "zIndex": -1, "data": { "source": "node-1", "target": "node-3" } }, { "id": "edge-3", "source": { "cell": "node-3", "port": "node-3-out" }, "target": { "cell": "node-4", "port": "node-4-in" }, "shape": "data-processing-curve", "zIndex": -1, "data": { "source": "node-3", "target": "node-4" } }]
};

// 节点类型
export enum NodeType {
  INPUT = 'INPUT', // 数据输入
  FILTER = 'FILTER', // 数据过滤
  JOIN = 'JOIN', // 数据连接
  UNION = 'UNION', // 数据合并
  AGG = 'AGG', // 数据聚合
  OUTPUT = 'OUTPUT', // 数据输出
}

// 元素校验状态
export enum CellStatus {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
}

// 节点位置信息
export interface Position {
  x: number;
  y: number;
}

// 加工类型列表
export const PROCESSING_TYPE_LIST = [
  { type: 'FILTER', name: '数据筛选', }, { type: 'JOIN', name: '数据连接', }, { type: 'UNION', name: '数据合并', }, { type: 'AGG', name: '数据聚合', },
  { type: 'OUTPUT', name: '数据输出', },
] as Array<{
  type: NodeType,
  name: string,
}>;

// 不同节点类型的icon
export const NODE_TYPE_LOGO = {
  INPUT:
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*RXnuTpQ22xkAAAAAAAAAAAAADtOHAQ/original', // 数据输入
  FILTER:
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*ZJ6qToit8P4AAAAAAAAAAAAADtOHAQ/original', // 数据筛选
  JOIN: 'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*EHqyQoDeBvIAAAAAAAAAAAAADtOHAQ/original', // 数据连接
  UNION:
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*k4eyRaXv8gsAAAAAAAAAAAAADtOHAQ/original', // 数据合并
  AGG: 'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*TKG8R6nfYiAAAAAAAAAAAAAADtOHAQ/original', // 数据聚合
  OUTPUT:
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*zUgORbGg1HIAAAAAAAAAAAAADtOHAQ/original', // 数据输出
} as Record<NodeType, string>;