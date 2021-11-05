import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'brokerType'})
export class BrokerTypePipe implements PipeTransform {
    transform(value: number) {
        switch(value) {
            case 0:
                return 'Exchange';
            case 1:
                return 'Margin';
            default:
                return '';
        }
    }
}