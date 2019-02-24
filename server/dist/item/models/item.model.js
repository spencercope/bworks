"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("shared/base.model");
const mongoose_1 = require("mongoose");
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
    Status["Received"] = "received";
    Status["Scraped"] = "scraped";
    Status["Donated"] = "donated";
    Status["Sold"] = "sold";
    Status["EarnABike"] = "earn-bike";
    Status["EarnAPC"] = "earn-pc";
    Status["Progress"] = "progress";
})(Status = exports.Status || (exports.Status = {}));
var VideoCard;
(function (VideoCard) {
    VideoCard["Nvidia"] = "nvidia";
    VideoCard["AMD"] = "amd";
    VideoCard["Integrated"] = "integrated";
})(VideoCard = exports.VideoCard || (exports.VideoCard = {}));
exports.itemSchema = new mongoose_1.Schema({
    donorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Donor'
    },
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
        enum: ['received', 'scraped', 'donated', 'sold', 'earn-bike', 'earn-pc', 'progress']
    },
    barcodeId: {
        type: Number,
        unique: true
    }
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