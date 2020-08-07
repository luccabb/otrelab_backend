import AppError from '@shared/errors/AppError'

import ListProvidersService from '@modules/appointments/services/ListProvidersService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', ()=> {

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        listProviders = new ListProvidersService(fakeUsersRepository)
    })

    it('should be able to list providers', async ()=> {

        const user1 = await fakeUsersRepository.create({
            name: 'lucca',
            email: 'lucca@test.com',
            password: '123456'
        })

        const user2 = await fakeUsersRepository.create({
            name: 'lucca1',
            email: 'lucca1@test.com',
            password: '123456'
        })

        const loggedUser = await fakeUsersRepository.create({
            name: 'lucca2',
            email: 'lucca2@test.com',
            password: '123456'
        })

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        })

        expect(providers).toEqual([user1, user2])

    })

})
