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

// 3. Counter.js: dispatch 事件处理
import { useSelector, useDispatch } from 'react-redux';
function Counter({ count, increment, decrement }: any) {
  return (
    <div>
      <Provider store={store}>

        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </Provider>

    </div>
  );
}

// 4. Conntect对Counter: store和dispatch action　二次封装定制（可选）
const mapStateToProps = (state: any) => ({
  count: state.count
});
const mapDispatchToProps = (dispatch: any) => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' })
});

import { connect } from 'react-redux';
const WrapCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default () => {
  return <div>
    <Provider store={store}>
      <WrapCounter />
    </Provider>;
  </div>;
};