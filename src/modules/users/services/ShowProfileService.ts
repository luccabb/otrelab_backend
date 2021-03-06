import User from '@modules/users/infra/typeorm/entities/User'

import "reflect-metadata"
import {inject, injectable} from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

interface IRequest {
    user_id: string,
}

@injectable()
class ShowProfileService {
    constructor (
        @inject('UsersRepository') private usersRepository: IUsersRepository
    ) {}

    public async execute({
        user_id
    }: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found')
        }

        return user
    }
}

export default ShowProfileService
