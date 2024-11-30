import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Input, } from 'antd';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  url: string;
  id: number;
  user: string;
};

export default () => {
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: 'User',
      initialValue: "",
      dataIndex: 'user',
    },
    {
      title: 'Password',
      key: 'passwd',
      hideInTable: true,
      dataIndex: 'passwd',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        const val = form.getFieldValue('user');
        // if (!val) { return null; } // 不联动
        if (val == "") { return null; } //联动
        return <Input {...rest} />; //ok
        return <ProFormText />; //ok
      },
    },
    {
      key: 'passwd2',
      hideInTable: true,
      dataIndex: 'passwd2',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <ProFormDependency name={['user']}>
            {({ user }) => {
              if (!user) { return null; } // 正常联动
              return (
                <ProFormSelect
                  options={[{ value: "111", label: '111', },
                  ]}
                  name="passwd2"
                  label={"passwd2"}
                />
              );
            }}
          </ProFormDependency>
        );
      },
    },
  ];
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      form={{
        onValuesChange: (changedValues, allValues) => {
          console.log(changedValues); // values that have changed
        },
      }}
      request={async (params, sort, filter) => {
        console.log("reqeust", params, sort, filter);
        return {};
      }}
    />
  );
};