import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useState } from "react";

const initialValues = {
  data: {
    left: 'https://www.baidu.com',
    right: 'https://www.sina.com',
  }
};

export default () => {
  return (
    <div className="">
      <div>
        <ProForm<typeof initialValues>
          onFinish={async (values) => {
            const { data: { left, right } } = values;
            console.log({ left, right });
          }}
          initialValues={initialValues}
        >
          <ProFormText name={['data', 'left']} label="Left URL" />
          <ProFormText name={['data', 'right']} label="Right URL" />
        </ProForm>
      </div>
    </div>
  );
};
