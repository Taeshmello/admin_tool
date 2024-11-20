import { atom } from "jotai";

interface ForumMenuBoard {
    CM_idx: number;
    service_code: string;
    Classify: number;
    SectionCode: string;
    LanguageCode: string;
    Title: string;
    CreatedAt: string;
    UserStatus: string;
}

interface ServiceCode {
    service_idx: number;
    service_code: string;
}
interface MenuName {
    section: number;
    menu_name: string;
    menu_code: string;
    lang_code: string;
}
export interface ForumMenuDetailBoard {
    CM_idx: number;
    service_code: string;
    SectionCode: string;
    LanguageCode: string;
    Title: string;
    UserStatus: string;
    AdminStatus: string;
}

//ForumMenuManage page(ForumMenuManage.tsx)
export const ForumMenuBoardAtom = atom<ForumMenuBoard[]>([])
export const filteredForumMenuBoardAtom = atom<ForumMenuBoard[]>([])
export const selectedForumMenuItemAtom = atom<ForumMenuBoard | null>(null)
export const serviceCodeAtom = atom<ServiceCode[]>([])
export const selectedServiceCodeAtom = atom<string>('')
export const isAddOpenAtom = atom<boolean>(false);


//ForumMenuEdit modal (MenuAdd.tsx)
export const selectedServiceIdxCodeAtom = atom<number>()
export const menuNameAtom = atom<MenuName[]>([]);
export const selectedMenuNameAtom = atom<number[]>([]);