import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from '@src/controller/LinkController';
import { LinkService } from '@src/service/LinkService';
import { PrismaModule } from '@src/module/PrismaModule';

describe('LinkController', () => {
  let linkController: LinkController;
  let linkService: LinkService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [LinkController],
      providers: [LinkService],
    }).compile();

    linkService = app.get<LinkService>(LinkService);
    linkController = app.get<LinkController>(LinkController);
  });

  test('it returns no links', async () => {
    jest.spyOn(linkService, 'findAll').mockImplementation(() => Promise.resolve([]));
    const links = await linkController.getAll();

    expect(links).toEqual([]);
  });

  test('it returns a link', async () => {
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
    const links = await linkController.getAll();

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
    ]);
  });
});
