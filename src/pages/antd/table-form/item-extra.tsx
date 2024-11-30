import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input, Space, Tag } from 'antd';
export const waitTime = async (time: number = 100) => {
  await new Promise((resolve) => { setTimeout(resolve, time); });
};

type IssueItem = {
  id: number;
  title: string;
};

const columns: ProColumns<IssueItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '扩展项',
    key: 'extra-field',
    hideInTable: true,
    dataIndex: 'extra-field',
    renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
      const stateType = form.getFieldValue('state');
      if (stateType === 30) {
        return null;
      }
      return <Input {...rest} />;
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
      form={{
        onValuesChange: (changedValues, allValues) => {
          console.log(changedValues); // values that have changed
        },
      }}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        await waitTime(1000);
        const data = [
          {
            "id": 624748504,
            "title": "命令 会报错",
            "state": "20",
          },
        ];
        return Promise.resolve({
          data: data as IssueItem[],
        })
      }}
      editable={{ type: 'multiple', }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};