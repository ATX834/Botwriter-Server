import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from './models/User';

export const customAuthChecker = async ({ root, args, context, info }) => {

    const userRepository = getRepository(User)
    const userJwt = context.token;
    try {
        const decoded = jwt.verify(userJwt, 'secret-key');
        if (!decoded.id) {
            return false;
        }

        const user = await userRepository.findOne(decoded.userId);
        if (!user) {
            return false;
        }

        context.user = user;
        return true;
    } catch (err) {
        return false;
    }
}