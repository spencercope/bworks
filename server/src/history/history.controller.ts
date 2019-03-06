import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { StoryVm, TodoVm } from './models/history-vm';
import { ToBooleanPipe } from '../shared/pipes/to-boolean.pipe';
import {
  ApiCreatedResponse,
  ApiImplicitQuery,
  ApiUseTags,
} from '@nestjs/swagger';
import { CustomApiDefaultErrors } from '../shared/decorators/custom-api-errors.decorator';
import { CustomApiOperation } from '../shared/decorators/custom-api-operation.decorator';

@Controller('histories')
@ApiUseTags('History')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('todo/bike')
  @ApiCreatedResponse({ type: TodoVm })
  @ApiImplicitQuery({ name: 'transferred', required: false })
  @CustomApiDefaultErrors()
  @CustomApiOperation({ title: 'AddTodoToBike' })
  async addTodoToBike(
    @Query('bikeId') bikeId: string,
    @Query('transferred', new ToBooleanPipe()) isTransferred: boolean = false,
    @Body() vm: TodoVm,
  ): Promise<TodoVm> {
    const todo = await this.historyService.addTodoToBike(
      bikeId,
      isTransferred,
      vm,
    );
    return new TodoVm(todo);
  }

  @Post('story/bike')
  @ApiCreatedResponse({ type: StoryVm })
  @CustomApiDefaultErrors()
  @CustomApiOperation({ title: 'AddStoryToBike' })
  async addStoryToBike(
    @Query('bikeId') bikeId: string,
    @Body() vm: StoryVm,
  ): Promise<StoryVm> {
    const story = await this.historyService.addStoryToBike(bikeId, vm);
    return new StoryVm(story);
  }

  @Post('todo/pc')
  @ApiCreatedResponse({ type: TodoVm })
  @ApiImplicitQuery({ name: 'transferred', required: false })
  @CustomApiDefaultErrors()
  @CustomApiOperation({ title: 'AddTodoToPc' })
  async addTodoToPc(
    @Query('pcId') pcId: string,
    @Query('transferred', new ToBooleanPipe()) isTransferred: boolean = false,
    @Body() vm: TodoVm,
  ): Promise<TodoVm> {
    const todo = await this.historyService.addTodoToPc(pcId, isTransferred, vm);
    return new TodoVm(todo);
  }

  @Post('story/pc')
  @ApiCreatedResponse({ type: TodoVm })
  @CustomApiDefaultErrors()
  @CustomApiOperation({ title: 'AddStoryToPc' })
  async addStoryToPc(
    @Query('pcId') pcId: string,
    @Body() vm: StoryVm,
  ): Promise<StoryVm> {
    const story = await this.historyService.addStoryToPc(pcId, vm);
    return new StoryVm(story);
  }

  @Get('transfer/:id')
  @ApiCreatedResponse({ type: StoryVm })
  @CustomApiDefaultErrors()
  @CustomApiOperation({ title: 'TransferTodoToStory' })
  async transferTodo(@Param('id') todoId: string): Promise<StoryVm> {
    const story = await this.historyService.transferTodoToStory(todoId);
    return new StoryVm(story);
  }
}
