import { Provider } from 'react-redux';
import { createStore } from 'redux';

// 1. reducer.js: 生成state
const initialState = {
  count: 7
};
function counterReducer(state = initialState, action: { type: string; }) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// 2. store.js: store关联reducer
// We recommend using the `configureStore` method of the @reduxjs/toolkit package, which replaces createStore
const store = createStore(counterReducer);

// 3. Counter.js: dispatch 事件处理. 有人喜欢用connect对dispatch+Counter进行封装
import { useSelector, useDispatch } from 'react-redux';
function Counter() {
  const count = useSelector((state: any) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
}


// 4. 关联store和组件dispatch action
function WrapCounter() {
  return (
    // Wrap your application in the Provider and pass in the Redux store
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default WrapCounter;

/**
 signoz-ui 的 redux 代码:
 1. reducer: store/reducers/metric.ts
  // reducer 生成数据：提供初始状态，以及根据action.type返回新的state
  
 2. action: store/actions/metrics/getAppOverview.ts
    // 由redux-thunk提供的dispatch，负责发送请求
    dispatch({
        type: GET_SERVICE_LIST_SUCCESS,
        payload: response.data,
      });
  3. page: src/pages/AppOverview/index.tsx
      // 由connec连接: connect(stateReducter, dispatch)(Com)
      import { connect, useSelector } from 'react-redux';

      // 自定义的dipatch action
      const mapDispatchToProps = (
        dispatch: ThunkDispatch<unknown, unknown, AppActions>,
      ): DispatchProps => ({
        getService: bindActionCreators(GetAppOverview, dispatch), //包装dispatch action
      });
      export default connect(null, mapDispatchToProps)(AppOverview); // 初始null是因为不需要转换state
  4. 关联store/reducers: src/index.tsx
    <Provider store={createStore('./store/reducers')} />
 * 
 */