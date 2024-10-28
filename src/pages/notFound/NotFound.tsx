import notFoundStyles from './NotFound.module.css';
import React from 'react';

export const NotFound: React.FC = () => {
    return (
        <div className={notFoundStyles.container}>
            <h1 className={notFoundStyles.title}>404</h1>
            <p className={notFoundStyles.message}>이 페이지는 존재하지 않습니다.</p>
            <p className={notFoundStyles.seceretMessage}>이 페이지는 우주에 사라졌습니다!</p>
            <a href="/" className={notFoundStyles.button}>홈으로 돌아가기</a>
        </div>
    );
};
