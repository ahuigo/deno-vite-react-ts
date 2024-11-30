import React, { useState, useRef } from 'react';
import { TreeSelect } from 'antd';
export const CustomTreeSelect = ({ treeData, ...props }: Record<string, any>) => {
  const [selectedValues, setValues] = useState([] as string[]);
  const ref = useRef<HTMLSelectElement>(null);

  const handleChange = (value: any) => {
    setValues(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (<TreeSelect
    {...props}
    multiple
    // @ts-ignore
    ref={ref}
    showSearch
    treeDefaultExpandAll
    onSearch={(value: string) => {
      if (value && value.endsWith(",")) {
        const v = value.replace(/,+$/, '');
        handleChange([...selectedValues, v]);
        ref?.current?.focus();
        ref?.current?.blur();
      }
    }}
    treeData={treeData}
    style={{ width: '100%', marginTop: 8 }}
    value={selectedValues}
    open={true}
    onChange={handleChange}
  />);
};

export default () => {
  return <CustomTreeSelect treeData={[{ title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }]} />;
};