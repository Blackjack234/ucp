import {Test} from "@nestjs/testing"
// import { it } from "node:test"
import { AuthService } from "./auth.service"
import { UserService } from "./user.service"
import { User } from "./entities/user.entity"
import { BadRequestException } from "@nestjs/common"
describe('AuthService',()=>{
    let service: AuthService

    let fakeUserService : Partial<UserService>
    beforeEach(async () => {
        //create a fake copy of userService
         fakeUserService = {
            find: () => Promise.resolve([]),
            CreateUserDto: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as unknown as any)
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {

                    provide: UserService,
                    useValue: fakeUserService
                }
            ],

        }).compile()

        service = module.get(AuthService)
    })


    it('can create an instance of auth service', async () => {

        expect(service).toBeDefined()
    })

    it('created a new user with salted and hashed password',async ()=>{
        const user = await service.signup("ami@mail.com","12345@ami")

        expect( user.password).not.toEqual('12345@ami')
        const [salt,hash] = user.password.split('.')
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('throws error if use sign up with email that is in use',async () => {
      fakeUserService.find = ()=>
        Promise.resolve([{id:1,email:'a',password:'1'}as User]);

      await expect(service.signup('asdf@asdf.com','asdf')).rejects.toThrow(BadRequestException);
      
    })
})

