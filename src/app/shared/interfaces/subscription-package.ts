export interface ISubscriptionPackage {
    name: string;
    maxAllowedBots: number;
    botCreation: boolean;
    strategyCreation: boolean;
    backtesting: boolean;
}