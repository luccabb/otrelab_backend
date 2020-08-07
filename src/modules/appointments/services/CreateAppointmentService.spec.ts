import AppError from '@shared/errors/AppError'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'


let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', ()=> {
    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    })

    it('should be able to create a new appointment', async ()=> {

        const appointment = await createAppointment.execute({ date: new Date(), provider_id: '12341234'})

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('12341234')

    })

    it('should not be able to create 2 appointments on the same date', async ()=> {

        const appointmentDate = new Date(2020, 4, 10, 11);


        await createAppointment.execute({ date: appointmentDate, provider_id: '12341234'})

        expect(createAppointment.execute({ date: appointmentDate, provider_id: '12341234'})).rejects.toBeInstanceOf(AppError)

    })
})
