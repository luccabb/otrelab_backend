import AppError from '@shared/errors/AppError'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', ()=> {
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()

        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
        authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to authenticate', async ()=> {

        const user = await createUser.execute({ name: 'lucca', email: 'lucca@test.com', password: '123456'})

        const response = await authenticateUser.execute({ email: 'lucca@test.com', password: '123456'})

        expect(response).toHaveProperty('token')
        expect(response.user).toBe(user)

    })

    it('should not be able to authenticate with invalid user', async ()=> {

        await expect(authenticateUser.execute({ email: 'lucca@test.com', password: '123456'})).rejects.toBeInstanceOf(AppError)

    })

    it('should not be able to authenticate with wrong password', async ()=> {

        await createUser.execute({ name: 'lucca', email: 'lucca@test.com', password: '123456'})

        await expect(authenticateUser.execute({ email: 'lucca@test.com', password: 'wrongpassword'})).rejects.toBeInstanceOf(AppError)

    })


})
