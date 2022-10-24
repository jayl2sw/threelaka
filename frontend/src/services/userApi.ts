import customAxios from './customAxios';

interface ISignupReqData {
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'secret';
  age: number;
  nickname: string;
}
export interface ISignupRespons {
  userId: number;
  createDate: string;
  role: string;
}

//회원가입
export const createUserApi = async (
  data: ISignupReqData
): Promise<ISignupRespons> => {
  console.log('data는 잘 받아지는지 확인', data);
  const res = await customAxios.post(
    'api/v1/user/auth/signup',
    JSON.stringify(data)
  );
  return res.data;
};

//아이디중복검사
export const idCheckApi = async (id: string) => {
  const res = await customAxios.get(`api/v1/user/auth/check/username/${id}`);
  return res;
};
//닉네임중복검사
export const nicknameCheckApi = async (nickname: string) => {
  const res = await customAxios.get(
    `api/v1/user/auth/check/nickname/${nickname}`
  );
  return res;
};
//이메일중복검사
export const emailCheckApi = async (email: string) => {
  const res = await customAxios.get(`api/v1/user/auth/check/email/${email}`);
  return res;
};
