import React, { useEffect, useState, useRef } from 'react';
import { Graph, Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Dropdown, Tooltip } from 'antd';

const CustomComponent = ({ node }: { node: Node; }) => {
  const label = node.prop('label');
  const { count, users } = node.getData() || {};
  count && console.log({ data: node.data, attrs: node.attrs })
  return (
    <Tooltip title="prompt text">
      <div className="custom-react-node flex-col">
        <div>label:{label}</div>
        {count && <>
          <div> count:{count}</div>
          <div> users:{users} </div>
        </>}
      </div>
      {/* <div>node data:{JSON.stringify(node.data)}</div>
      <div>node attr:{JSON.stringify(node.attrs)}</div> */}
    </Tooltip>
  );
};

register({
  shape: 'custom-react-node',
  width: 100,
  height: 60,
  attrs: {
    task: { type: 'simple' },
  },
  component: CustomComponent,
});

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'custom-react-node',
      x: 40,
      y: 40,
      label: 'l1',
      data: { count: 1, users: ["Alex", "Bob"] },
      attrs: {
        task: { type: 'simple' },
      }
    },
    {
      id: 'node2',
      shape: 'custom-react-node',
      x: 160,
      y: 180,
      label: 'l2',
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
        count: (count + 1),
        users: [],
      }, { deep: false });
      console.log('getData().users:', node.getData().users)
    }, 800);

  }, []);


  return (
    <div className="react-shape-app flex h-screen w-[calc(90vw)] border-gray-400 border">
      <style>
        {`
  .app-content {
    flex: 1;
    height: 280px;
    margin-right: 8px;
    margin-left: 8px;
    border-radius: 5px;
    box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
  }

  .custom-react-node {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px solid #8f8f8f;
    border-radius: 6px;
  }

  .custom-react-node span {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
          `}
      </style>
      <div className="app-content" ref={refContainer} />
    </div>
  );
};
