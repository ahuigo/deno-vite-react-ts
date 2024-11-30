// 假设我们有一个全局对象用于存储当前组件的上下文
let currentComponentContext = null;

function Component() {
  // 在组件开始执行时，我们将当前组件的上下文设置为全局的 currentComponentContext
  currentComponentContext = this;  // 'this' refers to the context of the current component

  const [state, dispatch] = useReducer(reducerFunction, initialState);

  // 组件执行结束，重置 currentComponentContext
  currentComponentContext = null;

  // other codes...
}

function useReducer(reducer, initialState) {
  const currentState = currentComponentContext.state;
  const dispatch = action => {
    // 当 dispatch 被调用，我们可以通过 currentComponentContext 找到对应的组件，并更新其状态
    const newState = reducer(currentState, action);
    currentComponentContext.state = newState;

    // 标记这个组件需要更新
    currentComponentContext.needsUpdate = true;
  };

  return [currentState, dispatch];
}