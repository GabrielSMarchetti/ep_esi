import { IFactory } from "../interfaces/IFactory";
import { CreateOrUpdateReportHandler } from "../handlers/CreateOrUpdateReportHandler";
import { ReportRepository } from "../repositories/ReportRepository";

export class CreateOrUpdateReportHandlerFactory implements IFactory<CreateOrUpdateReportHandler> {

    constructor() {}

    public create(ReportRepository: ReportRepository): CreateOrUpdateReportHandler {
        return new CreateOrUpdateReportHandler(ReportRepository);
    }
}