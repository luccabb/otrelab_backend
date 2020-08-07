import User from '@modules/users/infra/typeorm/entities/User'
import "reflect-metadata"
import {inject, injectable} from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface IRequest {
    name: string,
    email: string,
    password: string
}

@injectable()
class CreateUserService {
    constructor (@inject('UsersRepository') private usersRepository: IUsersRepository, @inject('HashProvider') private hashProvider: IHashProvider) {}

    public async execute ({name, email, password}: IRequest): Promise<User> {

        const checkUserExist = await this.usersRepository.findByEmail(email)

        if (checkUserExist){
            throw new AppError('Email address already in use.')
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return user
    }
}

export default CreateUserService
