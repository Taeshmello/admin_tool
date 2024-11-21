import { atom } from "jotai";
interface FaqBoard {
    board_num: number;
    games: string;
    category_name: string;
    title: string;
    created_at: string;
    detail: string;
}

export interface Board {
    board_num: number; 
    games: number;
    category_name: string;
    title: string;
    detail: string;
}
//FaqManage page(FaqManage.tsx)
export const FaqboardAtom = atom<FaqBoard[]>([]);
export const filteredFaqBoardAtom = atom<FaqBoard[]>([]);
export const selectedFaqBoardItemAtom = atom<FaqBoard | null>(null)

//FaqAdd modal (FaqAdd.tsx)
export const detailAtom = atom<string>('');