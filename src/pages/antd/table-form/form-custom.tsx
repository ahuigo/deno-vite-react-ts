import { useRef } from 'react';
import { ConfigProvider } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Form, Input, Space, Tag } from 'antd';
export const waitTime = async (time: number = 100) => {
  await new Promise((resolve) => { setTimeout(resolve, time); });
};

type GithubIssueItem = {
  url: string;
  id: number;
  title: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
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
  const [form] = Form.useForm();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      form={{
        onValuesChange: (changedValues, allValues) => {
          console.log(changedValues); // values that have changed
        },
      }}
      searchFormRender={() => (
        <ConfigProvider theme={{
          components: {
            Form: {
              itemMarginBottom: 4,
            },
          }
        }}>
          <Form
            initialValues={{}}
            onFinish={async () => { }}
            form={form}
            labelCol={{ flex: '7rem', }}
          >
            <Form.Item
              name="domain"
              label="domain"
            >
              <Input />

            </Form.Item>
          </Form>
        </ConfigProvider>
      )}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        await waitTime(1000);
        return { data: [] } as {
          data: GithubIssueItem[];
        };
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