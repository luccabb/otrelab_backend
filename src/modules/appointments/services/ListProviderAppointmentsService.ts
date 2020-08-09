import User from '@modules/users/infra/typeorm/entities/User'

import "reflect-metadata"
import {inject, injectable} from 'tsyringe'

import { getDaysInMonth, getDate } from 'date-fns'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

interface IRequest {
    provider_id: string,
    day: number,
    month: number,
    year: number,
}

@injectable()
class ListProviderAppointmentService {
    constructor (
        @inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day
    }: IRequest): Promise<Appointment[]> {

        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            day,
            month,
            year
        })

        return appointments
    }
}

export default ListProviderAppointmentService
