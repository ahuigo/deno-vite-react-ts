import ReactDOM from 'react-dom';
import { Input, Button } from 'antd';
// import { Provider, useSelector, useDispatch } from 'react-redux';


function Gmodal<T>({
  com,
  props,
  title,
  onUnmount,
  onCancel,
  onCancelText,
  onOk,
  onOkText,
}: {
  com: JSX.Element;
  props: T;
  title: string;
  onUnmount: Function;
  onCancel: Function;
  onCancelText: string;
  onOk: Function;
  onOkText: string;
}) {
  // const gmodalFunc = useSelector<any>(
  //   (state: any) => state.gstatus.gmodalFunc,
  // ) as Function;
  // const dispatch = useDispatch();
  const onUnmountWrap = () => {
    // dispatch({
    //   type: 'gstatus/setState',
    //   gmodalFunc: undefined,
    // });
    onUnmount();
  };

  // close
  const onCancelWrap = () => {
    onUnmountWrap();
    if (onCancel) onCancel(props);
  };
  // ok
  const onOkWrap = () => {
    // if (gmodalFunc) {
    //   if (!gmodalFunc()) {
    //     return;
    //   }
    // }
    onUnmountWrap();
    if (onOk) onOk(props);
  };
  return (
    <div>
      <div className="gmodal-close m-2" onClick={onCancelWrap}>X</div>
      <div className="gmodal-header">
        <h3>{title}</h3>
      </div>
      <div className="gmodal-body">
        {/* <Component {...props} onSubmit={onOkWrap} /> */}
        {com}
      </div>
      {(onOkText || onCancelText) && (
        <div className="gmodal-footer mform">
          <Button type="primary" onClick={onCancelWrap}>
            {onCancelText}
          </Button>
          {onOkText && (
            <Button type="primary" onClick={onOkWrap}>
              {onOkText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/*
import { getDvaApp } from 'umi';
const g_app = getDvaApp();
const store = g_app._store
*/
export function gmodal2({
  com,
  store,
  // Component,
  title = 'Modal',
  props = {},
  onCancel = () => { },
  onCancelText = 'Cancel',
  onOk = () => { },
  onOkText = 'Confirm',
  showFooter = true,
}: Partial<{
  // com: React.ReactElement;
  props: Record<string, any>;
  store: any;
  title: string;
  onCancel: Function;
  onCancelText: string;
  onOk: Function;
  onOkText: string;
  showFooter: boolean;
}> & {
  com: JSX.Element;
}) {
  const div = document.createElement('div');
  div.classList.add('gmodal');
  document.body.appendChild(div);

  //modal-content
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('gmodal-content');
  div.appendChild(modalDiv);
  // const state = g_app._store.getState();

  const onUnmount = () => {
    ReactDOM.unmountComponentAtNode(modalDiv);
    div.parentNode!.removeChild(div);
  };
  if (!showFooter) {
    onOkText = '';
    onCancelText = '';
  }
  const gprops = {
    com,
    props,
    title,
    onUnmount,
    onCancel,
    onCancelText,
    onOk,
    onOkText,
  };
  // todo: support Provider
  // const el = <Provider store={store}>
  //     <Gmodal {...gprops} />
  //   </Provider>,
  const el = <Gmodal {...gprops} />;
  ReactDOM.render(el, modalDiv);
  // ReactDOM.createPortal(com, modalDiv);
}