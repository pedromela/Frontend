import { Candle } from "./candle.model";

export class CandleChartUnit {
    x: any;
    y: any;
    fillColor?: string;
    strokeColor?: string;

    constructor(public candle : Candle) {
        
        this.x = candle.timestamp;
        this.y = [candle.open, candle.max, candle.min, candle.close];
    }

}