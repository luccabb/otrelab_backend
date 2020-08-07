import AppError from '@shared/errors/AppError'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', ()=> {

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to update user profile', async ()=> {

        const user = await fakeUsersRepository.create({
            name: 'lucca',
            email: 'lucca@test.com',
            password: '123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'lucca 2',
            email: 'lucca1@test.com'
        })

        expect(updatedUser.name).toBe('lucca 2')
        expect(updatedUser.email).toBe('lucca1@test.com')

    })

    it('should not be able to update profile of non existing user', async ()=> {

        expect(updateProfile.execute({
            user_id: 'non existent user id',
            name: 'non-existent',
            email: 'non-existing@email.com'
        })).rejects.toBeInstanceOf(AppError)

    })

    it('should not be able to update user to another existent user email', async ()=> {

        await fakeUsersRepository.create({
            name: 'lucca',
            email: 'lucca@test.com',
            password: '123456'
        })

        const user = await fakeUsersRepository.create({
            name: 'test user',
            email: 'test-user@test.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'lucca 2',
            email: 'lucca@test.com'
        })).rejects.toBeInstanceOf(AppError)

    })

    it('should be able to update user password', async ()=> {

        const user = await fakeUsersRepository.create({
            name: 'lucca',
            email: 'lucca@test.com',
            password: '123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'lucca',
            email: 'lucca@test.com',
            old_password: '123456',
            password: '123123'
        })

        expect(updatedUser.password).toBe('123123')

    })

    it('should not be able to update user password without old password', async ()=> {

        const user = await fakeUsersRepository.create({
            name: 'lucca',
            email: 'lucca@test.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'lucca 2',
            email: 'lucca@test.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)

    })

    it('should not be able to update the password with wrong old password', async ()=> {

        const user = await fakeUsersRepository.create({
            name: 'lucca',
            email: 'lucca@test.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'lucca',
            email: 'lucca@test.com',
            old_password: 'wrong old password',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)

    })

})
