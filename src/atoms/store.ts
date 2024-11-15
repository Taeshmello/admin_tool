import { atom } from 'jotai';

interface Permission {
    permissions: string;
    id: number;
}

interface UserGame {
    game_name: string;
    permission_name: string;
}

export interface Categories {
    GC_idx: number;
    game_name: string;
    category: string;
    created_at: string;
    category_name: string
}

export interface Games {
    id: number;
    name: string;
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
interface FaqBoard {
    board_num: number;
    games: string;
    category_name: string;
    title: string;
    created_at: string;
    detail: string;
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

//FaqCategory manage page (Category.tsx)
export const categoriesAtom = atom<Categories[]>([]);
export const selectedCategoryBoardItemAtom = atom<Categories | null>(null);
export const categoryAtom = atom<string>("");

//FaqManage page(FaqManage.tsx)
export const FaqboardAtom = atom<FaqBoard[]>([]);
export const filteredFaqBoardAtom = atom<FaqBoard[]>([]);
export const selectedFaqBoardItemAtom = atom<FaqBoard | null>(null)

//FaqAdd modal (FaqAdd.tsx)
export const detailAtom = atom<string>('');

//ForumMenuManage page(ForumMenuManage.tsx)
export const ForumMenuBoardAtom = atom<ForumMenuBoard[]>([])
export const filteredForumMenuBoardAtom = atom<ForumMenuBoard[]>([])
export const statusAtom = atom<userStatus[]>([])
export const selectedForumMenuItemAtom = atom<ForumMenuBoard | null>(null)
export const serviceCodeAtom = atom<ServiceCode[]>([])
export const selectedServiceCodeAtom = atom<string>('')
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
