import { Graph } from '@antv/x6';
export function clearGraph(container: HTMLDivElement | null, graph: Graph) {
  if (container)
    container.innerHTML = '';
  graph?.dispose();
}