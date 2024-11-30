import { useRef, useEffect } from 'react';
import { Graph, Node, Color } from '@antv/x6';

import { clearGraph } from '../tools';

Graph.registerNode(
  'custom-click-node',
  {
    markup: [
      { tagName: 'rect', selector: 'body', },
      { tagName: 'text', selector: 'label', },
      {
        tagName: 'g', //group
        children: [
          { tagName: 'text', selector: 'btnText', },
          { tagName: 'rect', selector: 'btn', },
        ],
      },
    ],
    attrs: {
      btn: {
        refX: '100%',
        refX2: -28,
        y: 4,
        width: 24,
        height: 18,
        rx: 10,
        ry: 10,
        fill: 'rgba(255,255,0,0.01)',
        stroke: 'red',
        cursor: 'pointer',
        event: 'node:delete',
      },
      btnText: {
        fontSize: 14,
        fill: 'red',
        text: 'x',
        refX: '100%',
        refX2: -19,
        y: 17,
        cursor: 'pointer',
        pointerEvent: 'none',
      },
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6,
        refWidth: '100%',
        refHeight: '100%',
      },
      label: {
        fontSize: 14,
        fill: '#333333',
        refX: '50%',
        refY: '50%',
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
      },
    },
  },
  true,
);

function renderFlow(graph: Graph) {
  const source = graph.addNode({
    shape: 'custom-click-node',
    x: 40,
    y: 80,
    width: 120,
    height: 40,
    attrs: {
      label: {
        text: 'Source',
      },
    },
  });

  const target = graph.addNode({
    shape: 'custom-click-node',
    x: 360,
    y: 80,
    width: 120,
    height: 40,
    attrs: {
      label: {
        text: 'Target',
      },
    },
  });

  graph.addEdge({
    source,
    target,
    attrs: {
      line: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
      },
    },
  });

  graph.on('node:delete', ({ view, e }: any) => {
    e.stopPropagation();
    view.cell.remove();
  });
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
