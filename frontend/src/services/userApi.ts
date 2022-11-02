import customAxios from './customAxios';

import { SignupPayload, LoginPayload } from '../features/auth/authSlice';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

//회원가입
export const createUserApi = async (data: SignupPayload) => {
  console.log('data는 잘 받아지는지 확인', data);
  const res = await customAxios.post(
    'api/v1/user/auth/signup',
    JSON.stringify(data)
  );
  return res.data;
};

//로그인
export const loginApi = async (data: LoginPayload) => {
  console.log('data는 잘 받아지는지 확인', data);
  const res = await customAxios.post(
    'api/v1/user/auth/login',
    JSON.stringify(data)
  );
  console.log('여기에는토큰있어요', res);
  return res.data;
};

// //로그인
// export const loginApi = async (
//   data: LoginPayload
// ): Promise<ILoginResponse> => {
//   console.log('data는 잘 받아지는지 확인', data);
//   const res = await customAxios.post(
//     'api/v1/user/auth/login',
//     JSON.stringify(data)
//   );
//   console.log("여기에는토큰있어요",res)//이러면 여기는 토큰있는데
//   return res;//이걸 res로 바꿔줘야하는데 그러면 promis객체를 지워줘야함
//   //오류메시지 : Type 'AxiosResponse<any, any>' is missing the following properties from type 'ILoginResponse': accessToken, refreshToken
// };

//아이디중복검사
// export const idCheckApi = async (id: string) => {
//   console.log("중복검사",id)
//   const res = await customAxios.get(`api/v1/user/auth/check/username/${id}`);
//   return res.data;
// };
//닉네임중복검사
export const nicknameCheckApi = async (nickname: string) => {
  const res = await customAxios.get(
    `api/v1/user/auth/check/nickname/${nickname}`
  );
  return res.data;
};
//이메일중복검사
export const emailCheckApi = async (email: string) => {
  const res = await customAxios.get(`api/v1/user/auth/check/email/${email}`);
  return res.data;
};

//유저정보로드
export const userInfoApi = async () => {
  const res = await customAxios.get('api/v1/user/info');
  console.log("어디서막히나",res.data)
  return res.data;
};


export const logoutApi = async () => {
  const res = await customAxios.put('api/v1/user/logout')
  return res
}