import React, { useState } from "react";

function Com({ name }: { name: string; }) {
  console.log("render:", name);
  return <div>{name}</div>;
}

const Child = React.memo(Com);
export default () => {
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  console.log('render');
  const memoizedValue = React.useMemo(() => console.log('execute useMemo once'), []);

  return <div>
    <div onClick={forceUpdate}>click me</div>
  </div>;
};