export interface IFactory<T> {
    create(handlerConstructor: new (repository: any) => T): T;
}