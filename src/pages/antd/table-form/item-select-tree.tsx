import { CloseCircleFilled, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Select, TreeSelect } from 'antd';
import { useRef } from 'react';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'my leaf',
          },
          {
            value: 'yourleaf',
            title: 'your leaf',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'sss',
            title: <b style={{ color: '#08c' }}>sss</b>,
          },
        ],
      },
    ],
  },
];
type IssueItem = {
};

const columns: ProColumns<IssueItem>[] = [
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',//https://procomponents.ant.design/components/schema#valuetype-%E5%88%97%E8%A1%A8
    fieldProps: {
      showSearch: true,
      // mode: 'tags',
      // multiple: true,
    },
    valueEnum: {
      // all: '超长', // 简写：如果不需要状态
      all: { text: '超长'.repeat(3) },
      // open: '未解决', // 简写：如果不需要状态
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
    },
  },
  {
    title: 'tags',
    dataIndex: 'tags',
    renderFormItem: (_, { defaultRender }) => {
      return (<Select mode="tags" />);
    },
  },
  {
    title: 'tree',
    dataIndex: 'tree',
    renderFormItem: (_, { defaultRender }) => {
      return (
        <TreeSelect
          multiple
          showSearch
          // onKeyDown={handleKeyDown}
          // options={tagOptions}
          treeDefaultExpandAll
          treeData={treeData}
        />
      );
    },
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<IssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      rowKey="id"
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      search={{
        defaultCollapsed: false,
      }}
      form={{
        initialValues: {
          tags: ['a', 'b'],
          tree: ['leaf1', 'yourleaf'],
        },
        onValuesChange: (changedValues, allValues) => {
          console.log(changedValues);
        },
      }}
      dateFormatter="string"
    />
  );
};