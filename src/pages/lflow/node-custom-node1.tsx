import LogicFlow from "@logicflow/core";
// import "@logicflow/core/dist/style/index.css";
import '@logicflow/core/es/index.css';
import { useEffect, useRef } from "react";
import { RectNode, RectNodeModel } from "@logicflow/core";
import { createElement } from "react";

const h = createElement;
class UserTaskModel extends RectNodeModel { }

class UserTaskView extends RectNode {
  // Customize node appearance
  getShape() {
    const { model, graphModel } = this.props;
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    return h("g", {}, [
      h("rect", {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height
      }),
      this.getLabelShape()
    ]);
  }
  private getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      "svg",
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: "0 0 1274 1024"
      },
      h("path", {
        fill: style.stroke,
        d:
          "M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z"
      })
    );
  }
}

const UserTaskNode = {
  type: "UserTaskNode",
  view: UserTaskView,
  model: UserTaskModel,
};
const graphData = {
  nodes: [
    {
      id: "node_id_1",
      type: "UserTaskNode",
      x: 100,
      y: 100,
      text: { x: 100, y: 100, value: "节点1" },
      properties: {},
    },
    {
      id: "node_id_2",
      type: "circle",
      x: 200,
      y: 300,
      text: { x: 300, y: 300, value: "节点2" },
      properties: {},
    },
  ],
  edges: [
    {
      id: "edge_id",
      type: "polyline",
      sourceNodeId: "node_id_1",
      targetNodeId: "node_id_2",
      text: { x: 139, y: 200, value: "连线28" },
      // startPoint: { x: 100, y: 140 },
      // endPoint: { x: 200, y: 250 },
      // pointsList: [
      //   { x: 100, y: 140 },
      //   { x: 100, y: 200 },
      //   { x: 200, y: 200 },
      //   { x: 200, y: 250 },
      // ],
      properties: {},
    },
  ],
};
export default function App() {
  const refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lf = new LogicFlow({
      container: refContainer.current!,
      grid: true,
      width: 1000,
      height: 500,
    });
    lf.register(UserTaskNode);
    lf.render(graphData);
  }, []);
  return <div>
    <style>
      {`#container {
        width: 1000px;
      height: 500px;`
      }
    </style>
    <div className="App" ref={refContainer}></div>;
  </div>;
}
