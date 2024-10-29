import notFoundStyles from './NotFound.module.css';
import React from 'react';

export const NotFound: React.FC = () => {
    return (
        <div className={notFoundStyles.container}>
            <h1 className={notFoundStyles.title}>Page Not Found</h1>
            <p className={notFoundStyles.message}>이 페이지는 존재하지 않거나 삭제되었습니다.</p>
            <p className={notFoundStyles.secretMessage}>이 페이지는 우주로 사라졌습니다!</p>
            <a href="/" className={notFoundStyles.spaceshipButton}>홈으로 돌아가기</a>
            {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className={`${notFoundStyles.star} ${notFoundStyles[`star${index}`]}`}></div>
            ))}
        </div>
    );
};
