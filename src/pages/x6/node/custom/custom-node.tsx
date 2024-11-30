import React, { useState, useRef } from 'react';
import { Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Dropdown, Tooltip } from 'antd';

import {
  NodeType, Position, PROCESSING_TYPE_LIST,
  NODE_TYPE_LOGO, CellStatus,
} from './custom-types';
import { createEdge, getDownstreamNodePosition } from './custom-edge';
import { createNode } from './custom-node-create';

const TaskNode = ({ node }: { node: Node; }) => {
  const [state, setState] = useState({
    plusActionSelected: false,
  });
  const { plusActionSelected } = state;
  // 创建下游的节点和边
  const createDownstream = (type: NodeType) => {
    const { graph } = node.model || {};
    if (graph) {
      // 获取下游节点的初始位置信息
      const position = getDownstreamNodePosition(node, graph);
      // 创建下游节点
      const newNode = createNode(type, graph, position);
      const source = node.id;
      const target = newNode.id;
      // 创建该节点出发到下游节点的边
      createEdge(source, target, graph);
    }
  };

  // 点击添加下游+号
  const clickPlusDragMenu = (type: NodeType) => {
    createDownstream(type);
    setState({
      ...state,
      plusActionSelected: false,
    });
  };

  //  获取+号下拉菜单
  const getPlusDagMenu = () => {
    return (
      <ul>
        {PROCESSING_TYPE_LIST.map((item) => {
          const content = (
            // eslint-disable-next-line
            <a onClick={() => clickPlusDragMenu(item.type)}>
              <i
                className="node-mini-logo"
                style={{ backgroundImage: `url(${NODE_TYPE_LOGO[item.type]})` }}
              />

              <span>{item.name}</span>
            </a>
          );
          return (
            <li className="each-sub-menu" key={item.type}>
              {content}
            </li>
          );
        })}
      </ul>
    );
  };

  // 添加下游菜单的打开状态变化
  const onPlusDropdownOpenChange = (value: boolean) => {
    setState({
      ...state,
      plusActionSelected: value,
    });
  };

  // 鼠标进入矩形主区域的时候显示连接桩
  const onMainMouseEnter = () => {
    // 获取该节点下的所有连接桩
    const ports = node.getPorts() || [];
    ports.forEach((port) => {
      node.setPortProp(port.id!, 'attrs/circle', {
        fill: '#fff',
        stroke: '#85A5FF',
      });
    });
  };

  // 鼠标离开矩形主区域的时候隐藏连接桩
  const onMainMouseLeave = () => {
    // 获取该节点下的所有连接桩
    const ports = node.getPorts() || [];
    ports.forEach((port) => {
      node.setPortProp(port.id!, 'attrs/circle', {
        fill: 'transparent',
        stroke: 'transparent',
      });
    });
  };

  const data = node?.getData() || {};
  const { name = "name", type = "type", status, statusMsg } = data;

  return (
    <div className="custom-node border border-solid">
      <div
        className="main-area"
        onMouseEnter={onMainMouseEnter}
        onMouseLeave={onMainMouseLeave}
      >
        <div className="main-info">
          {/* 节点类型icon */}
          <i
            className="node-logo"
            style={{ backgroundImage: `url(${NODE_TYPE_LOGO[type as NodeType]})` }}
          />
          <Tooltip title={name} mouseEnterDelay={0.8}>
            <div className="node-name">{name}</div>
          </Tooltip>
        </div>

        {/* 节点状态信息 */}
        <div className="status-action">
          {status === CellStatus.ERROR && (
            <Tooltip title={statusMsg}>
              <i className="status-icon status-icon-error" />
            </Tooltip>
          )}
          {status === CellStatus.SUCCESS && (
            <i className="status-icon status-icon-success" />
          )}
        </div>
      </div>

      {/* 添加下游节点 */}
      {(
        <div className="plus-dag">
          <Dropdown
            dropdownRender={getPlusDagMenu}
            overlayClassName="processing-node-menu"
            trigger={['click']}
            placement="bottom"
            open={plusActionSelected}
            onOpenChange={onPlusDropdownOpenChange}
          >
            <i className={'plus-action plus-action-selected'} />

          </Dropdown>
        </div>
      )}
    </div>
  );
};

function registerNode() {
register({
  shape: 'task-node',
  width: 212,
  height: 48,
  component: TaskNode,
  // port默认不可见
  ports: {
    groups: {
      in: {
        position: 'left',
        attrs: {
          circle: { r: 4, magnet: true, stroke: 'transparent', strokeWidth: 1, fill: 'transparent', },
        },
      },

      out: {
        position: {
          name: 'right',
          args: { dx: -32, },
        },

        attrs: {
          circle: { r: 4, magnet: true, stroke: 'transparent', strokeWidth: 1, fill: 'transparent', },
        },
      },
    },
  },
});
}
registerNode();