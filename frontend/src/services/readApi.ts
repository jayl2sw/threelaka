import { customAxios } from "./customAxios";

export const getTedScriptApi = async (videoId: string) => {
  await customAxios.get(`video/script/${videoId}`);
}