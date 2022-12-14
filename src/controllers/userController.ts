import { genSaltSync, hashSync } from 'bcrypt';
import { ObjectId } from 'mongoose';
import { DEFAULT_OFFSET } from '../config';

import connect from "../db";
import { ResourceAlreadyExistsError } from "../Errors/errors";
import userModel, { User } from "../models/userModel";


export const addUser = async (user: User) => {
    try {
        await connect();
        
        const found = await getUser(user.email);

        if (found) throw new ResourceAlreadyExistsError(`Error, user ${user.email} already exists`);
        
        // password encryption
        const salt = genSaltSync(10);
        user.password = hashSync(user.password, salt);

        const result = await userModel.create(user);

        return result;
    } catch (error) {
        throw error;
    }
}


export const getUser = async (email: String): Promise<User | null> => {
    await connect();
    
    const found: User | null = await userModel.findOne({ email });

    return found;
}

export const getUsers = async (filters = {},index: number = 0, offset = DEFAULT_OFFSET as number) : Promise<User[]> => {
    try {
        await connect();

        const result: User[] | [] = await userModel.find(filters).skip(index).limit(offset);
        
        return result; 
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (_id : ObjectId | String) => {
    try {
        await connect();

        const user = await userModel.findOne({ _id });

        return user;
    } catch (error) {
        throw error;
    }
}