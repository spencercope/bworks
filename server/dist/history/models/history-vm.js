"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_vm_1 = require("../../shared/base-vm");
class HistoryVm extends base_vm_1.BaseVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        this.status = model.status;
        this.itemId = model.itemId;
        this.person = model.person;
        this.note = model.note;
        this.type = model.type;
    }
}
exports.HistoryVm = HistoryVm;
class TodoVm extends HistoryVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.isTransferred = model.isTransferred;
    }
}
exports.TodoVm = TodoVm;
class StoryVm extends HistoryVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.transferredFromTodo = model.transferredFromTodo;
    }
}
exports.StoryVm = StoryVm;
//# sourceMappingURL=history-vm.js.map