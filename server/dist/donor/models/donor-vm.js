"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_vm_1 = require("../../shared/base-vm");
class DonorVm extends base_vm_1.BaseVm {
    constructor(model) {
        super(model);
    }
    getViewModel(model) {
        this.name = model.name;
        this.email = model.email;
        this.zip = model.zip;
        this.phoneNumber = model.phoneNumber;
        this.donations = model.donations;
        this.refSource = model.refSource;
    }
}
exports.DonorVm = DonorVm;
//# sourceMappingURL=donor-vm.js.map