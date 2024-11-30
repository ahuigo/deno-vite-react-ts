import { CloseCircleFilled, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef } from 'react';
import { Space, Button } from 'antd';

// doc: https://procomponents.ant.design/en-US/components/table?tab=api&current=1&pageSize=5#search-form-customization
export const waitTime = async (time: number = 100) => {
  await new Promise((resolve) => { setTimeout(resolve, time); });
};

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
    copyable: true,
    ellipsis: true, // 超长自动收缩
    filters: true, // 是否显示过滤器
    onFilter: true, //本地过滤
    tip: '标题过长会自动收缩',
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
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      rowSelection={{
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`Selected Row Keys: ${selectedRowKeys}`, 'Selected Rows: ', selectedRows);
        },
      }}
      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => {
        console.log(selectedRowKeys, selectedRows);
        return (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
            <span>
              <Button type="primary" onClick={() => { selectedRows.map(v => v); }}>指量交付</Button>
            </span>
          </Space>
        );
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a>批量删除</a>
            <a>导出数据</a>
          </Space>
        );
      }}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        await waitTime(300);
        const data = [
          {
            "id": 624748504,
            "title": "🐛 [BUG]yarn install命令 antd2.4.5会报错",
          },
          {
            "id": 624691229,
            "title": "🐛 [BUG]无法创建工程npm create umi",
          },
        ];

        return Promise.resolve({
          data: data, total: 20
        }) as Promise<{
          data: GithubIssueItem[]; total: number;
        }>;
      }}
      rowKey="id"
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log({ page }),
      }}
    />
  );
};