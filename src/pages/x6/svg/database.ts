import { NumberExt } from '@antv/x6';
export default function genDataBasePath(t: string | number, refBBox: any) {
  const isPercentage = NumberExt.isPercentage(t);
  if (isPercentage) {
    // eslint-disable-next-line
    t = parseFloat(t as string) / 100;
  }

  const x = refBBox.x;
  const y = refBBox.y;
  const w = refBBox.width;
  const h = refBBox.height;

  // curve control point variables
  const rx = w / 2;
  const ry = isPercentage ? h * (t as number) : (t as number);

  const kappa = 0.551784;
  const cx = kappa * rx;
  const cy = kappa * ry;

  // shape variables
  const xLeft = x;
  const xCenter = x + w / 2;
  const xRight = x + w;

  const ySideTop = y + ry;
  const yCurveTop = ySideTop - ry;
  const ySideBottom = y + h - ry;
  const yCurveBottom = y + h;

  // return calculated shape
  const data = ['M', xLeft, ySideTop, 'L', xLeft, ySideBottom, 'C', x, ySideBottom + cy, xCenter - cx, yCurveBottom, xCenter, yCurveBottom, 'C', xCenter + cx, yCurveBottom, xRight, ySideBottom + cy, xRight, ySideBottom, 'L', xRight, ySideTop, 'C', xRight, ySideTop - cy, xCenter + cx, yCurveTop, xCenter, yCurveTop, 'C', xCenter - cx, yCurveTop, xLeft, ySideTop - cy, xLeft, ySideTop, 'Z',];
  return { d: data.join(' ') };
}