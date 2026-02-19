import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signup(email: string, password: string) {
        // see if the email is in use
        const users = await this.userService.find(email)

        if (users.length) {
            throw new BadRequestException('Email already in use.')
        }

        //hashing the password 

        // generate the salt

        const salt = randomBytes(8).toString('hex');

        // hash the salt and password together
        const hash = (await scrypt(password, salt, 32)) as Buffer

        const result = salt + "." + hash.toString("hex")


        const user = await this.userService.CreateUserDto(email, result)

        return user

        // store the data in 

    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email);

        if (!user) {
            throw new NotFoundException('user not found.')
        }

        const [salt, storedHash] = user.password.split('.')

        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Password incorrect.')

        }
        return user;
    }
}