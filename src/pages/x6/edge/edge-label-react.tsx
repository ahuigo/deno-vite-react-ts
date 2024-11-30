import { useRef, useEffect } from 'react';
import { Graph, Markup } from '@antv/x6';
import { clearGraph } from '../tools';
import * as ReactDOM from 'react-dom/client';


function Label(props: any) {
  return (
    <button className="w-full h-full border-0">{props?.name || 'none'}</button>
  );
}
const data = {
  nodes: [
    { id: 'node1', shape: 'rect', x: 40, y: 40, width: 100, height: 40, label: 'hello', },
    { id: 'node2', shape: 'rect', x: 160, y: 480, width: 100, height: 40, label: 'world', },
  ],
  edges: [{
    shape: "edge", //default shape: "edge",
    // source: [170, 160], target: [550, 160],
    source: "node1", target: { cell: 'node2', },
    data: { name: "label1" },
    defaultLabel: {
      markup: Markup.getForeignObjectMarkup(),
      attrs: {
        fo: {
          width: 120,
          height: 30,
          x: -60,
          y: -15,
        },
      },
    },
    // labels: ["label2"], // 等价于 label: "label0",
    label: { position: 0.5 },
    attrs: { line: { stroke: '#ccc', }, },
  }],
};


export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      const graph = new Graph({
        container: containerRef.current,
        grid: true,
        panning: true,
        onEdgeLabelRendered: (args) => {
          console.log(args);
          const { selectors, label, edge } = args;
          const name = edge.getData()?.name || 'none';
          // const labelText = label.getText();
          console.log({ data, label });
          const content = selectors.foContent as HTMLDivElement;
          if (content) {
            // ReactDOM.render(<Label />, content);
            ReactDOM.createRoot(content).render(<Label name={name} />);
          }
        },
      });
      graph.fromJSON(data); // 渲染元素
      return () => clearGraph(containerRef.current, graph);
    }
  }, [containerRef]);
  return <div>
    <div ref={containerRef} className="flex h-screen w-[calc(90vw)] border-gray-400 border"></div>
  </div>;
}
