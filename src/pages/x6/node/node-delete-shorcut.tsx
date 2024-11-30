import { useRef, useEffect, useState } from 'react';
import { Graph, Shape } from '@antv/x6';
import { clearGraph } from '@/pages/x6/tools';
import { OptionsEdit } from '@/pages/x6/util/options-edit';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { isMacOSX } from "@/utils/os";



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
export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState({
    offset: 30,
    useLocalStorage: true,
  });

  useEffect(() => {
    if (!graph) {
      graph = new Graph({
        container: containerRef.current!,
        grid: true,
      });
    }
    // copy paste
    graph.use(
      new Selection({
        enabled: true,
        showNodeSelectionBox: true,
      }),
    );

    graph.use(
      new Clipboard({
        enabled: true,
        useLocalStorage: true,
      }),
    );
    // keyboard
    graph.use(
      new Keyboard({
        enabled: true,
        global: true,
        format(key) {
          key = key.replace(/\s/g, "");
          return isMacOSX() ? key.replace('ctrl', 'command') : key;
        },
      }),
    );

    // shortcut handler
    graph.bindKey('ctrl+c', () => {
      onCopy();
      return false;
    });
    graph.bindKey('ctrl+v', () => {
      onPaste();
      return false;
    });
    graph.bindKey('Backspace', () => {
      console.log('Backspace');
      onDelete(graph);
      return false;
    });

    renderFlow(graph);
    return () => clearGraph(containerRef.current, graph);
  }, [options]);

  const changeOption = (opts: Record<string, boolean | number>) => {
    setOptions({ ...options, ...opts });
  };

  const onCopy = () => {
    const cells = graph.getSelectedCells();
    if (cells && cells.length) {
      graph.copy(cells, options);
    } else {
      alert('请先选中节点再复制');
    }
  };

  const onDelete = (graph: Graph) => {
    const cells = graph.getSelectedCells();
    cells?.forEach(cell => {
      console.log(cell);
      cell.remove();
    });
  };

  const onPaste = () => {
    if (graph.isClipboardEmpty()) {
      alert('剪切板为空，不可粘贴');
    } else {
      const cells = graph.paste(options);
      graph.cleanSelection();
      graph.select(cells);
    }
  };
  return <div className='flex'>
    <div>
      <OptionsEdit options={options} onChange={(opts) => changeOption(opts)} />
      <button onClick={onCopy}>copy</button>
      <button onClick={onPaste}>paste</button>
    </div>
    <div ref={containerRef} className="flex h-screen w-[calc(100vw-360px)] border-gray-400 border"></div></div>;
}
