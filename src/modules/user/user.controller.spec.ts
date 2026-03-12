import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller"
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { User } from "./entities/user.entity";
import { NotFoundException } from "@nestjs/common";

describe('UserController', () => {
    let controller: UserController;
    let fakeUserService: Partial<UserService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {

        fakeUserService = {
            findOne: (id:number) => {
                return Promise.resolve({id,email:'ahjah@ahjahj.com',password:'hdjshjd'} as User)
             },
            find: (email:string) => {
                return Promise.resolve([{id:1,email,password:'jskjdks'} as User])
             },
            CreateUserDto: (email:string,password:string) => { 
                return Promise.resolve({id:1,email:'jdksjdk@jakdjk.com',password:'jsdkasj'} as User)
            },
            // remove: () => { },
            // update: () => { }
        }

        fakeAuthService = {
            signin: (email:string,password:string) => {
                return Promise.resolve({id:1,email,password} as User)
             },
            // signup: () => { }
        }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers:[
                {
                    provide:UserService,
                    useValue:fakeUserService
                },
                {
                    provide:AuthService,
                    useValue:fakeAuthService
                }
            ]
        }).compile()


        controller = module.get<UserController>(UserController)
    })

    it('should be defined',async () => {
        expect(controller).toBeDefined()
    })

    it('find user throws an error if user with given id is not found.',async () => {
        fakeUserService.findOne = () => null;

        await expect(controller.findOneUser('1')).toBeNull()
    })

   it ('fin user returns a user if user with given id is found.',async ()=>{
         const user = await controller. findOneUser('1')

         expect(user).toBeDefined()
   })

   it('signin updates session object and return user.', async () => {
       let session = {userId:-1};
       const user = await controller.signin({email:'abcd@abcd.com',password:'abcd'},session)

       expect(user.id).toEqual(1);
       expect(session.userId).toEqual(1)
   })

})