import React, { useEffect, useState, useRef, useContext } from 'react';
import { Graph, Node } from '@antv/x6';
import { Button, Tooltip } from 'antd';
// import { register, Portal } from '@/utils/x6-plugin/x6-react-shape';
import { register, Portal } from '@antv/x6-react-shape';
// import { MiniMap } from '@/utils/x6-plugin/minimap';
import { MiniMap } from '@antv/x6-plugin-minimap';

const X6ReactPortalProvider = Portal.getProvider(); // 注意，一个 graph 只能申明一个 portal provider
const AppContext = React.createContext(10);

const CustomComponent = ({ node }: { node: Node; }) => {
  const label = node.prop('label');
  const count = React.useContext(AppContext);
  // const count = 1

  return (
    <Tooltip title="prompt text">
      <div className="custom-react-node">{label}:{count}</div>
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
  const refMiniMapContainer = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);
  const [hasMinimap] = useState(() => {
    return location.search.includes('mini=');
  })

  useEffect(() => {
    const graph = new Graph({
      container: refContainer.current!,
      background: {
        color: '#F2F7FA',
      },
    });
    // minimap
    if (hasMinimap) {
      graph.use(
        new MiniMap({
          container: refMiniMapContainer.current!,
          width: 200,
          height: 160,
          padding: 10,
          scalable: false,
        }),
      );
    }

    graph.fromJSON(data);
    graph.centerContent();
    console.log('tojson', graph.toJSON());

    const node = graph.getCellById('node1') as Node;
    setTimeout(() => {
      const { count } = node.getData<{ count: number; }>();
      node.setData({
        count: (count + 10000),
      });
    }, 1000);

  }, []);


  return (
    <div>
      <style>
        {`
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
      <Button onClick={() => setCount(count + 1)}>Add({count})将count传到x6内部去</Button>
      <AppContext.Provider value={count}>
        <X6ReactPortalProvider />
      </AppContext.Provider>
      <div className="react-shape-app flex h-screen w-[calc(90vw)] border-gray-400 border" ref={refContainer} />
      <div className="minimap fixed right-10 top-10 w-48 h-42 border border-solid border-gray-400" ref={refMiniMapContainer} />
    </div>
  );
};
