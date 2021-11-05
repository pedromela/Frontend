import { BotDetail } from "../bot-detail-list/bot-detail.model";
import { ScoreDetail } from "./score.model";

export class BotRanking {
    botParameters: BotDetail;
    score: ScoreDetail;
    rank: number;
}