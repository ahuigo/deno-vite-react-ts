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
    allowBlank: false,
    allowMulti: false,
    allowLoop: false,
    allowNode: false,// 允许连接到Node
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
          router: "orth", // 正交路由
          connector: "rounded",// 连接处平滑
          ...options, // 连接交互allowXXX
          createEdge({ sourceMagnet, sourceView, sourceCell }) { //配置拉出连线的样式
            console.log({ sourceMagnet, sourceView, sourceCell })
            return this.createEdge({
              attrs: {
                line: {
                  stroke: '#8f8f8f',
                  strokeWidth: 1,
                },
              },
            });
          },
          validateConnection({
            sourceCell,
            targetCell,
            sourceMagnet,
            targetMagnet,
          }) {
            // 不能连接自身
            if (sourceCell === targetCell) {
              return false;
            }

            // 只能从 bottom 连接桩开始连接，连接到 top 连接桩
            if (
              !sourceMagnet ||
              sourceMagnet.getAttribute('port-group') === 'top'
            ) {
              return false;
            }
            if (
              !targetMagnet ||
              targetMagnet.getAttribute('port-group') !== 'top'
            ) {
              return false;
            }

            // 不能重复连线
            const edges = this.getEdges();
            const portId = targetMagnet.getAttribute('port');
            if (edges.find((edge) => edge.getTargetPortId() === portId)) {
              return false;
            }

            return true;
          },
        },
      });
      renderFlow(graph);
      return () => clearGraph(containerRef.current, null || graph);
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
