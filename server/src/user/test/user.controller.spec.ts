import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    userController = userModule.get<UserController>(UserController);
    userService = userModule.get<UserService>(UserService);
  });

  const userMock = [
    {
      id: 1,
      username: "dilan",
      email: "dsdfsqt@dgfd.com",
      photo: "dfdgfdg.gph",
      password: "124455",
    },
  ];

  describe("findAll", () => {
    it("should be return an array of users", () => {
      const users = userMock;
      console.log(users);

      // jest
      //   .spyOn(userService, "findUsers")
      //   .mockImplementation(async () => users);
    });
  });
});
