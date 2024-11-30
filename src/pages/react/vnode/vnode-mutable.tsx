import React from "react";

function Com({ onChange, title }: { onChange?: (v: any) => void, title?: string; }) {
  return <div className="flex flex-col">
    inner title:{title}
    <input onChange={(e) => onChange?.(e.target.value)} defaultValue={"1"} />
  </div>;
}

export default () => {
  const [value, setValue] = React.useState('');
  const child = <Com title="inner prop" />;
  const props = {
    ...(child as React.ReactElement).props,
    onChange: setValue,
  };
  const vnode = React.cloneElement(
    child as React.ReactElement,
    props,
  );
  return <div className="m-10">
    outer value:{value}
    {vnode}
  </div>;
};