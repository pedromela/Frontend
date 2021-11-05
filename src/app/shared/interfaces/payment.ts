export interface IPayment {
    txHash: string;
    clientAddress: string;
    receiverAddress: string;
    amount: number;
    package: string;
}