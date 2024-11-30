# connected
graph.on("edge:connected", ({ isNew, edge }) => {
  if (isNew) {
    const source = edge.getSourceCell();
  }
});

# crud
可以在节点/边上监听：


    cell.on("added", ({ cell, index, options }) => {});
    cell.on("removed", ({ cell, index, options }) => {});
    cell.on("changed", ({ cell, options }) => {});

可以在graph

    graph.on("edge:added", ({ edge, index, options }) => {});
    graph.on("edge:removed", ({ edge, index, options }) => {});
    graph.on("edge:changed", ({ edge, options }) => {});

## change
当调用 setXxx(val, options) 和 removeXxx(options) 方法去改变节点/边的数据时，并且 options.silent 不为 true 时，都将触发对应的 change 事件，并触发节点/边重绘。例如：

    cell.setZIndex(2);
    cell.setZIndex(2, { silent: false });
    cell.setZIndex(2, { anyKey: "anyValue" });
    // 将触发 Cell 上的以下事件：
        change:*
        change:zIndex