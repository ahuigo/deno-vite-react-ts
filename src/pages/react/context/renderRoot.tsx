import ReactDOM, { Root } from "react-dom/client";
const _sidebarMeta = {} as {
  dom: HTMLDivElement;
  root: Root;
};
export function renderSidebar(children: React.ReactElement, id = 'sidebar-root-demo') {
  let sidebarDiv = document.getElementById(id)! as HTMLDivElement;
  if (!sidebarDiv) {
    sidebarDiv = document.createElement('div');
    sidebarDiv.id = id;
    document.body.appendChild(sidebarDiv);
  }

  let sidebarRoot: Root;
  if (_sidebarMeta.dom === sidebarDiv) {
    sidebarRoot = _sidebarMeta.root;
  } else {
    sidebarRoot = ReactDOM.createRoot(sidebarDiv);
    _sidebarMeta.root = sidebarRoot;
    _sidebarMeta.dom = sidebarDiv;

  }
  sidebarRoot.render(children);
}