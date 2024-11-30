import { ProTable, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { type ProFormItemProps } from '@ant-design/pro-components';
import { Button, Form, Input } from 'antd';
import { type InputProps } from 'antd';
import type { FormItemProps } from 'antd';

function Input2(props: InputProps) {
  const { onChange } = props;
  return (
    <input
      placeholder={props.placeholder}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
}
const ProFormText2 = (props: ProFormItemProps) => {
  return (
    <ProForm.Item {...props}>
      <Input2 {...props.fieldProps} placeholder={props.placeholder as string} />
    </ProForm.Item>
  );
};
const FormText2 = (props: FormItemProps & { placeholder?: string; }) => {
  return (
    <Form.Item {...props}>
      <Input2 placeholder={props.placeholder} />
    </Form.Item>
  );
};
export default () => {
  const [form] = Form.useForm();
  return <ProForm
    layout="inline"
    submitter={{
      render: ({ submit }, dom) => <div>
        <Button onClick={submit} type="primary">创建</Button>
      </div>,
    }}
    form={form}
    onFinish={async (values) => console.log(values)}
  >
    <ProFormSelect
      name="username"
      label="username"
      options={[
        { value: 'frame', label: 'Frame' },
        { value: 'frame2', label: 'Frame2' },
      ]}
    />
    <ProFormText2 label="cname1" name="cname1" placeholder={"cvalue1"} />
    <FormText2 label="" name="cname2" placeholder={"cvalue2"} />
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: form.getFieldValue("username") === "111",
          message: "Please input your password!"
        }
      ]}
    >
      <Input placeholder={"password"} />
      {/* <ProFormText placeholder={""} /> */}
    </Form.Item>
  </ProForm>;
};