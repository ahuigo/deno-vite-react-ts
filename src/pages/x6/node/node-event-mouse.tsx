import { useRef, useEffect } from 'react';
import { Graph, Shape } from '@antv/x6';
import { clearGraph } from '../tools';


function renderFlow(container: HTMLDivElement) {
  const graph = new Graph({
    container,
    grid: true,
  });

  graph.addNode({
    x: 20, y: 40, width: 60, height: 60,
    label: 'rect',
    attrs: {
      body: {
        stroke: '#ffa940',
        fill: '#ffd591',
        rx: 10,
        ry: 10,
      },
      label: {
        refX: 0.5,
        refY: '100%',
        refY2: 0.2,
        textAnchor: 'middle',
        textVerticalAnchor: 'top',
      },
    },
  });

  graph.on('cell:mouseenter', ({ cell }) => {
    if (cell.isNode()) {
      cell.addTools([
        {
          name: 'boundary',
          args: {
            attrs: {
              fill: '#7c68fc',
              stroke: '#333',
              'stroke-width': 1,
              'fill-opacity': 0.2,
            },
          },
        },
        {
          name: 'button-remove',
          args: {
            x: 0,
            y: 0,
            offset: { x: 10, y: 10 },
          },
        },
      ]);
    } else {
      cell.addTools(['vertices', 'segments']);
    }
  });

  graph.on('cell:mouseleave', ({ cell }) => {
    cell.removeTools();
  });
  return graph;
}


export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      const graph = renderFlow(containerRef.current);
      return () => clearGraph(containerRef.current, graph);
    }
  }, [containerRef]);
  return <div ref={containerRef} className="flex h-screen w-[calc(100vw-360px)] border-gray-400 border"></div>;
}
