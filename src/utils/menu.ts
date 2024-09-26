export const fetchMenuBoard = async ():Promise<any> => {
    try{
        const response = await fetch("http://localhost:5000/menu/board", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include"
        });
        if(!response.ok){   
            throw new Error('메뉴 게시판 조회 요청 실패');
        }
        return await response.json();
    }catch(error){
        console.log('메뉴 게시판 조회 중 오류 발생:',error);
        throw error;
    }
}


export const fetchBoardUserStatus = async ():Promise<any> => {
    try{
        const response = await fetch("http://localhost:5000/menu/userStatus", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include"
        });
        if(!response.ok){   
            throw new Error('메뉴 게시판 조회 요청 실패');
        }
        return await response.json();
    }catch(error){
        console.log('메뉴 게시판 조회 중 오류 발생:',error);
        throw error;
    }
}


export const fetchMenuBoardItem = async (CM_idx:number) =>{
    try{
        const response = await fetch(`http://localhost:5000/menu/menuDetail/${CM_idx}`,{
            method: 'GET',
        });

        if(!response.ok){
            throw new Error('메뉴 조회에 실패')
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error("메뉴 조회 오류:",error)
        throw error;
    }
}