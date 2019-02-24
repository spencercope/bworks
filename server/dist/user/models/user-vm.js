"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_vm_1 = require("../../shared/base-vm");
class UserVm extends base_vm_1.BaseVm {
    constructor(model = null) {
        super(model);
    }
    getViewModel(model) {
        this.username = model.username;
        this.role = model.role;
    }
}
exports.UserVm = UserVm;
//# sourceMappingURL=user-vm.js.map