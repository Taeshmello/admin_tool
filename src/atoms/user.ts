import { atom } from 'jotai';
export interface loginedUser{
    idx:number;
    id:string
}
export interface User {
    idx: number;
    id: string;
    signup_date: string;
    game: string;
}
export interface Genre {
    genre_name: string;
}
export interface Permission {
    permissions: string;
    id: number;
}

export interface UserGame {
    game_name: string;
    permission_name: string;
}

//userManage Modal(userDetail.tsx)
export const permissionsAtom = atom<Permission[]>([]);
export const selectedPermissionsAtom = atom<boolean[]>([]);
export const allSelectedAtom = atom<boolean>(false);
export const selectedGameIdAtom = atom<string>('');
export const userGamesAtom = atom<UserGame[]>([]);

//userManage Page(userManage.tsx)
export const usersAtom = atom<User[]>([]);
export const filteredUsersAtom = atom<User[]>([]);
export const selectedUserAtom = atom<User | null>(null);
export const genresAtom = atom<Genre[]>([]);
export const selectedGenreAtom = atom<string>('');