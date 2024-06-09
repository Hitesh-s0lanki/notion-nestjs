import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NotionService } from './notion.service';
import { CreateNotionPageDto } from './dto/create-notion.dto';
import { UpdateNotionPageDto } from './dto/update-notion.dto';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) { }

  @Post()
  async createPage(@Body() createNotionPageDto: CreateNotionPageDto) {
    return this.notionService.createPage(createNotionPageDto);
  }

  @Get()
  async getPages() {
    return this.notionService.getPages();
  }

  @Get(':id')
  async getPage(@Param('id') id: string) {
    return this.notionService.getPage(id);
  }

  @Patch(':id')
  async updatePage(
    @Param('id') id: string,
    @Body() updateNotionPageDto: UpdateNotionPageDto,
  ) {
    return this.notionService.updatePage(id, updateNotionPageDto);
  }

  @Delete(':id')
  async deletePage(@Param('id') id: string) {
    return this.notionService.deletePage(id);
  }
}