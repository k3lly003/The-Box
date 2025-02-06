import { User } from  '../types/user';

type GetUsersFilters = {
    limit: number;
    pages: number;
};

export async function getUsers(filters?:GetUsersFilters) {
    await new Promise((resolve)=> setTimeout(resolve,1000));
    return [{id: 1, name: 'Darius'}] as User[];
}