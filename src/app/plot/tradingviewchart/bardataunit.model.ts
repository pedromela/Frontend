import { Time, Nominal } from "lightweight-charts";
import { Candle } from "../candlechart/candle.model";

export class BarDataUnit {
	time: Time;
	open: number;
	high: number;
	low: number;
    close: number;
    constructor(public candle : Candle ) {
        var date = new Date(candle.timestamp).getTime()/1000;
        type Timestamp = Nominal<number, "UTCTimestamp">;
        let t : Timestamp = date as Timestamp;
        this.time = t;
        this.open = candle.open;
        this.high = candle.max;
        this.low = candle.min;
        this.close = candle.close;
    }
}