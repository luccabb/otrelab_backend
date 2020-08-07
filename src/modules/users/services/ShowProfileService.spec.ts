import AppError from '@shared/errors/AppError'

import ShowProfileService from '@modules/users/services/ShowProfileService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatar', ()=> {

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        showProfile = new ShowProfileService(fakeUsersRepository)
    })

    it('should be able to show user profile', async ()=> {

        const user = await fakeUsersRepository.create({
            name: 'lucca',
            email: 'lucca@test.com',
            password: '123456'
        })

        const profile = await showProfile.execute({
            user_id: user.id,
        })

        expect(profile.name).toBe('lucca')
        expect(profile.email).toBe('lucca@test.com')

    })

    it('should not be able to show profile of non existing user', async ()=> {

        expect(showProfile.execute({
            user_id: 'non existent user id',
        })).rejects.toBeInstanceOf(AppError)

    })

})
