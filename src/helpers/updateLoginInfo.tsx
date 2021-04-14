

const updateLoginInfo = (httpRes: Response, ctx: any): void => {
  const accessToken = httpRes.headers.get('access-token');
  const client = httpRes.headers.get('client');
  const uid = httpRes.headers.get('uid');
  console.log(accessToken, client, uid)
  if (client && accessToken && uid) {
    localStorage.setItem('loginInfo', JSON.stringify({ accessToken, client, uid }));
    ctx?.setLoginInfo({ accessToken, uid, client });
  }
};

export default updateLoginInfo;