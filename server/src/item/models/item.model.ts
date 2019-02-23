import { BaseDocument, schemaOptions } from "shared/base.model";
import { Schema } from 'mongoose';

export enum BikeType {
    //TODO get enums
}

export enum WheelSize {
    //TODO get enums
}

export enum FrameSize {
    //TODO get enums
}

export enum ItemType {
  Bike = 'bike',
  PC = 'pc',
  Part = 'part',
  Misc = 'misc'
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
  EarnAPC = 'earn-a-pc',
  Progress = 'progress'
}

export enum VideoCard {
    Nvidia = 'nvidia',
    AMD = 'amd',
    Integrated = 'integrated'
}

export interface Item extends BaseDocument{
    donorID: string,
    type: ItemType,
    notes: string,
    images: any, //TODO proper type
    user: string,
    status: Status,
    barcodeID: number
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
    frameSize: FrameSize,
    graduatedDate: Date,
    serialNumber: string,
    bikeType: BikeType,
    wheelSize: WheelSize,
    marketPrice: number,
    color: string,
    stepoverHeight: string
}

export interface PCAttribute{
    graduateDate: Date,
    processorCores: number,
    processorSpeed: number,
    processorType: ProcessorType,
    ram: number,
    hardDrive: number,
    cdDrive: CDDrive,
    checkedInBy: nameAndDate,
    installedBy: nameAndDate,
    qualityassuranceBy: nameAndDate,
    osVersion: OSVersion
}

export interface PCChecklist {
    keyboard: boolean,
    mouse: boolean,
    sound: boolean,
    nic: boolean,
    wifi: boolean
}

export interface nameAndDate {
    name: string,
    date: Date,
}

export interface OSVersion {
    received: string,
    bWorksUpdate: string
}


export const itemSchema = new Schema({
 

}, schemaOptions);