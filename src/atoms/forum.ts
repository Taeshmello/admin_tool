import { atom } from "jotai";
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
    Lang_idx: number;
    Lang: string;
}
interface menu {
    sectionCode: string;
}
interface MenuName {
    section: number;
    menu_name: string;
    menu_code: string;
    lang_code: string;
}
//Forummanage page(ForumManage.tsx)
export const forumsAtom = atom<Forum[]>([]);
export const isCommentOpenAtom = atom<boolean>(false);
export const isReplyOpenAtom = atom<boolean>(false);
export const selectedFBidxAtom = atom<number | null>(null);
export const selectedForumBoardItemAtom = atom<Forum | null>(null);

//Reply modal (Reply.tsx)
export const fileAtom = atom<File | null>(null)
export const userInfoAtom = atom<{ name: string } | null>(null)


//Comment modal (Comment.tsx)
export const commentsAtom = atom<any[]>([]);

//ForumAdd modal (ForumAdd.tsx)
export const languagesAtom = atom<languages[]>([]);
export const selectedLanguagesAtom = atom<string[]>([]);
export const menuAtom = atom<menu[]>([]);
export const selectedMenuAtom = atom<string | null>(null)



//ForumEdit modal (ForumEdit.tsx)
export const selectedMenuNameAtom = atom<string | null>(null)
export const menuNameAtom = atom<MenuName[]>([])

