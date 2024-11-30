// 1. createRoot: 需要手动把context 传给root
// 2. portal: 需要占位符<Modal><Com/></Modal>
// 3. useSnapshot:
import React, { useState, useEffect, useContext } from 'react';
import ReactDOM, { Root } from "react-dom/client";

/**
 * createRoot 不能隐式的把当前context 传送出去
   createPortal 隐式的把当前context 传送出去(一个点位符)
 */
interface AppContextStore {
  count: number;
}
const AppContext = React.createContext<AppContextStore>({ count: 10 });


let modalRoot: Root;
function Modal(children: React.ReactElement) {
  const modalDiv = document.getElementById('modal-root')!;
  if (!modalRoot) {
    modalRoot = ReactDOM.createRoot(modalDiv);
  }
  // return createPortal(children, el);
  // const dom = <ThemeContext.Provider value={{ count: 2 }}>{children}</ThemeContext.Provider>;
  const dom = children;
  modalRoot.render(dom);
}

function Child() {
  const { count } = useContext(AppContext);
  return (
    <fieldset>
      <legend>modal child</legend>
      <p>count: {count}</p>
      <AppContext.Consumer>{({ count }) => <div>{count}</div>}</AppContext.Consumer>
    </fieldset>
  );
}

// Page
function Page() {
  const { count } = useContext(AppContext); // 类似useState(ThemeContext.value)
  useEffect(() => {
    const dom = <AppContext.Provider value={{ count }}><Child /></AppContext.Provider>;
    Modal(dom);
  }, [count]);
  return (
    <fieldset >
      <legend>parent</legend>
      <p>count: {count}</p>
    </fieldset>
  );
}

function App() {
  /** 
   * provider 才负责更新context的值(setCount触发)
   * 
   */
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => setCount(1), 500);
  }, []);
  return (
    <AppContext.Provider value={{ count }}>
      <div>
        <div><button onClick={() => setCount(count + 1)}>incr</button></div>
      </div>
      <Page />
    </AppContext.Provider>
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