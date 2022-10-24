import customAxios from "./customAxios";

interface ISignupReqData {
  email: string;
  password: string;
}
export interface ISignupRespons {
  email: string;
  password: string;
}
export const createUserApi = async (data: ISignupReqData): Promise<ISignupRespons> => {
  console.log("data는 잘 받아지는지 확인", data)
  const res = await customAxios.post('api/v1/user/auth/signup', JSON.stringify(data))
  return res.data
}