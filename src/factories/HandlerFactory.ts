import { IFactory } from "../interfaces/IFactory";

export class HandlerFactory<R> implements IFactory<any> {
    private repository: R;

    constructor(repository: R) {
        this.repository = repository;
    }

    public create<T>(handlerConstructor: new (repository: R) => T): T {
        return new handlerConstructor(this.repository);
    }
}