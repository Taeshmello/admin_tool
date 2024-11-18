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

interface MenuName {
    section: number;
    menu_name: string;
    menu_code: string;
    lang_code: string;
}
interface Forum {
    FB_idx: number;
    ServiceCode: string;
    Category: string;
    LanguageCode: string;
    Title: string;
    HaveFile: string;
    UserId: string;
    UserIp: string;
    CreatedAt: string;
    UserStatus: string;
}



interface languages {
    Lang_idx:number;
    Lang:string;
}

interface menu {    
    sectionCode: string;
}



//공용
export const gamesAtom = atom<{ name: string; id: string }[]>([]);
export const isModalOpenAtom = atom<boolean>(false);
export const isEditModalOpenAtom = atom<boolean>(false);
export const selectedGameAtom = atom<string>('');
export const selectedGameIdxAtom = atom<number | null>(null)
export const titleAtom = atom<string>('');
export const searchTermAtom = atom<string>('');
export const selectedUserStatusAtom = atom<string | null>(null);
export const selectedAdminStatusAtom = atom<string | null>(null);
export const adminStatusAtom = atom<AdminStatus[]>([])
export const selectedCategoryAtom = atom<string | null>(null)
export const statusAtom = atom<userStatus[]>([])
export const serviceCodeAtom = atom<ServiceCode[]>([])
export const selectedServiceCodeAtom = atom<string>('')


//FaqAdd modal (FaqAdd.tsx)
export const detailAtom = atom<string>('');

//ForumMenuManage page(ForumMenuManage.tsx)
export const ForumMenuBoardAtom = atom<ForumMenuBoard[]>([])
export const filteredForumMenuBoardAtom = atom<ForumMenuBoard[]>([])
export const selectedForumMenuItemAtom = atom<ForumMenuBoard | null>(null)
export const isAddOpenAtom = atom<boolean>(false);  

//ForumMenuEdit modal (MenuAdd.tsx)
export const selectedServiceIdxCodeAtom = atom<number>()
export const menuNameAtom = atom<MenuName[]>([]);
export const selectedMenuNameAtom = atom<number[]>([]);



//Forummanage page(ForumManage.tsx)
export const forumsAtom = atom<Forum[]>([]);
export const isCommentOpenAtom = atom<boolean>(false);
export const isReplyOpenAtom = atom<boolean>(false);
export const selectedFBidxAtom = atom<number | null>(null);
export const selectedForumBoardItemAtom = atom<Forum | null>(null);


//Reply modal (Reply.tsx)
export const fileAtom = atom<File | null>(null)
export const userInfoAtom = atom<{name:string} | null>(null)

//Comment modal (Comment.tsx)
export const commentsAtom = atom<any[]>([]);    


//ForumAdd modal (ForumAdd.tsx)
export const languagesAtom = atom<languages[]>([])
export const selectedLanguagesAtom = atom<string[]>([]);