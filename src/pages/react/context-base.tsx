import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from "react-dom/client";

/**
1. Provider 实际上创建了一个局部上下文环境。只有那些作为这个 Provider 后代的组件才能访问到由该 Provider 提供的 context 值。
2. createContext 创建 context 对象，用 Provider 修改其中的值， function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值。
 */
const FieldContext = React.createContext({ count: 10 });

function Count() {
  const { count } = useContext(FieldContext);
  return (
    <fieldset>
      <legend>child</legend> <p>count: {count}</p>
      <FieldContext.Consumer>{({ count }) => <div>consumer:{count}</div>}</FieldContext.Consumer>
    </fieldset>
  );
}
function A() {
  return (
    <FieldContext.Provider value={{ count: 6 }}>
      <Count />
    </FieldContext.Provider>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => setCount(1), 500);
  }, []);
  return (
    <>
      <FieldContext.Provider value={{ count }}>
        <div className='border'>
          <Count />
        </div>
        <div className='border'>
          <A />
        </div>
      </FieldContext.Provider>
      <FieldContext.Provider value={{ count: 2 }}>
        <div className='border'>
          <Count />
        </div>
        <div className='border'>
          <A />
        </div>
      </FieldContext.Provider>

    </>
  );
};
