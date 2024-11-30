import { useRef, useEffect } from 'react';
import { Edge, Graph, NumberExt } from '@antv/x6';
import { clearGraph } from '../tools';

// refer: https://x6.antv.antgroup.com/tutorial/basic/edge#%E5%AE%9A%E5%88%B6%E8%BE%B9
Graph.registerEdge('shadow-edge', {
  inherit: 'edge',
  markup: [
    {
      tagName: 'path',
      selector: 'shadow',
      attrs: {
        fill: 'none',
      },
    },
    {
      tagName: 'path',
      selector: 'line',
      attrs: {
        fill: 'none',
        cursor: 'pointer',
      },
    },
  ],
  attrs: {
    line: {
      connection: true,
      stroke: '#dddddd',
      strokeWidth: 20,
      //strokeLinejoin: 'round',
      targetMarker: {
        name: 'path',
        stroke: 'none',
        d: 'M 0 -10 -10 0 0 10 z',
        offsetX: -5,
      },
      sourceMarker: {
        name: 'path',
        stroke: 'none',
        d: 'M -10 -10 0 0 -10 10 0 10 0 -10 z',
        offsetX: -5,
      },
    },
    shadow: {
      connection: true,
      refX: 3,
      refY: 6,
      stroke: '#000000',
      strokeOpacity: 0.2,
      strokeWidth: 20,
      strokeLinejoin: 'round',
      targetMarker: {
        name: 'path',
        d: 'M 0 -10 -10 0 0 10 z',
        stroke: 'none',
        offsetX: -5,
      },
      sourceMarker: {
        name: 'path',
        stroke: 'none',
        d: 'M -10 -10 0 0 -10 10 0 10 0 -10 z',
        offsetX: -5,
      },
    },
  },
}, true);

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
        body: { stroke: '#8f8f8f', strokeWidth: 1, fill: '#fff', rx: 6, ry: 6, },
      },
    },
  ],
};

// https://x6.antv.antgroup.com/api/model/labels#%E9%BB%98%E8%AE%A4%E6%A0%87%E7%AD%BE
function modifyLabel(edge: Edge) {
  console.log('labels:', edge.prop('labels'));
  edge.setLabels(["edge label1"]);
  edge.appendLabel("edge label2");
}

function renderFlow(graph: Graph) {
  graph.fromJSON(data); // 渲染元素
  const edge = graph.addEdge({
    shape: "shadow-edge", //default shape: "edge",
    labels: ["label0"], // 等价于 label: "label0",
    text: "text label0",
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
    },
  });
  const i = 3;
  graph.on('edge:click', ({ edge }) => {
    modifyLabel(edge);
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
