import { HistoryService } from "./history.service";
import { StoryVm, TodoVm } from "./models/history-vm";
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    addTodoToBike(bikeId: string, isTransferred: boolean, vm: TodoVm): Promise<TodoVm>;
    addStoryToBike(bikeId: string, vm: StoryVm): Promise<StoryVm>;
    addTodoToPc(pcId: string, isTransferred: boolean, vm: TodoVm): Promise<TodoVm>;
    addStoryToPc(pcId: string, vm: StoryVm): Promise<StoryVm>;
    transferTodo(todoId: string): Promise<StoryVm>;
}
