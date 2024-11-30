# canvas resize/scale
graph.on("scale", ({ sx, sy, ox, oy }) => {});
    缩放画布时触发，sx 和 sy 是缩放比例，ox 和 oy 是缩放中心。
graph.on("resize", ({ width, height }) => {});
graph.on("translate", ({ tx, ty }) => {});
    平移画布时触发，tx 和 ty 分别是 X 和 Y 轴的偏移量。

# mount
节点在被挂载到画布时以及从画布上卸载时会分别触发单独的事件。

    graph.on("view:mounted", ({ view }) => {});
    graph.on("view:unmounted", ({ view }) => {})