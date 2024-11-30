import { useRef, useEffect, useState } from 'react';
import { Edge, Graph, NumberExt } from '@antv/x6';
import { clearGraph } from '../tools';
import { OptionsEdit } from '../util/options-edit';


const data = {
  nodes: [
    {
      id: 'node1', shape: 'rect', x: 40, y: 40, width: 100, height: 40, label: 'hello',
      attrs: { body: { stroke: '#8f8f8f', strokeWidth: 1, fill: '#fff', rx: 2, ry: 5, }, },
    },
    { id: 'node2', shape: 'rect', x: 160, y: 180, width: 100, height: 40, label: 'world', },
  ],
  edges: [
    { source: 'node1', target: 'node2', },
  ],
};

const defaultOptions = {
  zoom: {
    type: 'slide' as const, min: 0.2, max: 10, defaultValue: 1, step: 0.1,
  }
};
type OptionValue = typeof defaultOptions[keyof typeof defaultOptions];

export default function Index() {
  const [graph, setGraph] = useState<Graph>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState(defaultOptions);
  const changeOption = (opts: Record<string, OptionValue>) => {
    const opts2 = { ...options, ...opts };
    // setOptions(opts2);
    graph?.zoomTo(opts2.zoom.defaultValue);
  };
  useEffect(() => {
    if (containerRef.current) {
      const graph = new Graph({
        container: containerRef.current,
        grid: true, panning: true,
        //autoResize: true, //不要加这个, width/height 会放得很大
        // mousewheel: true,
      });
      setGraph(graph);
      graph.fromJSON(data); // 渲染元素
      graph.centerContent();
      if (Math.random() > 100) {
        graph.fitToContent(); //　画面尺寸调整为内容width/height(常用于resize)
        graph.zoomToFit({ maxScale: 1 }); // 将画布中元素缩小或者放大一定级别，让画布正好容纳所有元素，可以通过 maxScale 配置最大缩放级别
        graph.centerContent(); // 将画布中元素居中展示
      }
      return () => clearGraph(containerRef.current, graph);
    }
  }, [containerRef]);
  return <div className='flex w-screen'>
    {graph && <OptionsEdit options={options} onChange={changeOption} className='w-[20vw]' />}
    <div ref={containerRef} className="flex h-screen w-[70vw] border-black border"></div>
  </div>;
}
