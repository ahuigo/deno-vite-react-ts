import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { Form, Input } from 'antd';

export default () => {
  const [form] = Form.useForm();

  return <ProForm form={form}
    syncToUrl={true}
    onFinish={async (values) => {
      console.log(values);
    }}
    onInit={(values) => {
      console.log(values);
    }}

  >
    <ProFormSelect
      name="username"
      label="username"
      options={[
        { value: 'frame', label: 'Frame' },
        { value: 'frame2', label: 'Frame2' },
      ]}
    />
  </ProForm>;
};