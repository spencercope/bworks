import { BaseVm } from '../../shared/base-vm';
import {
  Bike,
  BikeAttribute,
  Item,
  ItemType,
  Misc,
  Part,
  PC,
  PCAttribute,
  Status,
} from './item.model';
import { FileReferenceVm } from '../../file-reference/models/file-reference-vm';
import { StoryVm, TodoVm } from '../../history/models/history-vm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class ItemVm extends BaseVm<Item> {
  @ApiModelProperty()
  donorId: string;
  @ApiModelProperty({ type: String, enum: ItemType })
  type: ItemType;
  @ApiModelProperty()
  notes: string;
  @ApiModelPropertyOptional({ type: FileReferenceVm, isArray: true })
  images?: FileReferenceVm[];
  @ApiModelPropertyOptional()
  user?: string;
  @ApiModelProperty({ type: String, enum: Status })
  status: Status;
  @ApiModelProperty()
  barcodeId: string;
  @ApiModelPropertyOptional({ isArray: true, type: String })
  wikiLinks?: string[];

  constructor(model: Item) {
    super(model);
  }

  getViewModel(model: Item): void {
    this.donorId = model.donorId;
    this.barcodeId = model.barcodeId;
    this.type = model.type;
    this.notes = model.notes;
    this.user = model.user;
    this.status = model.status;
    this.images = model.images
      ? model.images.map(image => new FileReferenceVm(image))
      : [];
    this.wikiLinks = model.wikiLinks;
  }
}

export class BikeVm extends ItemVm {
  @ApiModelPropertyOptional({ type: BikeAttribute })
  attributes?: BikeAttribute;
  @ApiModelPropertyOptional({ type: TodoVm, isArray: true })
  todos?: TodoVm[];
  @ApiModelPropertyOptional({ type: StoryVm, isArray: true })
  stories?: StoryVm[];

  constructor(model: Bike) {
    super(model);
  }

  getViewModel(model: Bike): void {
    super.getViewModel(model);
    this.attributes = model.attributes;
    this.todos = model.todos.map(todo => new TodoVm(todo));
    this.stories = model.stories.map(story => new StoryVm(story));
  }
}

export class PCVm extends ItemVm {
  @ApiModelPropertyOptional({ type: PCAttribute })
  attributes?: PCAttribute;
  @ApiModelPropertyOptional({ type: TodoVm, isArray: true })
  todos?: TodoVm[];
  @ApiModelPropertyOptional({ type: StoryVm, isArray: true })
  stories?: StoryVm[];

  constructor(model: PC) {
    super(model);
  }

  getViewModel(model: PC): void {
    super.getViewModel(model);
    this.attributes = model.attributes;
    this.todos = model.todos.map(todo => new TodoVm(todo));
    this.stories = model.stories.map(story => new StoryVm(story));
  }
}

export class PartVm extends ItemVm {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  description?: string;

  constructor(model: Part) {
    super(model);
  }

  getViewModel(model: Part): void {
    super.getViewModel(model);
    this.name = model.name;
    this.description = model.description;
  }
}

export class MiscVm extends ItemVm {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  description?: string;

  constructor(model: Misc) {
    super(model);
  }

  getViewModel(model: Misc): void {
    super.getViewModel(model);
    this.name = model.name;
    this.description = model.description;
  }
}
