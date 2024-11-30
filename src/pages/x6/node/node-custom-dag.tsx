import React, { useEffect, useState, useRef } from 'react';
import { Graph, Node, Path, Edge, Platform, StringExt } from '@antv/x6';
import { Selection } from '@antv/x6-plugin-selection';
import { stopAnimate, } from './custom/custom-edge-animate';
import './custom/custom-node';
import { data, } from './custom/custom-types';
import { connecting } from './custom/custom-edge-connecting';
import styles from './custom/styles.less';

console.log({ styles })

function createGraph(container: HTMLDivElement) {
  const graph: Graph = new Graph({
    container,
    panning: {
      enabled: true,
      eventTypes: ['leftMouseDown', 'mouseWheel'],
    },
    mousewheel: {
      enabled: true,
      modifiers: 'ctrl',
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#31d0c6',
            strokeWidth: 4,
          },
        },
      },
    },
    connecting: {
      ...connecting,
      createEdge() {
        return graph.createEdge({
          shape: 'data-processing-curve',
          attrs: {
            line: {
              strokeDasharray: '5 5',
            },
          },
          zIndex: -1,
        });
      },
      // 连接桩校验
      validateConnection({ sourceMagnet, targetMagnet }) {
        // 只能从输出链接桩创建连接
        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
          return false;
        }
        // 只能连接到输入链接桩
        if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
          return false;
        }
        return true;
      },
    }
  });
  return graph;
}

export default () => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = createGraph(refContainer.current!);
    graph.use(
      new Selection({
        multiple: true,
        rubberEdge: true,
        rubberNode: true,
        modifiers: 'shift',
        rubberband: true,
      }),
    );
    graph.fromJSON(data);
    // graph.zoomToFit();
    showNodeStatus(graph);
    stopAnimate(graph);
  }, []);


  return (
    <div className="react-shape-app flex h-screen w-[calc(90vw)] border-gray-400 border">
      {/* <style>{styles}</style> */}
      <div className={"flex-1 m-8 h-screen w-[calc(90vw)] " + styles.taskNode} ref={refContainer} />
    </div>
  );
};


// 显示节点状态
const showNodeStatus = (graph: Graph) => {
  nodeStatusList.forEach((item) => {
    const { id, status, statusMsg } = item;
    const node = graph.getCellById(id);
    const data = node.getData(); //as CellStatus
    node.setData({
      ...data,
      status,
      statusMsg,
    });
  });
};
// 节点状态列表
const nodeStatusList = [
  { id: 'node-0', status: 'success', },
  { id: 'node-1', status: 'success', },
  { id: 'node-2', status: 'success', },
  { id: 'node-3', status: 'error', statusMsg: '错误信息示例', },
  { id: 'node-4', status: 'error', statusMsg: '错误信息示例', },
];
