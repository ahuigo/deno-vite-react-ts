import { useRef, useEffect } from 'react';
import { Edge, Graph, NumberExt } from '@antv/x6';
import { clearGraph } from '../tools';
import { Selection } from '@antv/x6-plugin-selection';
import './custom/custom-node';
const data = {
  nodes: [
    { id: 'node1', shape: 'task-node', x: 40, y: 40, width: 100, height: 40, label: 'hello', },
    { id: 'node2', shape: 'task-node', x: 160, y: 180, width: 100, height: 40, label: 'world', },
  ],
  edges: [
    {
      source: "node1",
      target: { cell: 'node2', },
      labels: ["label0"],
    }
  ],
};

export const confSelect = {
  enabled: true,
  showNodeSelectionBox: true,
  showEdgeSelectionBox: false,
  multiple: false,
  rubberband: true,
  movable: true,
  strict: false, //选框是否需要完全包围节点时才选中节点
  pointerEvents: 'none' as const,//none避免上方盖一层元素，导致节点的事件无法响应
};

function renderFlow(graph: Graph) {
  graph.use(
    new Selection({
      ...confSelect,
    }),
  );
  graph.fromJSON(data); // 渲染元素
  graph.on('node:selected', ({ node }) => {

    console.log('imcomming edges', graph.getIncomingEdges(node));
    console.log('outgoing edges', graph.getOutgoingEdges(node));
    console.log('connected edges', graph.getConnectedEdges(node, { incoming: true, outgoing: true }));
    console.log('connected edges', graph.getConnectedEdges(node, { deep: true }));// 包含连接到子孙节点的边
    // console.log(args);
  });
}

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {

      const graph = new Graph({
        container: containerRef.current,
        grid: true,
        // autoResize: true,
        panning: true,
        // mousewheel: true,
      });
      renderFlow(graph);
      return () => clearGraph(containerRef.current, graph);
    }
  }, [containerRef]);
  return <div>
    <div ref={containerRef} className="flex h-screen w-[calc(90vw)] border-gray-400 border"></div>
  </div>;
}
