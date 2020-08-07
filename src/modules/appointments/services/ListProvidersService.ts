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
class ListProvidersService {
    constructor (
        @inject('UsersRepository') private usersRepository: IUsersRepository
    ) {}

    public async execute({
        user_id
    }: IRequest): Promise<User[]> {

        const users = await this.usersRepository.findAllProviders({
            except_user_id: user_id
        });

        // if (!users) {
        //     throw new AppError('User not found')
        // }

        return users
    }
}

export default ListProvidersService
