"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_vm_1 = require("../../shared/base-vm");
const file_reference_vm_1 = require("file-reference/models/file-reference-vm");
const history_vm_1 = require("../../history/models/history-vm");
class ItemVm extends base_vm_1.BaseVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        this.donorId = model.donorId;
        this.barcodeId = model.barcodeId;
        this.type = model.type;
        this.notes = model.notes;
        this.user = model.user;
        this.status = model.status;
        this.images = model.images.map(image => new file_reference_vm_1.FileReferenceVm(image));
    }
}
exports.ItemVm = ItemVm;
class BikeVm extends ItemVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.attributes = model.attributes;
        this.todos = model.todos.map(todo => new history_vm_1.TodoVm(todo));
        this.stories = model.stories.map(story => new history_vm_1.StoryVm(story));
    }
}
exports.BikeVm = BikeVm;
class PCVm extends ItemVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.attributes = model.attributes;
        this.todos = model.todos.map(todo => new history_vm_1.TodoVm(todo));
        this.stories = model.stories.map(story => new history_vm_1.StoryVm(story));
    }
}
exports.PCVm = PCVm;
class PartVm extends ItemVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.name = model.name;
        this.description = model.description;
    }
}
exports.PartVm = PartVm;
class MiscVm extends ItemVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        super.getViewModel(model);
        this.name = model.name;
        this.description = model.description;
    }
}
exports.MiscVm = MiscVm;
//# sourceMappingURL=item-vm.js.map