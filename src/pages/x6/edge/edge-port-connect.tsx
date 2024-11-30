import { useRef, useEffect, useState } from 'react';
import { Graph, Node, Color } from '@antv/x6';

import { clearGraph } from '../tools';
import { OptionsEdit } from '../util/options-edit';

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
          position: 'top',
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

}

let graph: Graph;
export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<Record<string, boolean>>({
    allowBlank: true,
    allowMulti: true,
    allowLoop: true,
    allowNode: true,// 允许连接到Node
    allowEdge: true,// 允许连接到Edge
    allowPort: true,
    highlight: true,

  });

  useEffect(() => {
    if (containerRef.current) {
      graph = new Graph({
        container: containerRef.current,
        grid: true,
        panning: true,
        connecting: {
          router: "manhattan", // 正交路由
          connector: "rounded",// 连接处平滑
          ...options, // 连接交互allowXXX
          createEdge(that) { //配置拉出连线的样式
            console.log({ that, a: this })
            return this.createEdge({
              attrs: {
                line: {
                  stroke: '#8f8f8f',
                  strokeWidth: 1,
                },
              },
            });
          },
        },
      });
      renderFlow(graph);
      return () => clearGraph(containerRef.current, graph);
    }
  }, [containerRef, options]);

  const changeOption = (ops: Record<string, boolean>) => {
    setOptions({ ...options, ...ops });
  };

  return <div className="flex">
    <OptionsEdit className="flex-1" options={options} onChange={changeOption} />
    <div ref={containerRef} className="flex h-screen w-[calc(90vw)] border-gray-400 border"></div>
  </div>;
}
