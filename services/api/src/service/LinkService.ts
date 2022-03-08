import { LinkInterface } from '@src/interface/LinkInterface';

export class LinkService {
  // constructor(private readonly linkRepository: Repository<Link>) {
  // }

  findAll(): LinkInterface[] {
    // return this.linkRepository.findAll();
    return [];
  }

  findOne(id: number): LinkInterface | null {
    // return this.linkRepository.findOne({ id });
    if (id !== 2) {
      return null;
    }

    return {
      id: 2,
      text: 'Hello',
    };
  }
}
