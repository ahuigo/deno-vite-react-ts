import type { ActionType, FormInstance, ProColumns } from '@ant-design/pro-components';
import { ProTable, } from '@ant-design/pro-components';
import { Button, } from 'antd';
import { useRef } from 'react';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type dataItem = {
  id: number;
  uname: string;
};

const columns: ProColumns<dataItem>[] = [
  {
    title: 'uname',
    dataIndex: 'uname',
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance | undefined>();

  return (
    <ProTable<dataItem>
      // style={{ width: '100%' }}
      className='w-full'
      columns={columns}
      cardBordered
      editable={{ type: 'multiple', }}
      rowKey="id"
      dateFormatter="string"
      headerTitle="高级表格"
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        const url = new URL('https://proapi.azurewebsites.net/github/issues');
        for (const [k, v] of Object.entries(params)) {
          url.searchParams.append(k, String(v));//page=params.current/pageSize/...
        }
        return { data: [{ id: 1, uname: "a" }], total: 100 };
      }}
      actionRef={actionRef}
      formRef={formRef}
      // onChange
      form={{
        onValuesChange: (changedValues, allValues) => {
          console.log(changedValues); // values that have changed
        },
      }}
      // search提交按钮
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => {
          return [
            // ...dom, // 原始的重复dom: Each child in a list should have a unique "key" prop.
            <Button key="1" onClick={() => actionRef.current?.reload()}> Reload </Button>,
            <Button key="2" onClick={() => formRef?.current?.submit()}> Submit </Button>,
            <Button key="3" onClick={() => {
              console.log(formRef.current?.getFieldsValue());
            }}> Show</Button>,
          ];
        },
      }}
    />
  );
};