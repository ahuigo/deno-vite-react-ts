# context
createContext 创建 context 对象
1. Provider 实际上创建了一个局部上下文环境。只有那些作为这个 Provider 后代的组件才能访问到由该 Provider 提供的 context 值。
3. 用 Provider 修改其中的值， 
4. function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值。

https://jser.dev/react/2021/07/28/how-does-context-work/

    // Provider 修改值
    context._currentValue = xxx
    // useContext 读取值
    context._currentValue
# Privider 
Provider 会创建了一个局部context副本, nested Provider 怎么隔离context 呢？
答案是，nested conponent 之前，会共享一些栈, 通过`stack[index]` 获取当前栈state

    fiberStack[index]
    valueStack[index] 

Form 内调用FieldContext.Provider: 每次执行pushProvider时将context._currentValue更新为当前值：

    // 源码见：packages/react-reconciler/src/ReactFiberNewContext.js
    const prevContextValueStack = [];
    let prevContextValue = null;

    // <FieldContext.Provider value={newValue}>
    function pushProvider(context, newValue) {
    	prevContextValueStack.push(prevContextValue);
    
    	prevContextValue = context._currentValue;
    	context._currentValue = newValue; //将context 的值更新
    }

    function popProvider(context) {
    	context._currentValue = prevContextValue; //将context 的值更新
    	prevContextValue = prevContextValueStack.pop();
    }

