import { History } from './models/history.model';
import { BaseService } from "../shared/base.service";
import { Model } from "mongoose";
export declare class HistoryService extends BaseService<History> {
    private readonly _historyModel;
    private _todoModel;
    private _storyModel;
    constructor(_historyModel: Model<History>);
}
