"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_vm_1 = require("../../shared/base-vm");
class FileReferenceVm extends base_vm_1.BaseVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        this.publicUrl = model.publicUrl;
        this.fileName = model.fileName;
        this.itemId = model.itemId;
        this.note = model.note;
    }
}
exports.FileReferenceVm = FileReferenceVm;
//# sourceMappingURL=file-reference-vm.js.map