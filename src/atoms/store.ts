import { atom } from 'jotai';

interface Permission {
    permissions: string; 
    id: number;         
}
interface UserGame {
    game_name: string;       
    permission_name: string;
}
export const gamesAtom = atom<{ name: string; id: string }[]>([]);
export const permissionsAtom = atom<Permission[]>([]);
export const selectedPermissionsAtom = atom<boolean[]>([]);
export const allSelectedAtom = atom<boolean>(false);
export const selectedGameIdAtom = atom<string>('');
export const userGamesAtom = atom<UserGame[]>([]);