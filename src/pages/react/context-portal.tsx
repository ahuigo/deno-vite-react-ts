import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";

const ThemeContext = React.createContext<{
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
}>({ count: 1, setCount: () => void 0 });


// Modal: AppendChild to el, el to modalRoot
function Portal({
  children
}: {
  children: React.ReactElement;
}) {
  const el = document.createElement('div');
  const modalRoot = document.getElementById('modal-root')!;
  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);
  return createPortal(children, el);
}

// Page
function Page() {
  const { count, setCount } = useContext(ThemeContext);
  return (
    <fieldset >
      <legend>parent</legend>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>incr</button>
    </fieldset>
  );
}

function Child() {
  // use useContext hook rather than nested Context.Consumer 
  const { count } = useContext(ThemeContext);
  return (
    <fieldset>
      <legend>modal child</legend>
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
  return (
    <ThemeContext.Provider value={{ count, setCount }}>
      <Page />
      <Portal>
        <Child />
      </Portal>
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