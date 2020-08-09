import AppError from '@shared/errors/AppError'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'


let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', ()=> {
    beforeEach(()=>{
        fakeNotificationsRepository = new FakeNotificationsRepository()
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository
        )

    })

    it('should be able to create a new appointment', async ()=> {

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
            return new Date(2020, 4, 10, 12).getTime()
        })

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '123123',
            user_id: 'user'
        })

        await expect(appointment).toHaveProperty('id')
        await expect(appointment.provider_id).toBe('123123')

    })

    it('should not be able to create 2 appointments on the same date', async ()=> {

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
            return new Date(2020, 4, 20, 11).getTime()
        })

        const appointmentDate = new Date(2020, 4, 20, 13);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '12341234',
            user_id: '123123'
        })

        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '12341234',
            user_id: '123123'
        })).rejects.toBeInstanceOf(AppError)

    })

    it('should not be able to create appointments on a past date', async ()=> {

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            provider_id: 'provider',
            user_id: 'user'
        })).rejects.toBeInstanceOf(AppError)

    })

    it('should not be able to create appointment with the same user as provider', async ()=> {

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '123123',
            user_id: '123123'
        })).rejects.toBeInstanceOf(AppError)

    })

    it('should not be able to create appointment with the same user as provider', async ()=> {

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '123123',
            user_id: '123123'
        })).rejects.toBeInstanceOf(AppError)

    })

    // it('should not be able to create appointment outside available hours', async ()=> {

    //     jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
    //         return new Date(2020, 4, 10, 12).getTime()
    //     })

    //     await expect(createAppointment.execute({
    //         date: new Date(2020, 4, 11, -1),
    //         provider_id: '123123',
    //         user_id: '123456'
    //     })).rejects.toBeInstanceOf(AppError)

    //     await expect(createAppointment.execute({
    //         date: new Date(2020, 4, 11, 24),
    //         provider_id: '123123',
    //         user_id: '123456'
    //     })).rejects.toBeInstanceOf(AppError)

    // })
})
