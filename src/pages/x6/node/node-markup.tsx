import { useRef, useEffect } from 'react';
import { Graph, NumberExt } from '@antv/x6';
import { clearGraph } from '../tools';
import genDatabaseAttr from '../svg/database';

function node1(graph: Graph) {
  Graph.registerNode('cylinder', {
    markup: [
      {
        tagName: 'path',
        selector: 'body',
      },
      {
        tagName: 'ellipse',
        selector: 'top',
      },
      {
        tagName: 'text',
        selector: 'title',
      },
    ],
    attrs: {
      title: {
        text: 'db!',
        refX: 0.5,
        refY: '5%',
        textAnchor: 'middle',
        textVerticalAnchor: 'top',
      },
      body: {
        fill: '#ffffff',
        stroke: '#333333',
        strokeWidth: 2,
        lateral: 10,
      },
      top: {
        fill: '#ffffff',
        stroke: '#333333',
        strokeWidth: 2,
        refCx: '50%',
        refRx: '50%',
        cy: 10,
        ry: 10,
      },
    },
    attrHooks: {
      lateral: {
        set(t: number | string, { refBBox }: any) {
          return genDatabaseAttr(t, refBBox);
        },
      },
    } as any,
  }, true);
  graph.addNode({
    shape: 'cylinder',
    x: 320,
    y: 120,
    width: 80,
    height: 120,
    label: 'cylinder',
    attrs: {
      top: {
        fill: '#fe854f',
        fillOpacity: 0.5,
      },
      body: {
        fill: '#ED8A19',
        fillOpacity: 0.8,
      },
    },
  });

}
function renderFlow(graph: Graph) {
  node1(graph);
  Graph.registerNode(
    'custom-node',
    {
      width: 200,
      height: 60,
      attrs: {
        body: {
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: 'rgba(95,149,255,0.05)',
          refWidth: 1,
          refHeight: 1,
        },
        image: {
          'xlink:href': 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          width: 16, height: 16, x: 12, y: 12,
        },
        title: {
          text: 'Human Task!',
          refX: 40, refY: 14, fill: 'rgba(0,0,0,0.85)', fontSize: 12, 'text-anchor': 'start',
        },
        text: {
          text: 'Human task', refX: 40, refY: 38, fontSize: 12, fill: 'rgba(0,0,0,0.6)', 'text-anchor': 'start',
        },
      },
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
          selector: 'image',
        },
        {
          tagName: 'text',
          selector: 'title',
        },
        {
          tagName: 'text',
          selector: 'text',
        },
      ],
    },
    true,
  );

  graph.addNode({
    x: 200,
    y: 160,
    shape: 'custom-node',
  });
}


export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {

      const graph = new Graph({
        container: containerRef.current,
        grid: true,
      });
      renderFlow(graph);
      return () => {
        // Graph.unregisterNode('cylinder');
        clearGraph(containerRef.current);

      };
    }
  }, [containerRef]);
  return <div ref={containerRef} className="flex h-screen w-[calc(100vw-360px)] border-gray-400 border"></div>;
}
