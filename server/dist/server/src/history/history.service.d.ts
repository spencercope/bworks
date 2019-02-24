import { History, Story, Todo } from './models/history.model';
import { BaseService } from "../shared/base.service";
import { Model } from "mongoose";
import { StoryVm, TodoVm } from "./models/history-vm";
import { ItemService } from "../item/item.service";
import { EmailService } from "../shared/email/email.service";
import { DonorService } from "../donor/donor.service";
export declare class HistoryService extends BaseService<History> {
    private readonly _historyModel;
    private readonly itemService;
    private readonly donorService;
    private readonly emailService;
    private readonly _todoModel;
    private readonly _storyModel;
    constructor(_historyModel: Model<History>, itemService: ItemService, donorService: DonorService, emailService: EmailService);
    addTodoToBike(bikeId: string, isTransferred: boolean, vm: TodoVm): Promise<Todo>;
    addStoryToBike(bikeId: string, vm: StoryVm): Promise<Story>;
    addStoryToPc(pcId: string, vm: StoryVm): Promise<Story>;
    addTodoToPc(pcId: string, isTransferred: boolean, vm: TodoVm): Promise<Todo>;
    transferTodoToStory(todoId: string): Promise<Story>;
    private sendNewStoryEmail;
}
