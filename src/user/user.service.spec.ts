/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
// lightweight local replacement for getRepositoryToken to avoid requiring @nestjs/typeorm in tests
const getRepositoryToken = (entity: any) => `${entity && entity.name ? entity.name : 'Repository'}`;
import { UserService } from './user.service';
// In tests we avoid depending on the real entity file. Provide a minimal local
// User class so the spec can run even if ./user.entity is missing.
class User {
  id?: number;
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        // UserService expects a provider named 'UserModel' (injected model/token)
        // Provide a lightweight mock so Nest can resolve the dependency in tests.
        {
          provide: 'UserModel',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
