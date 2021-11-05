import { ISubscriptionPackage } from "../interfaces/subscription-package";

export class SubscriptionPackage {
    name: string;
    maxAllowedBots: number;
    botCreation: boolean;
    strategyCreation: boolean;
    backtesting: boolean;

    constructor(subscriptionPackage: ISubscriptionPackage) {
        this.name = subscriptionPackage ? subscriptionPackage.name : 'None';
        this.maxAllowedBots = subscriptionPackage ? subscriptionPackage.maxAllowedBots : 0;
        this.botCreation = subscriptionPackage ? subscriptionPackage.botCreation : false;
        this.strategyCreation = subscriptionPackage ? subscriptionPackage.strategyCreation : false;
        this.backtesting = subscriptionPackage ? subscriptionPackage.backtesting : false;
    }

    isAuthorized(permission: string): boolean {
        const keys = Object.keys(this);
        const key = keys.find((key) => key === permission);
        const value = this[key];
        if (value === true) {
            return true;
        }
        return false;
    }
}