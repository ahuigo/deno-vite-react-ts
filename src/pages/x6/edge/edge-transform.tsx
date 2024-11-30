import { useRef, useEffect } from 'react';
import { Edge, Graph, NumberExt } from '@antv/x6';
import { clearGraph } from '../tools';
import { Transform } from "@antv/x6-plugin-transform";


const data = {
  nodes: [
    {
      id: 'node1', shape: 'rect', x: 40, y: 40, width: 100, height: 40, label: 'hello',
      attrs: { body: { stroke: '#8f8f8f', strokeWidth: 1, fill: '#fff', rx: 2, ry: 5, }, },
    },
    { id: 'node2', shape: 'rect', x: 160, y: 180, width: 100, height: 40, label: 'world', },
  ],
  edges: [
    { source: 'node1', target: 'node2', },
    {
      labels: ["label0"], // 等价于 label: "label0",
      text: "text label0",
      source: {
        x: 100, y: 100,
      },
      target: {
        x: 200, y: 200,
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
  graph.use(
    new Transform({
      resizing: true,
      rotating: true,
    })
  );
  graph.fromJSON(data); // 渲染元素
  // const edge = graph.addEdge({ });
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
