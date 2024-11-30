import { Graph } from '@antv/x6';


// 边状态列表
const edgeStatusList = [
  {
    id: 'edge-0',
    status: 'success',
  },
  {
    id: 'edge-1',
    status: 'success',
  },
  {
    id: 'edge-2',
    status: 'success',
  },
  {
    id: 'edge-3',
    status: 'success',
  },
];


// 开启边的运行动画
export const excuteAnimate = (graph: Graph) => {
  graph.getEdges().forEach((edge) => {
    edge.attr({
      line: {
        stroke: '#3471F9',
      },
    });
    edge.attr('line/strokeDasharray', 5);
    edge.attr('line/style/animation', 'running-line 30s infinite linear');
  });
};

// 关闭边的动画
export const stopAnimate = (graph: Graph) => {
  graph.getEdges().forEach((edge) => {
    edge.attr('line/strokeDasharray', 0);
    edge.attr('line/style/animation', '');
  });
  edgeStatusList.forEach((item) => {
    const { id, status } = item;
    const edge = graph.getCellById(id);
    if (status === 'success') {
      edge.attr('line/stroke', '#52c41a');
    }
    if (status === 'error') {
      edge.attr('line/stroke', '#ff4d4f');
    }
  });
  // 默认选中一个节点
  graph.select('node-2');
};
