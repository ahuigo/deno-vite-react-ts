import React, { useRef, useEffect } from 'react';
import { clearGraph } from '../tools';
import { Graph, Color } from '@antv/x6';
import { Button } from 'antd';

/*
0. node.store.data === node.prop()
1. props: 含有attrs+data：
  node.prop('size')
    edge.prop('labels', [{ attrs: { label: { text: 'label5' } } }]);
    edge.prop('labels/0/attrs/label/text', 'label5');
2. node.attrs:
    node.attr('body/fill') 等价于 node.prop('attrs/body/fill', '#ccc')
3. node.data:
    node.getData() // 等价于　node.prop('data')
    node.setData(data)

*/
Graph.registerNode(
  'custom-node',
  {
    inherit: 'rect', // 继承于 rect 节点
    width: 100,
    height: 41,
    markup: [
      {
        tagName: 'rect', // 标签名称
        selector: 'body', // 选择器
      },
      {
        tagName: 'image',
        selector: 'img',
      },
      {
        tagName: 'text',
        selector: 'title',//如果找不到，就使用prop().label
      },
    ],
    attrs: {
      body: {
        stroke: '#8f8f8f', strokeWidth: 1, fill: '#fff', rx: 6, ry: 6,
      },
      // title: { text: "hi-title" },
      img: {
        'xlink:href':
          'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        width: 16, height: 20, x: 12, y: 12,
      },
    },
  },
  true,
);


const commands = [
  {
    key: 'prop',
    label: 'prop',
  },
  {
    key: 'attr',
    label: 'attr',
  },
];

function renderFlow(graph: Graph) {
  const source = graph.addNode({
    shape: 'custom-node',
    x: 40,
    y: 40,
    label: 'hello',
  });
  console.log('source node prop(含attrs):', source.prop());
  console.log('source node attrs:', source.getAttrs());

  const target = graph.addNode({
    shape: 'custom-node',
    x: 160,
    y: 180,
    label: 'world',
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

  graph.centerContent();
  graph.zoomToFit({ maxScale: 20 });// 最大放大倍数20
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
    const nodes = graph.getNodes();
    switch (command) {
      case 'prop':
        nodes.forEach((node) => {
          const width = 100 + Math.floor(Math.random() * 50);
          const height = 40 + Math.floor(Math.random() * 10);
          node.prop('size', { width, height });
        });
        break;
      case 'attr':
        nodes.forEach((node) => {
          const color = Color.random().toHex();
          node.attr('body/fill', color);
          // node.attr("rect/fill", '#ccc'); // 修改填充色，等价于 source.prop('attrs/rect/fill', '#ccc')

        });
        break;
      default:
        break;
    }
  };

  const showProps = () => {

  };

  return (
    <div className="node-prop-app ">
      <style>{``}</style>
      <div className="app-btns">
        <Button.Group>
          {commands.map((item) => (
            <Button onClick={() => change(item.key)} key={item.key}> {item.label} </Button>
          ))}
        </Button.Group>
        <Button onClick={showProps}>showProps</Button>
      </div>
      <div ref={containerRef} className="flex h-screen w-[calc(90vw)] border-gray-400 border"></div>;
    </div>);
}
