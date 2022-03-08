import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from '@src/controller/LinkController';
import { LinkService } from '@src/service/LinkService';
import { PrismaModule } from '@src/module/PrismaModule';
import { PrismaService } from '@src/service/PrismaService';

describe('LinkService', () => {
  let linkService: LinkService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [LinkService],
    }).compile();

    linkService = app.get<LinkService>(LinkService);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  test('it returns no links', async () => {
    jest.spyOn(linkService, 'findAll').mockImplementation(() => Promise.resolve([]));
    const links = await linkService.findAll();

    expect(links).toEqual([])
  });

  test('it returns no links', async () => {
    jest.spyOn(linkService, 'findAll').mockImplementation(() => Promise.resolve([
      {
        id: 1,
        "text": "www.danielchadwick.co.uk",
        "active": false,
        "userId": 1,
        "user": {
          "id": 1,
          "email": "dan@chadwk.com",
          "username": "dan",
          "name": "Daniel Chadwick"
        }
      },
    ]));
    const links = await linkService.findAll();

    expect(links).toEqual([
      {
        id: 1,
        "text": "www.danielchadwick.co.uk",
        "active": false,
        "userId": 1,
        "user": {
          "id": 1,
          "email": "dan@chadwk.com",
          "username": "dan",
          "name": "Daniel Chadwick"
        }
      },
    ])
  });
});
