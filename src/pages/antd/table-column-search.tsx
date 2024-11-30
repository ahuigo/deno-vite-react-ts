import { CloseCircleFilled, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef } from 'react';

// doc: https://procomponents.ant.design/en-US/components/table?tab=api&current=1&pageSize=5#search-form-customization
export const waitTime = async (time: number = 100) => {
  await new Promise((resolve) => { setTimeout(resolve, time); });
};

type Item = {
  id: number;
  title: string;
  tag: string;
};

const columns: ProColumns<Item>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    onFilter: true, //本地过滤
    valueType: 'digit',
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    onFilter: true, //本地过滤
    valueType: 'select',
    fieldProps: { // 参考 form-field/select.tsx
      // mode: 'multiple',
      mode: 'tags',
      autoComplete: 'on',
      showSearch: true,
    },
    valueEnum: {
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
      inited: {
        text: '初始化',
      },
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    onFilter: true, //本地过滤
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const data = [{
    id: 1,
    title: 'title1',
    tag: 'open',
  }, {
    id: 2,
    title: 'title2',
      tag: 'closed',
    }, {
      id: 3,
      title: 'inited',
      tag: 'inited',
    }] as Item[];
  return (
    <ProTable<Item>
      columns={columns}
      dataSource={data}
      actionRef={actionRef}
      cardBordered
      rowKey="id"
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log({ page }),
      }}
      onSubmit={(params) => {
        console.log(params);
      }}
    />
  );
};