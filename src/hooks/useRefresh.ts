import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { refreshAccessToken } from '../utils/api';

import { SetCookieFunction, RemoveCookieFunction } from '../types'; // 수정된 타입 가져오기

const useRefreshToken = (
  setCookie: SetCookieFunction,
  removeCookie: RemoveCookieFunction
) => {
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    const refreshToken = async () => {
      if (!cookies.accessToken) {
        await refreshAccessToken(setCookie, removeCookie);
      }
    };

    refreshToken();
  }, [cookies.accessToken, setCookie, removeCookie]);
};

export default useRefreshToken;
