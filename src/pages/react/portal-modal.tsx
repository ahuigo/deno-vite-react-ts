// refer: https://blog.logrocket.com/learn-react-portals-example/#react-portals
import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ children }: { children: React.ReactNode; }) {
  const el = React.useMemo(() => {
    const modal = document.createElement('div');
    document.body.appendChild(modal);
    return modal;
  }, []) as HTMLDivElement;

  useEffect(() => {
    return () => {
      // ReactDOM.unmountComponentAtNode(el);
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
};


export default function App() {
  //render our portal within the element which has the class of 'me'
  return (
    <div className="App">
      <Modal>Hi, world2</Modal>
    </div>
  );
}