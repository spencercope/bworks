import { ItemService } from "./item.service";
import { BikeVm, ItemVm, MiscVm, PartVm, PCVm } from "./models/item-vm";
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    createItem(donorId: string, barcodeId: string, isOffsite: boolean, itemVm: ItemVm): Promise<ItemVm>;
    updateBikeItem(id: string, vm: BikeVm): Promise<BikeVm>;
    updatePcItem(id: string, vm: PCVm): Promise<PCVm>;
    updatePartItem(id: string, vm: PartVm): Promise<PartVm>;
    updateMiscItem(id: string, vm: MiscVm): Promise<MiscVm>;
    getAllItems(): Promise<ItemVm[]>;
    getBikes(): Promise<BikeVm[]>;
    getPCs(): Promise<PCVm[]>;
    getParts(): Promise<PartVm[]>;
    getMiscs(): Promise<MiscVm[]>;
    getBikeById(id: string): Promise<BikeVm>;
    getPcById(id: string): Promise<PCVm>;
    getPartById(id: string): Promise<PartVm>;
    getMiscById(id: string): Promise<MiscVm>;
    getItemByBarcodeId(barcodeId: string): Promise<ItemVm>;
    deleteItem(id: string): Promise<boolean>;
}
