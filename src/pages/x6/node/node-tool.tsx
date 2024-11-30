import { useRef, useEffect } from 'react';
import { Graph, NumberExt } from '@antv/x6';
import { clearGraph } from '../tools';

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'hello',
      tools: [
        'button-remove',// tool remove
        {
          name: 'boundary',// tool boundary
          args: {
            attrs: { fill: '#7c68fc', stroke: '#333', 'stroke-width': 1, 'fill-opacity': 0.2, },
          },
        },
      ],
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 2,
          ry: 5,
        },
      },
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 360,
      y: 180,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: { stroke: '#8f8f8f', strokeWidth: 1, fill: '#fff', rx: 6, ry: 6, },
      },
    },
  ],
};

function renderFlow(graph: Graph) {
  graph.fromJSON(data); // 渲染元素
  graph.addEdge({
    shape: "edge",
    source: "node1",
    target: {
      cell: 'node2',
      //锚点 anchor 和连接点 connectionPoint
      anchor: {
        name: 'top',
        args: {
          dx: -40,
        },
      },
      // connectionPoint: 'anchor',
    },
    tools: ['vertices', 'segments'],// tool for edge
    // 拆线点
    vertices: [
      { x: 117, y: 150 },
      { x: 289, y: 90 },
      // { x: 150, y: 150 },
    ],
    router: "orth", // 正交路由
    connector: "rounded",// 连接处平滑
    attrs: {
      // line 是选择器名称，选中的边的 path 元素
      line: {
        sourceMarker: 'block',
        targetMarker: 'block',
        stroke: '#f00',
        strokeWidth: 2,
      },
      label: {
        text: "edge1",
      },
    },
    label: "label4",
  });
  console.log('tojson', graph.toJSON());
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
