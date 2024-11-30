import { ProTable, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { Spin, Form, Input } from 'antd';
import { useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  return <ProForm form={form} >
    <ProFormSelect
      name="username"
      label="username"
      width={150}
      options={[
        { value: 'frame', label: 'Frame' },
        { value: 'frame2', label: 'Frame2' },
      ]}
      fieldProps={{
        showSearch: true,
        placeholder: '*模糊wildcard搜索*',
        optionFilterProp: 'label', // This is needed to make the search work with label
        notFoundContent: loading ? <Spin size="small" /> : null, // Add this line
        onSearch: (v: string) => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
          console.log(v);
        }
      }}
    />
  </ProForm>;
};