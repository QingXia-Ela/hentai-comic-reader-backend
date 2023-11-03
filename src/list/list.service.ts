import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ListService {
  constructor(private dbService: DbService) {}
  getNewest(count: number) {
    return this.dbService.getNewest();
  }

  getList(count: number, offset: number) {
    const list = this.dbService.getList(count, offset);
    return {
      hasMore: list.length + offset < this.dbService.getComicCount(),
      data: list.map((comic) => ({
        id: comic.id,
        title: comic.title,
        cover: comic.cover,
        date: comic.date,
        tags: comic.tags,
        description: comic.description,
      })),
    };
  }
}
