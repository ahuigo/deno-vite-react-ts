import { CloseCircleFilled, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Select, TreeSelect } from 'antd';
import { useRef } from 'react';

type IssueItem = {
  title: string;
};

const columns: ProColumns<IssueItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    tip: '标题过长会自动收缩',
    renderFormItem: (_, { defaultRender, record }) => {
      return defaultRender(_);
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
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
          title: '测试title',
        },
        onValuesChange: (changedValues, allValues) => {
          console.log(changedValues);
        },
      }}
      dateFormatter="string"
    />
  );
};