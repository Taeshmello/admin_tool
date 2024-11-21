import { useAtom } from 'jotai';
import { gamesAtom } from "../atoms/store";
import { fetchGames } from "../utils/api";

export const useGames = () => {
    const [games, setGames] = useAtom(gamesAtom);

    const loadGames = async () => {
        try {
            const gameList = await fetchGames();
            setGames(gameList);
        } catch (error) {
            console.error('게임 목록을 불러오는 데 실패했습니다:', error);
        }
    };

    return { games, loadGames };
};