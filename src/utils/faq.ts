export const fetchGames = async () => {
    const response = await fetch("http://localhost:5000/faq/games");
    if (!response.ok) {
        throw new Error("게임 목록을 가져오는 데 실패했습니다.");
    }
    return response.json();
};

// 게임 ID에 따라 카테고리 목록을 가져오는 API 호출
export const fetchCategoriesByGameId = async (gameId: number) => {
    const response = await fetch(`http://localhost:5000/faq/categories/${gameId}`);
    if (!response.ok) {
        throw new Error("카테고리 목록을 가져오는 데 실패했습니다.");
    }
    return response.json();
};



import { useCookies } from 'react-cookie';

export const fetchUserId = async (userId:any) => {
    const [cookies] = useCookies(['accessToken']); // 쿠키에서 accessToken 가져오기
    const token = cookies.accessToken; // accessToken

    const response = await fetch("http://localhost:5000/userId", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // 쿠키에서 가져온 액세스 토큰 사용
        },
    });

    if (!response.ok) {
        throw new Error("유저 ID를 가져오는 데 실패했습니다.");
    }

    const data = await response.json();
    return data.userId; // 유저 ID 반환
};

 

