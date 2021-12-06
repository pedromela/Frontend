import { Candle } from "src/app/plot/candlechart/candle.model";
import { IndicatorLines } from "src/app/plot/tradingviewchart/indicator-lines.model";
import { TransactionDetail } from "src/app/transactions/transaction-detail-list/transaction-detail.model";

export interface BacktestData {
    positions: number;
    successes: number;
    currentProfit: number;
    maxDrawBack: number;
    activeTransactionsCount: number;
    amountGained: number;
    candles: Candle[];
    lines: IndicatorLines;
    lineNames: string[];
    activeTransactions: TransactionDetail[];
    historyTransactions: TransactionDetail[];
    state: number;
    timestamp: Date;
}