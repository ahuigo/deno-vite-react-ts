import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";

// Modal: AppendChild to el, el to modalRoot
function Modal({
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

// 捕获Portal:Modal的事件
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>
      <p>Number of clicks: {count}</p>
      <p>
        Open up the browser DevTools to observe that:
        the button is not a child of the div with the onClick handler.
      </p>
      <Modal>
        <Child />
      </Modal>
    </div>
  );
}

function Child() {
  // 这个按钮的点击事件会冒泡到父元素
  return (
    <div className="child">
      <button>Click</button>
    </div>
  );
}

export default () => {
  useEffect(() => {
    const appRoot = document.getElementById('app-root')!;
    // ReactDOM.render(<Parent />, appRoot);
    ReactDOM.createRoot(appRoot).render(<Parent />);
  }, []);
  return (<div>
    <div id="app-root" className="border border-solid"></div>
    <div id="modal-root"></div>
  </div>);
};