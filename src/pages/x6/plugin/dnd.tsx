import { useRef, useEffect, useState } from 'react';
import { Graph, Shape } from '@antv/x6';
import { clearGraph } from '@/pages/x6/tools';
import { Dnd } from '@antv/x6-plugin-dnd';
import { Snapline } from '@antv/x6-plugin-snapline';



function renderFlow(graph: Graph) {

  const source = graph.addNode({
    id: 'n1',
    x: 20, y: 40, width: 60, height: 60,
    label: 'rect',
    attrs: {
      body: { stroke: '#ffa940', fill: '#ffd591', rx: 10, ry: 10, },
      label: { refX: 0.5, refY: '100%', refY2: 0.2, textAnchor: 'middle', textVerticalAnchor: 'top', },
    },
  });
  const target = graph.addNode({
    id: 'n2',
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
let dnd: Dnd;
const modifiersOption = {
  type: 'checkgroup' as const,
  options: ['alt', 'ctrl'],
  value: ['alt'] as ('alt' | 'ctrl')[],
};

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dndContainerRef = useRef<HTMLDivElement>(null);
  const [dnd, setDnd] = useState<Dnd>();

  useEffect(() => {
    graph = new Graph({
      container: containerRef.current!,
      grid: true,
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
    });
    const dnd = new Dnd({
      target: graph,
      scaled: false,
      dndContainer: dndContainerRef.current!,
    });
    setDnd(dnd);
    graph.use(
      new Snapline({ // 对齐线
        enabled: true,
        sharp: true,
      }),
    );
    renderFlow(graph);
    return () => clearGraph(containerRef.current, graph);
  }, []);

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    const type = target.getAttribute('data-type');
    const node =
      type === 'rect'
        ? graph.createNode({
          width: 100,
          height: 40,
          label: 'Rect',
          attrs: { body: { stroke: '#8f8f8f', strokeWidth: 1, fill: '#fff', rx: 6, ry: 6, }, },
        })
        : graph.createNode({
          width: 60, height: 60, shape: 'circle', label: 'Circle',
          attrs: { body: { stroke: '#8f8f8f', strokeWidth: 1, fill: '#fff', }, },
        });

    dnd!.start(node, e.nativeEvent as any);
  };


  return <div className='flex'>
    <div className="p-2 [&>*]:mt-4" ref={dndContainerRef}>
      <div
        data-type="rect"
        className="border border-solid w-8 h-16 leading-16 text-center justify-center items-center flex"
        onMouseDown={startDrag}
      >
        Rect
      </div>
      <div
        data-type="circle"
        className="rounded-full border border-solid w-8 h-8 justify-center items-center flex"
        onMouseDown={startDrag}
      >
        Circle
      </div>
    </div>
    <div ref={containerRef} className="flex h-screen w-[calc(100vw-360px)] border-gray-400 border"></div></div>;
}
