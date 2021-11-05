import { Time, Nominal } from "lightweight-charts";
import { Point } from "./point.model";

export class LineDataUnit {
	time: Time;
	value: number;
    constructor(public point : Point ) {
        var date = new Date(point.timestamp).getTime()/1000;
        type Timestamp = Nominal<number, "UTCTimestamp">;
        let t : Timestamp = date as Timestamp;
        this.time = t;
        this.value = point.value;
    }
}