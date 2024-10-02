import { useState } from "react";

interface ForumAddProp {
    closeAdd: ()=>void
}

const ForumAdd: React.FC<ForumAddProp> = ({closeAdd}) => {
    return(
        <div>
        <button onClick={closeAdd}>닫기</button>
        <button>저장</button>
        </div>
    )
};


export default ForumAdd;