import { atom } from "jotai";

export interface Categories {
    GC_idx: number;
    game_name: string;
    category: string;
    created_at: string;
    category_name: string
}
//FaqCategory manage page (Category.tsx)
export const categoriesAtom = atom<Categories[]>([]);
export const selectedCategoryBoardItemAtom = atom<Categories | null>(null);
export const categoryAtom = atom<string>("");
export const selectedCategoryAtom = atom<string | null>(null)