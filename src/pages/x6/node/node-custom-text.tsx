import React, { useEffect, useState, useRef } from 'react';
import { Graph, Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Dropdown, Tooltip } from 'antd';

const CustomComponent = ({ node }: { node: Node; }) => {
  const label = node.prop('label');
  const { count } = node.getData() || {};
  return (
    <Tooltip title="prompt text">
      <div className="custom-react-node p-2 rounded border border-solid flex items-center justify-center">l:{label},d:{count}</div>
    </Tooltip>
  );
};

register({
  shape: 'custom-react-node',
  width: 100,
  height: 40,
  component: CustomComponent,
});

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'custom-react-node',
      x: 40,
      y: 40,
      label: 'hello',
      data: { count: 1 }
    },
    {
      id: 'node2',
      shape: 'custom-react-node',
      x: 160,
      y: 180,
      label: 'world',
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
};

export default () => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new Graph({
      container: refContainer.current!,
      background: {
        color: '#F2F7FA',
      },
    });

    graph.fromJSON(data);
    graph.centerContent();
    console.log('tojson', graph.toJSON());

    const node = graph.getCellById('node1') as Node;
    setTimeout(() => {
      const { count } = node.getData<{ count: number; }>();
      node.setData({
        count: (count + 150),
      });
    }, 1000);

  }, []);


  return (
    <div className="react-shape-app flex h-screen w-[calc(90vw)] border-gray-400 border">
      <div className="flex-1 h-80 m-8" ref={refContainer} />

    </div>
  );
};
