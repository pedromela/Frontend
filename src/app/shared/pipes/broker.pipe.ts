import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'broker'})
export class BrokerPipe implements PipeTransform {
    transform(value: number) {
        switch(value) {
            case 0:
                return 'HitBTC';
            case 1:
                return 'OANDA';
            default:
                return '';
        }
    }
}