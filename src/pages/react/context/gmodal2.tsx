import { Button } from "antd";
import ReactDOM, { Root } from "react-dom/client";
import styles from './gmodal2.less';

let modalRoot: Root | null;

function unmount() {
  if (modalRoot) {
    modalRoot.unmount();
  }
  modalRoot = null;
}

export function gmodal2(children: React.ReactElement, id = 'modal2-root') {
  let modalDiv = document.getElementById(id)!;
  if (!modalDiv) {
    modalDiv = document.createElement('div');
    modalDiv.id = id;
    document.body.appendChild(modalDiv);
  }

  if (!modalRoot) {
    modalRoot = ReactDOM.createRoot(modalDiv);
  }
  // return createPortal(children, el);
  // const dom = <ThemeContext.Provider value={{ count: 2 }}>{children}</ThemeContext.Provider>;

  const dom = (
    <div className="gmodalMask">
      <div className="gmodal">
        {children}
        <Button type="primary" onClick={() => unmount()}>Close</Button>
      </div>
    </div>);
  modalRoot.render(dom);
}