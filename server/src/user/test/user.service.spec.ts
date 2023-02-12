import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../models/User";
import { Repository } from "typeorm";
import { UserService } from "../user.service";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";
import * as bcryptUtil from "../../helpers/hashPassword";

describe("UsersService", () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let cloudinaryService: CloudinaryService;

  const repositoryToken = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: repositoryToken,
          useValue: {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        CloudinaryService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
    userRepository = module.get<typeof userRepository>(repositoryToken);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("userRepository must be define", () => {
    expect(userRepository).toBeDefined();
  });

  it("should create a new user", async () => {
    jest
      .spyOn(bcryptUtil, "encriptPassoword")
      .mockImplementation(async () => "1223");
    await service.createUser({
      username: "tests",
      email: "test@test.test",
      password: "123",
      photo: null,
    });
    expect(userRepository.create).toHaveBeenCalledWith({
      username: "tests",
      email: "test@test.test",
      password: "1223",
      photo: null,
    });
  });
});
