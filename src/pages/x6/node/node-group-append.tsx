import { useRef, useEffect } from 'react';
import { Graph, Node, Color } from '@antv/x6';

import { clearGraph } from '../tools';

Graph.registerNode(
  'custom-group-node',
  {
    inherit: 'rect',
    width: 100,
    height: 40,
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
  true,
);

function renderFlow(graph: Graph) {
  const source = graph.addNode({
    shape: 'custom-group-node',
    x: 60,
    y: 100,
    label: 'Child\n(inner)',
    zIndex: 2,
  });

  const target = graph.addNode({
    shape: 'custom-group-node',
    x: 420,
    y: 80,
    label: 'Child\n(outer)',
    zIndex: 2,
  });

  const parent = graph.addNode({
    shape: 'custom-group-node',
    x: 40,
    y: 40,
    width: 360,
    height: 160,
    zIndex: 1,
    label: 'Parent\n(try to move me)',
  });

  parent.addChild(source);
  parent.addChild(target);

}

let graph: Graph;
export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      graph = new Graph({
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
