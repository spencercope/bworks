import {BaseVm} from "../../shared/base-vm";
import {History, HistoryType, Story, Todo} from './history.model';
import {Status} from "../../item/models/item.model";
import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger";

export class HistoryVm extends BaseVm<History> {
    @ApiModelProperty({type: String, enum: Status})
    status: Status;
    @ApiModelPropertyOptional()
    itemId?: string;
    @ApiModelPropertyOptional()
    person?: string;
    @ApiModelPropertyOptional()
    note?: string;
    @ApiModelPropertyOptional({type: String, enum: HistoryType})
    historyType?: HistoryType;

    constructor(model: History) {
        super(model);
    }

    getViewModel(model: History): void {
        this.status = model.status;
        this.itemId = model.itemId;
        this.person = model.person;
        this.note = model.note;
        this.historyType = model.historyType;
    }
}

export class TodoVm extends HistoryVm {
    @ApiModelPropertyOptional()
    isTransferred?: boolean;

    constructor(model: Todo) {
        super(model);
    }

    getViewModel(model: Todo): void {
        super.getViewModel(model);
        this.isTransferred = model.isTransferred;
    }
}

export class StoryVm extends HistoryVm {
    @ApiModelPropertyOptional()
    transferredFromTodo: boolean;

    constructor(model: Story) {
        super(model);
    }

    getViewModel(model: Story): void {
        super.getViewModel(model);
        this.transferredFromTodo = model.transferredFromTodo;
    }
}
