import { AppContextInterface } from '../App';
import updateLoginInfo from '../helpers/updateLoginInfo';
type Args = {
    method: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'PATCH';
    body?: {};
    ctx: AppContextInterface;
    path: string;
    updateUser: boolean;
}

const makeHttpRequest = async ({ method, body, ctx, path, updateUser }: Args) => {
    const options: any = {
      method: method,
      headers: ctx?.getHeader(),
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(ctx?.baseUrl + path, options);
    console.log(res);
    ctx && updateLoginInfo(res, ctx);
    const data = await res.json();
    console.log(data);
    if (!data || data.errors || data.error || data.exception) {
      return {success: false, data: data}
    } else {
        if (updateUser) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          ctx?.setCurrentUser(data);
      }
      return {success: true, data: data}
    }
}

export default makeHttpRequest;