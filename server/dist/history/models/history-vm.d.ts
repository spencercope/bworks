import { BaseVm } from "../../shared/base-vm";
import { History, HistoryType, Story, Todo } from './history.model';
import { Status } from "../../item/models/item.model";
export declare class HistoryVm extends BaseVm<History> {
    status: Status;
    itemId?: string;
    person?: string;
    note?: string;
    historyType?: HistoryType;
    constructor(model: History);
    getViewModel(model: History): void;
}
export declare class TodoVm extends HistoryVm {
    isTransferred?: boolean;
    constructor(model: Todo);
    getViewModel(model: Todo): void;
}
export declare class StoryVm extends HistoryVm {
    transferredFromTodo: boolean;
    constructor(model: Story);
    getViewModel(model: Story): void;
}
