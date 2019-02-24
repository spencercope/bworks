import {BadRequestException, Injectable} from '@nestjs/common';
import {History, Story, storySchema, Todo, todoSchema} from './models/history.model';
import {BaseService} from "../shared/base.service";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {StoryVm, TodoVm} from "./models/history-vm";
import {Status} from "../item/models/item.model";
import {ItemService} from "../item/item.service";

@Injectable()
export class HistoryService extends BaseService<History> {
    private readonly _todoModel: Model<Todo>;
    private readonly _storyModel: Model<Story>;

    constructor(@InjectModel('History') private readonly _historyModel: Model<History>,
                private readonly itemService: ItemService) {
        super();
        this._model = _historyModel;
        this._todoModel = _historyModel.discriminator<Todo>('Todo', todoSchema);
        this._storyModel = _historyModel.discriminator<Story>('Story', storySchema);
    }

    async addTodoToBike(bikeId: string, isTransferred: boolean, vm: TodoVm): Promise<Todo> {
        const newTodo = new this._todoModel({itemId: bikeId, isTransferred});
        newTodo.person = vm.person;
        newTodo.status = Status.Progress;
        newTodo.note = vm.note;

        const todo = await this._todoModel.create(newTodo);

        const bike = await this.itemService.getBikeById(bikeId);
        bike.todos.push(todo);
        await bike.save();

        return todo;
    }

    async addStoryToBike(bikeId: string, vm: StoryVm): Promise<Story> {
        const newStory = new this._storyModel({itemId: bikeId});
        newStory.person = vm.person;
        newStory.status = vm.status;
        newStory.note = vm.note;

        const story = await this._storyModel.create(newStory);

        const bike = await this.itemService.getBikeById(bikeId);
        bike.stories.push(story);
        await bike.save();

        return story;
    }

    async addStoryToPc(pcId: string, vm: StoryVm): Promise<Story> {
        const newStory = new this._storyModel({itemId: pcId});
        newStory.person = vm.person;
        newStory.status = vm.status;
        newStory.note = vm.note;

        const story = await this._storyModel.create(newStory);

        const pc = await this.itemService.getPcById(pcId);
        pc.stories.push(story);
        await pc.save();

        return story;
    }

    async addTodoToPc(pcId: string, isTransferred: boolean, vm: TodoVm): Promise<Todo> {
        const newTodo = new this._todoModel({itemId: pcId, isTransferred});
        newTodo.person = vm.person;
        newTodo.status = Status.Progress;
        newTodo.note = vm.note;

        const todo = await this._todoModel.create(newTodo);

        const pc = await this.itemService.getPcById(pcId);
        pc.todos.push(todo);
        await pc.save();

        return todo;
    }

    async transferTodoToStory(todoId: string): Promise<Story> {
        const todo = await this._todoModel.findById(todoId);
        todo.isTransferred = true;

        const {note, person, itemId, createdAt, updatedAt} = todo;

        const newStory = new this._storyModel({note, person, itemId, createdAt, updatedAt});
        newStory.transferredFromTodo = true;
        const story = await this._storyModel.create(newStory);

        const item = await this.itemService.getItemById(itemId);

        if (!item) {
            throw new BadRequestException('Item does not have History');
        }

        item.todos = item.todos.filter(t => t.id !== todo.id);
        item.stories.push(story);
        await this.itemService.update(item.id, item);

        return story;
    }
}
