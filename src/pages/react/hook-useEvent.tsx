import { useState, useRef, useCallback, useLayoutEffect } from 'react';

// ahooks中的类似实现：useMemoizedFn. 但是更新时机是：fnRef.current = useMemo(() => fn, [fn]);
function useEvent(callback: Function) {
  const callbackRef = useRef(callback);
  // 视图渲染完成后更新`handlerRef.current`指向
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });
  return useCallback((...args: any[]) => {
    callbackRef.current(...args);
  }, []);
}

export default () => {
  const [msg1, setMsg1] = useState('1');
  const [msg2, setMsg2] = useState('');

  const onClick = useEvent(() => {
    setMsg2(msg1);// 每次渲染onClick不仅指向同一引用, 但与useCallback 不同, 内部current会变化. 不用担心msg 闭包问题. 
  });


  return <div>
    <div>received msg1: {msg1}</div>
    <div>received msg2: {msg2}</div>
    <button onClick={() => setMsg1("setMsg1")}>1.setMsg1</button>
    <button onClick={onClick}>2.setMsg2</button>
  </div>;

};