import { ProTable, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { Select } from 'antd';

export default () => {
  return <ProFormSelect
    name="username"
    label="username"
    width={150}
    options={[
      { value: 'frame', label: 'Frame' },
      { value: 'frame2', label: 'Frame2' },
    ]}
    fieldProps={{
      showSearch: true,
      // mode: 'multiple',
      mode: 'tags',
    }}
  />;
};