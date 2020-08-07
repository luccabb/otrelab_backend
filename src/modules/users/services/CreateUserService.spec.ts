import AppError from '@shared/errors/AppError'

import CreateUserService from '@modules/users/services/CreateUserService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('CreateUser', ()=> {
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to create a new user', async ()=> {

        const user = await createUser.execute({ name: 'lucca', email: 'lucca@test.com', password: '123456'})

        await expect(user).toHaveProperty('id')

    })

    it('should not be able to create a new user with the same email', async ()=> {

        await createUser.execute({ name: 'lucca', email: 'lucca@test.com', password: '123456'})

        await expect(createUser.execute({ name: 'lucca', email: 'lucca@test.com', password: '123456'})).rejects.toBeInstanceOf(AppError)

    })
})
