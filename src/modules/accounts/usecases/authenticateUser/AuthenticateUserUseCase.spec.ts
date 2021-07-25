import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    // User not authenticated
    it("should be able to authenticate an user ", async () => {
        const user: ICreateUserDTO = {
            driver_license: "123456",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    // User not find
    it("should not be able to authenticate a nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            })
        }).rejects.toBeInstanceOf(AppError);
    });

    // Incorrect password
    it("should not be able to authenticate with incorret password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "123456",
                email: "user@test.com",
                password: "1234",
                name: "User Test"
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrect password"
            })
        }).rejects.toBeInstanceOf(AppError);
    });

})