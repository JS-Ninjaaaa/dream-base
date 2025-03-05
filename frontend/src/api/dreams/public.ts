import { Dream } from "@/types/dream";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const fetchPublicDreams = async (): Promise<Dream[]> => {
  const response = await fetch(`${ENDPOINT}/dreams/public`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("公開されている夢の取得に失敗しました");
  }

  const publicDreams = await response.json();
  return publicDreams;
};

export const increasePublicDreamLikes = async (dreamId: number) => {
  const response = await fetch(`${ENDPOINT}/dreams/public/${dreamId}`, {
    method: "PATCH",
  });
  if (!response.ok) {
    throw new Error("いいね数の更新に失敗しました");
  }

  const updatedDream = await response.json();
  return updatedDream;
};
