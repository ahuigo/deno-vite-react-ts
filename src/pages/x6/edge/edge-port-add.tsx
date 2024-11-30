import { useRef, useEffect } from 'react';
import { Graph, Node, Color } from '@antv/x6';

import { clearGraph } from '../tools';

Graph.registerNode(
  'custom-node-width-port',
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
    ports: {
      groups: {
        top: {
          position: {
            name: 'top',
            args: { dy: 3, },
          },
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5,
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5,
            },
          },
        },
        left: {
          position: {
            name: 'left',
            args: { dx: 3, },
          },
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5,
            },
          },
        },
      },
    },
  },
  true,
);
function renderFlow(graph: Graph) {
  const source = graph.addNode({
    id: "begin",
    shape: 'custom-node-width-port',
    x: 40,
    y: 40,
    label: 'hello',
    ports: {
      items: [
        { id: 'port_1', group: 'bottom', },
        { id: 'port_2', group: 'bottom', },
        { id: 'port_3', group: 'top', },
      ],
    },
  });

  const target = graph.addNode({
    shape: 'custom-node-width-port',
    x: 160,
    y: 180,
    label: 'world',
    ports: {
      items: [
        {
          id: 'port_3',
          group: 'top',
        },
        {
          id: 'port_4',
          group: 'top',
        },
      ],
    },
  });

  // graph.addEdge({
  //   source: { cell: source, port: 'port_2' },
  //   target: { cell: target, port: 'port_3' },
  //   attrs: {
  //     line: {
  //       stroke: '#8f8f8f',
  //       strokeWidth: 1,
  //     },
  //   },
  // });

  // graph.centerContent();
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

  const change = (command: string) => {
    const node = graph.getCellById('begin') as Node;
    console.log('tojson', graph.toJSON());
    const ports = node.getPorts();
    let color: string;
    switch (command) {
      case 'addPort':
        node.addPort({
          group: 'top',
          attrs: {
            text: {
              text: `${ports.length + 1}`,
            },
          },
        });
        break;
      case 'removePort':
        if (ports.length) {
          node.removePortAt(ports.length - 1);
        }
        break;
      case 'updatePort':
        color = Color.random().toHex();
        ports.forEach((port) => {
          node.portProp(port.id!, 'attrs/circle/stroke', color);
        });
        break;
      default:
        break;
    }
  };

  return <div>
    <button onClick={() => change('addPort')}>addPort</button>
    <button onClick={() => change('updatePort')}>updatePort</button>
    <button onClick={() => change('removePort')}>deletePort</button>
    <div ref={containerRef} className="flex h-screen w-[calc(90vw)] border-gray-400 border"></div>
  </div>;
}
