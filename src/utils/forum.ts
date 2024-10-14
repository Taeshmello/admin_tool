export const fetchLanguage = async() => {
    const response = await fetch("http://localhost:5000/forum/languages");
    if(!response.ok){
        throw new Error("언어 목록 가져오기 실패")
    }
    return response.json();
}


export const fetchForum = async() => {
    const response = await fetch("http://localhost:5000/forum/forum");
    if(!response.ok){
        throw new Error("커뮤니티 게시판 가져오기 실패")
    }
    return response.json();
}





export const fetchMenuByServiceCodeId = async(service_idx:number) => {
    const response = await fetch(`http://localhost:5000/forum/menu/${service_idx}`)
    if (!response.ok) {
        throw new Error("메뉴 목록을 가져오는 데 실패했습니다.");
    }
    return response.json();
}