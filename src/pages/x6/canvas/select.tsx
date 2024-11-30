import { useRef, useEffect, useState } from 'react';
import { Graph, Shape } from '@antv/x6';
import { clearGraph } from '@/pages/x6/tools';
import { OptionsEdit } from '@/pages/x6/util/options-edit';
import { Selection } from '@antv/x6-plugin-selection';


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
const modifiersOption = {
  type: 'checkgroup' as const,
  options: ['alt', 'ctrl'],
  value: ['alt'] as ('alt' | 'ctrl')[],
};

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checkboxModifiers, setCheckboxModifiers] = useState({
  });

  const [options, setOptions] = useState({
    multiple: true,
    rubberband: true,
    movable: true,
    modifiers: modifiersOption
  });

  useEffect(() => {
    graph = new Graph({
      container: containerRef.current!,
      grid: true,
    });
    // copy paste
    graph.use(
      new Selection({
        enabled: true,
        multiple: true,
        rubberband: true,//启用框选节点功能
        movable: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        strict: false, //选框是否需要完全包围节点时才选中节点
        pointerEvents: 'none',//none避免上方盖一层元素，导致节点的事件无法响应
      }),
    );

    renderFlow(graph);
    return () => clearGraph(containerRef.current, graph);
  }, []);

  const changeOption = (opts: Record<string, boolean | number | typeof modifiersOption>) => {
    const opts2 = { ...options, ...opts };
    setOptions(opts2);
    graph.toggleMultipleSelection(opts2.multiple);
    graph.toggleRubberband(opts2.rubberband);
    graph.toggleSelectionMovable(opts2.movable);
    // this.graph.toggleStrictRubberband(options.strict)
    // this.graph.setSelectionFilter(options.filter)
    graph.setRubberbandModifiers(opts2.modifiers.value);
  };

  return <div className='flex'>
    <div>
      <OptionsEdit options={options} onChange={(opts) => changeOption(opts)} />
    </div>
    <div ref={containerRef} className="flex h-screen w-[calc(100vw-360px)] border-gray-400 border"></div></div>;
}
