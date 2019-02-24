"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("../../shared/base.model");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
var BikeType;
(function (BikeType) {
    BikeType["Road"] = "road";
    BikeType["Cross"] = "cross";
    BikeType["MTB"] = "mtb";
    BikeType["Hybrid"] = "hybrid";
    BikeType["Kid"] = "kid";
})(BikeType = exports.BikeType || (exports.BikeType = {}));
exports.wheelSizes = [
    12,
    14,
    16,
    18,
    20,
    24,
    26,
    27,
    29,
    700
];
exports.frameSizes = [
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    40,
    42,
    44,
    46,
    48,
    50,
    52,
    54,
    56,
    58,
    60,
    62,
    64,
    66,
    68,
    70
];
var ItemType;
(function (ItemType) {
    ItemType["Bike"] = "Bike";
    ItemType["PC"] = "PC";
    ItemType["Part"] = "Part";
    ItemType["Misc"] = "Misc";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
var ProcessorType;
(function (ProcessorType) {
    ProcessorType["Intel"] = "intel";
    ProcessorType["AMD"] = "amd";
})(ProcessorType = exports.ProcessorType || (exports.ProcessorType = {}));
var CDDrive;
(function (CDDrive) {
    CDDrive["Rom"] = "rom";
    CDDrive["RW"] = "r/w";
    CDDrive["None"] = "none";
})(CDDrive = exports.CDDrive || (exports.CDDrive = {}));
var Status;
(function (Status) {
    Status["Received"] = "Donation Received";
    Status["Scraped"] = "Scrapped";
    Status["Donated"] = "Donated";
    Status["Sold"] = "Sold";
    Status["EarnABikePickedUp"] = "Earn A Bike Picked Up";
    Status["EarnABikeGraduation"] = "Earn A Bike Graduation";
    Status["EarnAPC"] = "Earn A PC";
    Status["Progress"] = "In Progress";
})(Status = exports.Status || (exports.Status = {}));
var VideoCard;
(function (VideoCard) {
    VideoCard["Nvidia"] = "nvidia";
    VideoCard["AMD"] = "amd";
    VideoCard["Integrated"] = "integrated";
})(VideoCard = exports.VideoCard || (exports.VideoCard = {}));
class NameAndDate {
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], NameAndDate.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], NameAndDate.prototype, "date", void 0);
exports.NameAndDate = NameAndDate;
class OSVersion {
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], OSVersion.prototype, "received", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], OSVersion.prototype, "bWorksUpdate", void 0);
exports.OSVersion = OSVersion;
class BikeAttribute {
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Number)
], BikeAttribute.prototype, "frameSize", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], BikeAttribute.prototype, "graduatedDate", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], BikeAttribute.prototype, "serialNumber", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, enum: BikeType }),
    __metadata("design:type", String)
], BikeAttribute.prototype, "bikeType", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Number)
], BikeAttribute.prototype, "wheelSize", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Number)
], BikeAttribute.prototype, "marketPrice", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], BikeAttribute.prototype, "color", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], BikeAttribute.prototype, "stepOverHeight", void 0);
exports.BikeAttribute = BikeAttribute;
class PCAttribute {
}
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], PCAttribute.prototype, "graduatedDate", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Number)
], PCAttribute.prototype, "processorCores", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Number)
], PCAttribute.prototype, "processorSpeed", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, enum: ProcessorType }),
    __metadata("design:type", String)
], PCAttribute.prototype, "processorType", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, enum: VideoCard }),
    __metadata("design:type", String)
], PCAttribute.prototype, "videoCard", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Number)
], PCAttribute.prototype, "ram", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Number)
], PCAttribute.prototype, "hardDrive", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, enum: CDDrive }),
    __metadata("design:type", String)
], PCAttribute.prototype, "cdDrive", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: NameAndDate }),
    __metadata("design:type", NameAndDate)
], PCAttribute.prototype, "checkedInBy", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: NameAndDate }),
    __metadata("design:type", NameAndDate)
], PCAttribute.prototype, "installedBy", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: NameAndDate }),
    __metadata("design:type", NameAndDate)
], PCAttribute.prototype, "qualityAssuranceBy", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: OSVersion }),
    __metadata("design:type", OSVersion)
], PCAttribute.prototype, "osVersion", void 0);
exports.PCAttribute = PCAttribute;
exports.itemSchema = new mongoose_1.Schema({
    donorId: mongoose_1.Schema.Types.ObjectId,
    type: {
        type: String,
        enum: ['Bike', 'PC', 'Part', 'Misc'],
        required: true
    },
    notes: String,
    images: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'FileReference'
        }
    ],
    user: String,
    status: {
        type: String,
        enum: [
            'Donation Received',
            'Scrapped',
            'Donated',
            'Sold',
            'Earn A Bike Picked Up',
            'Earn A Bike Graduation',
            'Earn A PC',
            'In Progress'
        ]
    },
    barcodeId: {
        type: String,
        unique: true
    },
    wikiLinks: [String],
}, Object.assign({}, base_model_1.schemaOptions, { discriminatorKey: 'type' }));
exports.bikeSchema = new mongoose_1.Schema({
    attributes: new mongoose_1.Schema({
        frameSize: Number,
        wheelSize: Number,
        graduatedDate: {
            type: Date,
            default: new Date(Date.now())
        },
        serialNumber: String,
        bikeType: {
            type: String,
            enum: ['road', 'cross', 'mtb', 'hybrid', 'kid']
        },
        marketPrice: Number,
        color: String,
        stepOverHeight: String,
    }, { _id: false }),
    todos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ],
    stories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ]
}, { discriminatorKey: 'type' });
exports.nameAndDateSchema = new mongoose_1.Schema({
    name: String,
    date: {
        type: Date,
        default: new Date(Date.now())
    }
}, { _id: false });
exports.pcSchema = new mongoose_1.Schema({
    attributes: new mongoose_1.Schema({
        graduatedDate: {
            type: Date,
            default: new Date(Date.now())
        },
        processorCores: Number,
        processorSpeed: Number,
        processorType: {
            type: String,
            enum: ['intel', 'amd']
        },
        videoCard: {
            type: String,
            enum: ['nvidia', 'amd', 'integrated']
        },
        ram: Number,
        hardDrive: Number,
        cdDrive: {
            type: String,
            enum: ['rom', 'r/w', 'none']
        },
        checkedIn: exports.nameAndDateSchema,
        installed: exports.nameAndDateSchema,
        qualityAssurance: exports.nameAndDateSchema,
        osVersion: new mongoose_1.Schema({
            received: String,
            bWorksUpdate: String,
        }, { _id: false })
    }, { _id: false }),
    checklist: new mongoose_1.Schema({
        keyboard: Boolean,
        mouse: Boolean,
        sound: Boolean,
        nic: Boolean,
        wifi: Boolean,
    }, { _id: false }),
    todos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ],
    stories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ]
});
exports.miscAndPartSchema = new mongoose_1.Schema({
    name: String,
    description: String,
}, { discriminatorKey: 'type' });
//# sourceMappingURL=item.model.js.map