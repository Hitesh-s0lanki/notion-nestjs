import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { ConfigService } from '@nestjs/config';
import { CreateNotionPageDto } from './dto/create-notion.dto';
import { UpdateNotionPageDto } from './dto/update-notion.dto';

@Injectable()
export class NotionService {
  private notion: Client;
  private databaseId: string;

  constructor(private configService: ConfigService) {
    this.notion = new Client({ auth: this.configService.get<string>('NOTION_API_KEY') });
    this.databaseId = this.configService.get<string>('NOTION_DATABASE_ID');
  }

  async createPage(createNotionPageDto: CreateNotionPageDto) {
    const { title } = createNotionPageDto;
    return this.notion.pages.create({
      parent: {
        type: "page_id",
        page_id: this.databaseId
      },
      properties: {
        title: [
          {
            text: {
              content: title
            }
          }
        ]
      }
    });
  }

  async getPages() {
    return this.notion.pages.retrieve({
      page_id: this.databaseId,
    });
  }

  async getPage(id: string) {
    return this.notion.pages.retrieve({ page_id: id });
  }

  async updatePage(id: string, updateNotionPageDto: UpdateNotionPageDto) {
    const { title } = updateNotionPageDto;
    return this.notion.pages.update({
      page_id: id,
      properties: {
        Name: {
          title: [{ text: { content: title } }],
        },
      },
    });
  }

  async deletePage(id: string) {
    // Notion API does not support deleting pages directly, you can set a property to mark as deleted instead
    return this.notion.pages.update({
      page_id: id,
      archived: true
    });
  }
}
