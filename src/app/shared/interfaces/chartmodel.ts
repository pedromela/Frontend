import { Candle } from "src/app/plot/candlechart/candle.model";
import { IndicatorLines } from "src/app/plot/tradingviewchart/indicator-lines.model";

export interface BacktestData {
    positions: number;
    successes: number;
    currentProfit: number;
    maxDrawBack: number;
    activeTransactions: number;
    amountGained: number;
    candles: Candle[];
    lines: IndicatorLines;
    lineNames: string[];
    state: number;
    timestamp: Date;
}