import customAxios from "./customAxios";

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
  role: string,

}
export const createUserApi = async (data: ISignupReqData): Promise<ISignupRespons> => {
  console.log("data는 잘 받아지는지 확인", data)
  const res = await customAxios.post('api/v1/user/auth/signup', JSON.stringify(data))
  return res.data
}
