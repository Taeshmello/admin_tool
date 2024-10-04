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