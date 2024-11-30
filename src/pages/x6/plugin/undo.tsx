import { useRef, useEffect, useState } from 'react';
import { Graph, Shape } from '@antv/x6';
import { clearGraph } from '@/pages/x6/tools';
import { History } from '@antv/x6-plugin-history';



function renderFlow(graph: Graph) {

  const source = graph.addNode({
    x: 20, y: 40, width: 60, height: 60,
    label: 'rect',
    attrs: {
      body: { stroke: '#ffa940', fill: '#ffd591', rx: 10, ry: 10, },
      label: { refX: 0.5, refY: '100%', refY2: 0.2, textAnchor: 'middle', textVerticalAnchor: 'top', },
    },
  });
  const target = graph.addNode({
    shape: 'circle',
    x: 160, y: 180, width: 60, height: 60, label: 'World',
  });

  graph.addEdge({
    source,
    target,
    attrs: {
      line: { stroke: '#8f8f8f', strokeWidth: 1, },
    },
  });
}

let graph: Graph;
export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    graph = new Graph({
      container: containerRef.current!,
      grid: true,
    });
    graph.use(
      new History({
        enabled: true,
      })
    );
    graph.on('history:change', () => {
      console.log('history.change');
    });
    renderFlow(graph);
    return () => clearGraph(containerRef.current, graph);
  }, []);
  return <div className='flex'>
    <div>
      <button onClick={() => graph.undo()}>undo</button>
      <button onClick={() => graph.redo()}>redo</button>
    </div>
    <div ref={containerRef} className="flex h-screen w-[calc(100vw-360px)] border-gray-400 border"></div></div>;
}
