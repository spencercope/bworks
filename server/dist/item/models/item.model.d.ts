import { BaseDocument } from "shared/base.model";
import { Schema } from 'mongoose';
import { FileReference } from "../../file-reference/models/file-reference.model";
import { Story, Todo } from "../../history/models/history.model";
export declare enum BikeType {
    Road = "road",
    Cross = "cross",
    MTB = "mtb",
    Hybrid = "hybrid",
    Kid = "kid"
}
export declare const wheelSizes: number[];
export declare const frameSizes: number[];
export declare enum ItemType {
    Bike = "Bike",
    PC = "PC",
    Part = "Part",
    Misc = "Misc"
}
export declare enum ProcessorType {
    Intel = "intel",
    AMD = "amd"
}
export declare enum CDDrive {
    Rom = "rom",
    RW = "r/w",
    None = "none"
}
export declare enum Status {
    Received = "Donation Received",
    Scraped = "Scrapped",
    Donated = "Donated",
    Sold = "Sold",
    EarnABikePickedUp = "Earn A Bike Picked Up",
    EarnABikeGraduation = "Earn A Bike Graduation",
    EarnAPC = "Earn A PC",
    Progress = "In Progress"
}
export declare enum VideoCard {
    Nvidia = "nvidia",
    AMD = "amd",
    Integrated = "integrated"
}
export interface Item extends BaseDocument {
    donorId: string;
    type: ItemType;
    notes: string;
    images: FileReference[];
    user: string;
    status: Status;
    barcodeId: string;
    wikiLinks?: string[];
}
export interface Bike extends Item {
    attributes: BikeAttribute;
    todos: Todo[];
    stories: Story[];
}
export interface PC extends Item {
    attributes: PCAttribute;
    todos: Todo[];
    stories: Story[];
    checklist: PCChecklist;
}
export interface Part extends Item {
    name: string;
    description: string;
}
export interface Misc extends Item {
    name: string;
    description: string;
}
export declare class NameAndDate {
    name: string;
    date: Date;
}
export declare class OSVersion {
    received: string;
    bWorksUpdate: string;
}
export declare class BikeAttribute {
    frameSize?: number;
    graduatedDate?: Date;
    serialNumber?: string;
    bikeType?: BikeType;
    wheelSize?: number;
    marketPrice?: number;
    color?: string;
    stepOverHeight?: string;
}
export declare class PCAttribute {
    graduatedDate?: Date;
    processorCores?: number;
    processorSpeed?: number;
    processorType?: ProcessorType;
    videoCard?: VideoCard;
    ram?: number;
    hardDrive?: number;
    cdDrive?: CDDrive;
    checkedInBy?: NameAndDate;
    installedBy?: NameAndDate;
    qualityAssuranceBy?: NameAndDate;
    osVersion?: OSVersion;
}
export interface PCChecklist {
    keyboard: boolean;
    mouse: boolean;
    sound: boolean;
    nic: boolean;
    wifi: boolean;
}
export declare const itemSchema: Schema<any>;
export declare const bikeSchema: Schema<any>;
export declare const nameAndDateSchema: Schema<any>;
export declare const pcSchema: Schema<any>;
export declare const miscAndPartSchema: Schema<any>;
