import {Injectable} from '@nestjs/common';
import {History, Story, storySchema, Todo, todoSchema} from './models/history.model';
import {BaseService} from "../shared/base.service";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";

@Injectable()
export class HistoryService extends BaseService<History> {
    private _todoModel: Model<Todo>;
    private _storyModel: Model<Story>;

    constructor(@InjectModel('History') private readonly _historyModel: Model<History>) {
        super();
        this._model = _historyModel;
        this._todoModel = _historyModel.discriminator<Todo>('Todo', todoSchema);
        this._storyModel = _historyModel.discriminator<Story>('Story', storySchema);
    }
}
