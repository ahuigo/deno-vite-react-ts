import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from "react-dom/client";

/**
 * root 与 portal 的区别:
   - createRoot 不能隐式的把当前context 传送出去
   - createPortal 隐式的把当前context 传送出去(一个点位符)
本例中, createRoot 不能隐式的把当前context 传送给child, 计数不会变（上下文lost丢失）
 */
const ThemeContext = React.createContext({ count: 10 });

function Modal(children: React.ReactElement) {
  const modalRoot = document.getElementById('modal-root')!;
  // return createPortal(children, el);
  // const dom = <ThemeContext.Provider value={{ count: 2 }}>{children}</ThemeContext.Provider>;
  const dom = children;
  ReactDOM.createRoot(modalRoot).render(dom);
}

function Child() {
  const { count } = useContext(ThemeContext); // 只能拿到原始context的值. ParentContext 的值拿不到
  return (
    <fieldset>
      <legend>modal child</legend>
      <p>count: {count}</p>
      <ThemeContext.Consumer>{({ count }) => <div>{count}</div>}</ThemeContext.Consumer>
    </fieldset>
  );
}

// Page
function Page() {
  const { count } = useContext(ThemeContext); // 类似useState(ThemeContext.value)
  useEffect(() => {
    setTimeout(() => {
      Modal(<Child />);
    }, 1000);
  }, []);
  return (
    <fieldset >
      <legend>parent</legend>
      <p>count: {count}</p>
    </fieldset>
  );
}


function App() {
  /** 
   * provider 只负责更新副本context的值(setCount触发)
   * 
   */
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => setCount(1), 500);
  }, []);
  return (
    <ThemeContext.Provider value={{ count }}>
      <div>
        <div><button onClick={() => setCount(count + 1)}>incr</button></div>
      </div>
      <Page />
    </ThemeContext.Provider>
  );
};


export default () => {
  useEffect(() => {
    const appRoot = document.getElementById('app-root')!;
    // ReactDOM.render(<Page />, appRoot);
    ReactDOM.createRoot(appRoot).render(<App />);
  }, []);
  return (<div>
    <div id="app-root" ></div>
    <div id="modal-root"></div>
  </div>);
};