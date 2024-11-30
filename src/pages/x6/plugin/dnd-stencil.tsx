import { useRef, useEffect, useState } from 'react';
import { Graph, Shape } from '@antv/x6';
import { clearGraph } from '@/pages/x6/tools';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Stencil } from '@antv/x6-plugin-stencil';


const commonAttrs = {
  body: {
    fill: '#fff',
    stroke: '#8f8f8f',
    strokeWidth: 1,
  },
};


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
let stencil: Stencil;
const modifiersOption = {
  type: 'checkgroup' as const,
  options: ['alt', 'ctrl'],
  value: ['alt'] as ('alt' | 'ctrl')[],
};

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stencilContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    graph = new Graph({
      container: containerRef.current!,
      grid: true,
    });
    stencil = new Stencil({
      title: 'Components',
      target: graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: 'Search by shape name',
      notFoundText: 'Not Found',
      collapsable: true,
      stencilGraphWidth: 200,
      stencilGraphHeight: 100,
      groups: [
        {
          name: 'group1',
          title: 'Group(Collapsable)',
        },
        {
          name: 'group2',
          title: 'Group',
          collapsable: false,
        },
      ],
    });
    stencilContainerRef.current!.appendChild(stencil.container);
    const n1 = graph.createNode({
      shape: 'rect',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'rect',
      attrs: commonAttrs,
    });

    const n2 = graph.createNode({
      shape: 'circle',
      x: 180,
      y: 40,
      width: 40,
      height: 40,
      label: 'circle',
      attrs: commonAttrs,
    });

    const n3 = graph.createNode({
      shape: 'ellipse',
      x: 280,
      y: 40,
      width: 80,
      height: 40,
      label: 'ellipse',
      attrs: commonAttrs,
    });

    const n4 = graph.createNode({
      shape: 'path',
      x: 420,
      y: 40,
      width: 40,
      height: 40,
      // https://www.svgrepo.com/svg/13653/like
      path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
      attrs: commonAttrs,
      label: 'path',
    });

    stencil.load([n1, n2], 'group1');
    stencil.load([n3, n4], 'group2');

    graph.use(
      new Snapline({
        enabled: true,
        sharp: true,
      }),
    );
    renderFlow(graph);
    return () => clearGraph(containerRef.current, graph);
  }, []);



  return <div className='flex'>
    <div className="w-52 relative" ref={stencilContainerRef}>
    </div>
    <div ref={containerRef} className="flex flex-1 h-screen w-[calc(100vw-1px)] border-gray-400 border"></div></div>;
}
