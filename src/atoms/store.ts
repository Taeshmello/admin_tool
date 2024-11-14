import { atom } from 'jotai';

export interface Permission {
    permissions: string; 
    id: number;         
}

export interface loginedUser{
    idx: number;
    id: string;
}
export interface UserGame {
    game_name: string;       
    permission_name: string;
}

export interface Categories {
    GC_idx: number;
    game_name: string;
    category: string;
    created_at: string;
}

export interface Games{
    name:string
}

interface User {
    idx: number;
    id: string;
    signup_date: string;
    game: string;
}   
interface Genre {
    genre_name: string;
}
//userManage Modal(userDetail.tsx)
export const gamesAtom = atom<{ name: string; id: string }[]>([]);
export const permissionsAtom = atom<Permission[]>([]);
export const selectedPermissionsAtom = atom<boolean[]>([]);
export const allSelectedAtom = atom<boolean>(false);
export const selectedGameIdAtom = atom<string>(''); 
export const userGamesAtom = atom<UserGame[]>([]);  

//userManage Page(userManage.tsx)
export const usersAtom = atom<User[]>([]);
export const filteredUsersAtom = atom<User[]>([]);
export const searchTermAtom = atom<string>('');
export const selectedUserAtom = atom<User | null>(null);
export const isModalOpenAtom = atom<boolean>(false);
export const genresAtom = atom<Genre[]>([]);    