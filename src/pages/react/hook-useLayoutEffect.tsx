import { useState, useEffect, useLayoutEffect, useRef } from 'react';

export default () => {
  const [count, setCount] = useState(1);
  const ref = useRef(null);

  /**
   * useEffect 是异步执行的，
        useEffect 是render, paint 后(before commit screen)
   * useLayoutEffect是同步执行的。和 componentDidMount 等价。
        useLayoutEffect 是render dom生成后，在browser paint之前(before commit screen)
      一般useEffect 就够用了. 两个都是在ref 生成后执行的。
   */
  if (1) {
    useEffect(() => {// 渲染后再更新就会闪一下
      console.log('ref:', !!ref.current);
      if (count === 0) {
        setCount(10 + Math.random() * 200);
      }
    }, [count]);
  } else {
    useLayoutEffect(() => {
      console.log('ref:', !!ref.current);
      if (count === 0) {
        setCount(10 + Math.random() * 200);
      }
    }, [count]);
  }

  return (
    <div onClick={() => setCount(0)} ref={ref}>click me:{count}</div>
  );

};