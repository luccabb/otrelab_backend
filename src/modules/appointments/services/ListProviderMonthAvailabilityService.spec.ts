import AppError from '@shared/errors/AppError'

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', ()=> {

    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository)
    })

    it('should be able to list month availability for providers', async ()=> {
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 3, 20, 8, 0, 0),
        })

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        })

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        })

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 21, 8, 0, 0),
        })

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 5
        })

        expect(availability).toEqual(expect.arrayContaining([
            { day: 1, available: true },
            { day: 2, available: true },
            { day: 3, available: true },
            { day: 4, available: true },
            { day: 5, available: true },
            { day: 6, available: true },
            { day: 7, available: true },
            { day: 8, available: true },
            { day: 9, available: true },
            { day: 10, available: true },
            { day: 11, available: true },
            { day: 12, available: true },
            { day: 13, available: true },
            { day: 14, available: true },
            { day: 15, available: true },
            { day: 16, available: true },
            { day: 17, available: true },
            { day: 18, available: true },
            { day: 19, available: true },
            { day: 20, available: true },
            { day: 21, available: true },
            { day: 22, available: true },
            { day: 23, available: true },
        ]))



    })

})
