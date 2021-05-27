import { BasicCandleOptionProps, CandleColorEnum, DrawCandleChartOptions } from '@/type/chart';

const { PI, min, abs } = Math;

const BASE_RADIAN = PI / 180;

/**
 * adjustedY 세로y 위치 조정 함수, 구간 최저가 기준
 * @param base 구간 최저가 또는 최하단 라인
 * @param hRatio 높이 비율
 * @param origins ex. `[open, close, low, high]`
 * @returns rest 순서대로 조정된 높이값 배열
 */

const adjustY = (base: number) => (hRatio: number) => (origins: number[]): number[] => origins.map((n) => (-n + base) * hRatio);

/**
 * setColor
 * @todo 나중에 사용자가 customizing할 수 잇도록?
 * @param o open
 * @param c close
 * @returns colorString
 */
const setColor = (o: number, c: number) => {
  if (o === c) return CandleColorEnum.same;
  if (o > c) return CandleColorEnum.down;
  if (o < c) return CandleColorEnum.up;
};

/**
 * setPricePartition
 * 좌상단 (0,0)에서 시작
 * @param ctx
 * @param lowest 구간 최저가
 * @param highest 구간 최고가
 * @param canvasWidth 캔버스 영역
 */
const setPricePartition = (
  ctx: CanvasRenderingContext2D,
  hRatio?: number,
  partitionNum?: number,
  hRange?: number,
  canvasWidth?: number,
  canvasHeight?: number,
  lowest?: number,
  padding?: number,
) => {
  ctx.save();
  const ratio = hRange / partitionNum;
  ctx.lineWidth = 1;
  ctx.strokeStyle = CandleColorEnum.partition;
  ctx.fillStyle = CandleColorEnum.grey900;
  ctx.font = `italic 20px sans-serif`;
  ctx.textAlign = 'right';

  // const partitionYs = adjustY(lowest - padding)(hRatio)([...Array(partitionNum+1).keys()].map(n => -(n*ratio)*))

  for (let n = partitionNum + 1; n--; ) {
    /** 구분선 */
    const curH = -(n * ratio) * hRatio;
    ctx.beginPath();
    ctx.moveTo(0, curH);
    ctx.lineTo(-canvasWidth, curH);
    ctx.closePath();
    ctx.stroke();

    /** 구분선 가격 */
    ctx.fillText((lowest - curH / hRatio).toFixed(2).toString(), 0, curH);
  }
  ctx.restore();
};

/**
 * 기본 캔들차트 생성
 *
 * @param BasicCandleOptionProps
 *
 * @todo
 * 기능별 함수 분리
 */
const basicCandle = ({
  ctx,
  idx,
  high,
  low,
  open,
  close,
  bodyWidth,
  timestamp,
  highest,
  lowest,
  canvasWidth,
  canvasHeight,
  hRatio,
  padding,
}: BasicCandleOptionProps) => {
  /** @description  기본 설정 */
  const color = setColor(open, close);
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `20px sans-serif`;

  /**
   * @todo
   * 비율 맞추기
   */

  /** @description text 위치 조정 */
  const dateHeight = 0,
    // monthHeight = 18,
    textBase = -2,
    textHRatio = 1;
  const adjustTextY = (origins: number[]): number[] => adjustY(textBase)(textHRatio)(origins);
  const [adjDayH] = adjustTextY([dateHeight]);

  /** @description 캔들 위치 조정 */
  const adjustCandleY = (origins: number[]): number[] => adjustY(lowest)(/** hRatio */ 1)(origins);
  /** @constant adjX adjusted X, 오른쪽부터 최신순 */
  const adjX = -idx * bodyWidth - 30;
  const [adjOpen, adjClose, adjLow, adjHigh] = adjustCandleY([open, close, low, high]);
  const bodyHeight = adjClose - adjOpen;
  ctx.save();

  /** @description 일자구분선 */

  const dateX = adjX + bodyWidth;

  if (idx % 5 === 0) {
    ctx.lineWidth = 1;
    if (idx % 10 === 0) ctx.lineWidth = 5;
    ctx.strokeStyle = CandleColorEnum.partition;
    ctx.beginPath();
    ctx.moveTo(dateX, 0);
    ctx.lineTo(dateX, -canvasHeight);
    ctx.closePath();
    ctx.stroke();
  }

  /** @description 일자구분선 월/일 표시 */
  ctx.fillStyle = CandleColorEnum.grey900;
  const [curDate, curMonth] = [timestamp.getDate(), timestamp.getMonth()];
  if (idx % 10 === 0) ctx.fillText(`${(curMonth + 1).toString()} / ${curDate.toString()}`, dateX, adjDayH);
  ctx.restore();
  ctx.save();

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.scale(1, hRatio);

  /** @description 캔들 몸통 */
  const bodyWidthRatio = 0.8;
  ctx.fillRect(adjX, adjOpen, bodyWidth * bodyWidthRatio, bodyHeight);

  /** @description 캔들 꼬리 */
  const lineCenter = adjX + (bodyWidth * bodyWidthRatio) / 2;
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(lineCenter, adjLow);
  ctx.lineTo(lineCenter, adjHigh);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
};

/**
 * drawBasicCandleChart
 * @param DrawCandleChartOptions
 * @returns base64 문자열
 */
export const drawBasicCandleChart = ({ ctx, results, resultsCount, limit }: DrawCandleChartOptions): string => {
  const timerLabel = `draw Chart`;
  console.warn(timerLabel);
  console.time(timerLabel);

  /**
   * @todo
   * 캔버스 dpi 강제로 높이기
   * 변수화 필요..
   */
  const cvs = ctx.canvas;
  const padding = 10;
  const canvasWidth = (cvs.width = window.screenX * 3);
  const canvasHeight = (cvs.height = 900);
  cvs.style.width = `${canvasWidth / 3}px`;
  cvs.style.height = `${canvasHeight / 3}px`;
  cvs.style.padding = `${padding}px`;
  cvs.style.overflow = 'auto';
  ctx.textBaseline = `top`;

  /** @constant numToShow 현재 화면에 보여지는 캔들 갯수  */
  const numToShow = min(resultsCount, limit);
  const showingData = results.slice(0, numToShow + 1);

  let highest = 0,
    lowest = Number.MAX_SAFE_INTEGER;

  for (const { h, l } of showingData) {
    if (highest < h) highest = h;
    if (lowest > l) lowest = l;
  }

  /** @constant bodyWidth 캔들바디 너비 */
  const bodyWidth = canvasWidth / numToShow;

  const hRange = highest - lowest;

  /** @constant 높이 비율, 전체 캔들데이터 최고가-최저가 구간으로 조정 */
  const hRatio = canvasHeight / hRange;

  /** @description 계산 편리 위해 우하단으로 이동 */
  ctx.translate(canvasWidth, canvasHeight);

  /**@todo 가격 구분선 */
  const partitionNum = 5;
  setPricePartition(ctx, hRatio, partitionNum, hRange, canvasWidth, canvasHeight, lowest, padding);

  let idx = 0;
  for (const day of showingData) {
    const { close, low, open, high, timestamp } = day;
    basicCandle({
      ctx,
      idx: idx++,
      open,
      close,
      low,
      high,
      bodyWidth,
      timestamp: new Date(timestamp),
      canvasWidth,
      canvasHeight,
      highest,
      lowest,
      hRatio,
      padding,
    });
  }

  console.timeEnd(timerLabel);

  /**@description base64 이미지로 저장해, caching */
  return ctx.canvas.toDataURL('image/png', 1);
};
