import { ItemService } from "./item.service";
import { BikeVm, ItemVm, MiscVm, PartVm, PCVm } from "./models/item-vm";
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    createItem(donorId: string, itemVm: ItemVm): Promise<ItemVm>;
    updateBikeItem(id: string, vm: BikeVm): Promise<BikeVm>;
    updatePcItem(id: string, vm: PCVm): Promise<PCVm>;
    updatePartItem(id: string, vm: PartVm): Promise<PartVm>;
    updateMiscItem(id: string, vm: MiscVm): Promise<MiscVm>;
}
