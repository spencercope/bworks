import {BaseDocument, schemaOptions} from "../../shared/base.model"; 
import {Schema} from 'mongoose';

export enum BikeType {
    Road = 'road',
    Cross = 'cross',
    MTB = 'mtb',
    Hybrid = 'hybrid',
    Kid = 'kid',
}

export const wheelSizes = [
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

export const frameSizes = [
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

export enum ItemType {
    Bike = 'Bike',
    PC = 'PC',
    Part = 'Part',
    Misc = 'Misc'
}

export enum ProcessorType {
    Intel = 'intel',
    AMD = 'amd'
}

export enum CDDrive {
    Rom = 'rom',
    RW = 'r/w',
    None = 'none'
}

export enum Status {
    Received = 'received',
    Scraped = 'scraped',
    Donated = 'donated',
    Sold = 'sold',
    EarnABike = 'earn-bike',
    EarnAPC = 'earn-pc',
    Progress = 'progress'
}

export enum VideoCard {
    Nvidia = 'nvidia',
    AMD = 'amd',
    Integrated = 'integrated'
}

export interface Item extends BaseDocument {
    donorId: string,
    type: ItemType,
    notes: string,
    images: any, //TODO proper type
    user: string,
    status: Status,
    barcodeId: number
}

export interface Bike extends Item {
    attributes: BikeAttribute,
    todos: any[],//TODO proper type
    stories: any, //TODO proper type
}

export interface PC extends Item {
    attributes: PCAttribute,
    todos: any[],
    stories: any,
    checklist: PCChecklist
}

export interface Part extends Item {
    name: string,
    description: string
}

export interface Misc extends Item {
    name: string,
    description: string
}

export interface BikeAttribute {
    frameSize: number,
    graduatedDate: Date,
    serialNumber: string,
    bikeType: BikeType,
    wheelSize: number,
    marketPrice: number,
    color: string,
    stepOverHeight: string
}

export interface PCAttribute {
    graduatedDate: Date,
    processorCores: number,
    processorSpeed: number,
    processorType: ProcessorType,
    videoCard: VideoCard,
    ram: number,
    hardDrive: number,
    cdDrive: CDDrive,
    checkedInBy: NameAndDate,
    installedBy: NameAndDate,
    qualityAssuranceBy: NameAndDate,
    osVersion: OSVersion
}

export interface PCChecklist {
    keyboard: boolean,
    mouse: boolean,
    sound: boolean,
    nic: boolean,
    wifi: boolean
}

export interface NameAndDate {
    name: string,
    date: Date,
}

export interface OSVersion {
    received: string,
    bWorksUpdate: string
}


export const itemSchema = new Schema({
    donorId: {
        type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
}, {...schemaOptions, discriminatorKey: 'type'});

export const bikeSchema = new Schema({
    attributes: new Schema({
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
    }, {_id: false}),
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ],
    stories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Story'
        }
    ]
}, {discriminatorKey: 'type'});

export const nameAndDateSchema = new Schema({
    name: String,
    date: {
        type: Date,
        default: new Date(Date.now())
    }
}, {_id: false});

export const pcSchema = new Schema({
    attributes: new Schema({
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
        checkedIn: nameAndDateSchema,
        installed: nameAndDateSchema,
        qualityAssurance: nameAndDateSchema,
        osVersion: new Schema({
            received: String,
            bWorksUpdate: String,
        }, {_id: false})
    }, {_id: false}),
    checklist: new Schema({
        keyboard: Boolean,
        mouse: Boolean,
        sound: Boolean,
        nic: Boolean,
        wifi: Boolean,
    }, {_id: false}),
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ],
    stories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Story'
        }
    ]
});

export const miscAndPartSchema = new Schema({
    name: String,
    description: String,
}, {discriminatorKey: 'type'});
