import React, { useState } from "react";

function Com({ name }: { name: string; }) {
  console.log("render:", name);
  return <div>{name}</div>;
}

const Child = React.memo(Com, (prevProps, nextProps) => {
  console.log({ prevProps, nextProps });
  return prevProps.name == nextProps.name;
});

export default () => {
  const [count, incr2] = useState(0);
  return <div>
    <div onClick={() => incr2(count + 1)}>click me:{count}</div>
    <Child name={"child(memo)"} />
    <Com name={"child"} />
  </div>;
};