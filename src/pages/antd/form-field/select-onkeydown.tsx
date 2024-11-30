import { ProTable, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { Spin, Form, Input } from 'antd';
import { add } from 'lodash';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { value: 'frame', label: 'Frame' },
    { value: 'frame2', label: 'Frame2' },
  ]);
  function addOption(v: string) {
    if (options.find((o) => o.value === v)) {
      return;
    }
    setOptions([...options, { value: v, label: v }]);
  }
  return <ProFormSelect
    name="username"
    label="username"
    width={150}
    options={options}
    fieldProps={{
      mode: 'multiple',
      showSearch: true,
      placeholder: '*模糊wildcard搜索*',
      optionFilterProp: 'label', // This is needed to make the search work with label
      notFoundContent: loading ? <Spin size="small" /> : null, // Add this line
      onSearch: (v: string) => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
        console.log(v);
      },
      onInputKeyDown: (e) => {
        const target = e.target as HTMLInputElement;
        console.log({ 'k': e.key, v: target.value });
        if (e.key === 'Enter') {
          e.stopPropagation(); // <-- this is the trick
          addOption(e.target.value);
        }
      }
    }}
  />;
};