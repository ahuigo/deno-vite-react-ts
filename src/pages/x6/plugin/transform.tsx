import { useRef, useEffect, useState } from 'react';
import { Graph, Shape } from '@antv/x6';
import { clearGraph } from '@/pages/x6/tools';
import { OptionsEdit } from '@/pages/x6/util/options-edit';
import { Transform } from '@antv/x6-plugin-transform'


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


export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState({
    enabled: true,
    minWidth: 1,
    maxWidth: 200,
    minHeight: 1,
    maxHeight: 150,
    orthogonal: false,
    restrict: false,
    preserveAspectRatio: false,
  }
  );
  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current!,
      grid: true,
    });
    graph.use(
      new Transform({
        resizing: options,//放大
        rotating: { enabled: true, grid: 15, },//rotating
      }),
    );
    renderFlow(graph);
    return () => clearGraph(containerRef.current, graph);
  }, [options]);
  const changeOption = (opts: Record<string, boolean | number>) => {
    setOptions({ ...options, ...opts });
  };
  return <div className='flex'>
    <OptionsEdit options={options} onChange={(opts) => changeOption(opts)} />
    <div ref={containerRef} className="flex h-screen w-[calc(100vw-360px)] border-gray-400 border"></div></div>;
}
