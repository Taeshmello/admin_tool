import { atom } from 'jotai';

// 드롭다운 상태를 boolean으로 명시
export const dropdownAtom = atom<boolean>(false);

// src/atoms/userAtom.ts

export const userIdAtom = atom<string | null>(null);
