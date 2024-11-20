import { atom } from 'jotai';

export interface Permission {
    permissions: string;
    id: number;
}

export interface UserGame {
    game_name: string;
    permission_name: string;
}

export interface Games {
    id: number;
    name: string;
}

interface userStatus {
    check_status: string;
}
interface ServiceCode {
    service_idx: number;
    service_code: string;
}

interface AdminStatus {
    admin_status: string;
}

//공용
export const gamesAtom = atom<{ name: string; id: string }[]>([]);

//모달 관련
export const isModalOpenAtom = atom<boolean>(false);
export const isEditModalOpenAtom = atom<boolean>(false);
export const isAddOpenAtom = atom<boolean>(false);
//게임 관련
export const selectedGameAtom = atom<string>('');
export const selectedGameIdxAtom = atom<number | null>(null);


export const titleAtom = atom<string>('');
export const searchTermAtom = atom<string>('');
export const selectedAdminStatusAtom = atom<string | null>(null);
export const adminStatusAtom = atom<AdminStatus[]>([])
export const selectedCategoryAtom = atom<string | null>(null)
export const statusAtom = atom<userStatus[]>([]);
export const selectedUserStatusAtom = atom<string | null>(null);
export const serviceCodeAtom = atom<ServiceCode[]>([]);
export const selectedServiceCodeAtom = atom<string>('');
export const selectedServiceCodeIdxAtom = atom<number | null>(null);
export const detailAtom = atom<string>("")



