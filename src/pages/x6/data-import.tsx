import { useRef, useEffect } from 'react';
import { Graph, NumberExt } from '@antv/x6';
import { clearGraph } from './tools';
import { Scroller } from "@antv/x6-plugin-scroller";


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
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
};

function renderFlow(graph: Graph) {
  graph.fromJSON(data); // 渲染元素
  graph.centerContent(); // 居中显示
  // graph.zoomToFit({ maxScale: 20 });// 最大放大倍数20
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
        // embedding: true,
        // panning: true,
        // mousewheel: true,
      });
      graph.use(new Scroller({ enabled: true, }));
      console.log('init graph');
      renderFlow(graph);
      return () => clearGraph(containerRef.current, graph);
    }
  }, [containerRef]);
  return <div ref={containerRef} className="flex h-screen w-[calc(90vw)] border-gray-400 border"></div>;
}
