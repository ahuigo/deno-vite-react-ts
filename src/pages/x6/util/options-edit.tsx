import { Checkbox, Card, Row, Col, Input, InputNumber, Slider } from 'antd';
// import type { CheckboxOptionType } from 'antd';
type CheckboxValueType = string | number;
type ObjectSlide = {
  type: 'slide';
  min: number,
  max: number,
  value?: number,
  defaultValue?: number,
  step?: number,
};
type ObjectCheckGroup = { options: Array<CheckboxValueType>, value?: CheckboxValueType[], type: 'checkgroup'; };
type ValType = boolean | string | number | ObjectSlide | ObjectCheckGroup;

export interface Props<T extends Object> {
  options: T;
  title?: React.ReactNode;
  // onChange: (res: Partial<T>) => void;
  onChange: (res: T) => void;
  className?: string;
}
export function OptionsEdit<T extends Object>({ title, options, onChange, className }: Props<T>) {
  const onOptionChanged = (type: string, flag: ValType) => {
    onChange({
      ...options,
      [type]: flag as T,
    });
  };

  return (
    <Card
      title={title}
      size="small"
      className={className}
      bordered={false}
      style={{ width: 240 }}
    >
      <Row align="middle">
        {Object.entries(options).map(([key, value]) => {
          return (<Col key={key} span={24}>
            {typeof value === 'boolean' ? '' : `${key}:`}<EditItem prop={key} value={value} onChange={onOptionChanged} />
          </Col>);
        })}
      </Row>
    </Card>
  );
}

interface EditItemProps {
  prop: string, value: ValType,
  onChange: (key: string, value: ValType) => void;
}

function EditItem({ prop: prop, value: defaultValue, onChange }: EditItemProps) {
  if (typeof defaultValue === 'boolean') {
    return <Checkbox defaultChecked={defaultValue} onChange={(e) => onChange(prop, e.target.checked)} >
      {prop}
    </Checkbox>;
  } else if (typeof defaultValue === 'number') {
    return <Input defaultValue={defaultValue} type="number" min={0} max={9999} onChange={(e) => {
      onChange(prop, +e.target.value);
    }} />;
  } else if (typeof defaultValue === 'object') {
    if (defaultValue.type === 'slide') {
      const sliderProps = {
        ...defaultValue,
        defaultValue: defaultValue.value ?? defaultValue.defaultValue,
      };
      delete sliderProps.value;
      return <Slider {...sliderProps} onChange={(val) => {
        defaultValue.value = +val;
        defaultValue.defaultValue = +val;
        onChange(prop, defaultValue);
      }} />;
    } else if (defaultValue.type === 'checkgroup') {
      return <Checkbox.Group defaultValue={defaultValue.value} options={defaultValue.options} onChange={(val) => {
        // @ts-ignore
        defaultValue.value = val;
        onChange(prop, defaultValue);
      }} />;
    }
  }
  return <>
    {prop}:<Input defaultValue={defaultValue as string}
      onChange={
        (e) => onChange(prop, e.target.value)
      }
    />
  </>;
}