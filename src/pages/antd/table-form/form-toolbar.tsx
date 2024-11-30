import { CloseCircleFilled, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Form, Input, Space, Tag } from 'antd';
import { useRef } from 'react';

// doc: https://procomponents.ant.design/en-US/components/table?tab=api&current=1&pageSize=5#search-form-customization
type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
  }
];

export default () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance | undefined>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      formRef={formRef}
      rowKey="id"
      toolBarRender={() => [
        <Button
          key="button" icon={<PlusOutlined />} onClick={() => {
            // actionRef.current?.reload();
            console.log(formRef.current?.getFieldsValue());
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};