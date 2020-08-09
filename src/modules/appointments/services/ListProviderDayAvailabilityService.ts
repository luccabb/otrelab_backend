import User from '@modules/users/infra/typeorm/entities/User'

import "reflect-metadata"
import {inject, injectable} from 'tsyringe'

import { getHours, isAfter } from 'date-fns'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'


interface IRequest {
    provider_id: string,
    month: number,
    year: number,
    day: number
}

type IResponse = Array<{
    hour: number,
    available: boolean,
}>

@injectable()
class ListProviderDayAvailabilityService {
    constructor (
        @inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            year,
            month,
            day
        })

        const hourStart = 0;

        const eachHourArray = Array.from(
            {length: 24},
            (_, index) => index+ hourStart,
        )

        const currentDate = new Date(Date.now())

        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(appointment => getHours(appointment.date) == hour)

            const compareDate = new Date(year, month-1, day, hour)

            return {
                hour,
                available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
            }
        })


        return availability
    }
}

export default ListProviderDayAvailabilityService
