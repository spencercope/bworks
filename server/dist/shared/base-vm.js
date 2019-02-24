"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseVm {
    constructor(model = null) {
        if (model) {
            this.createdAt = model.createdAt;
            this.updatedAt = model.updatedAt;
            this.id = model.id;
            this.getViewModel(model);
        }
    }
}
exports.BaseVm = BaseVm;
//# sourceMappingURL=base-vm.js.map