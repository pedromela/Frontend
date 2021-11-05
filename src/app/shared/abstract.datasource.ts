import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

export abstract class AbstractDataSource<T> {
    protected dataSubject = new BehaviorSubject<T[]>([]);
    protected lengthSubject = new BehaviorSubject<number>(0);
    public length$ = this.lengthSubject.asObservable();

    constructor() { }

    abstract load(

    )

    protected connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
    }

    protected disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.lengthSubject.complete();
    }

    public getData(): T[] {
        return this.dataSubject.getValue();
    }

    public getDataLength(): number {
        return this.lengthSubject.getValue();
    }
} 