import { fetchPublicDreams } from "@/api/dreams/public";
import { userAtom } from "@/atoms/userAtom";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { AlertDialog, Flex } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useContext, useEffect, useState } from "react";
import PublicDreamLikeButton from "./PublicDreamLikeButton";

const PublicDreamCards = () => {
  const [publicDreams, setPublicDreams] = useState<Dream[]>([]);
  const [user] = useAtom(userAtom);
  const { setIsLoading } = useContext(LoadingContext);

  // 初回データ取得
  useEffect(() => {
    const loadPublicDreams = async () => {
      try {
        setIsLoading(true);
        const dreams = await fetchPublicDreams();
        setPublicDreams(dreams);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadPublicDreams();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-8">
      {publicDreams.map((dream, index) => {
        const isMyDream = user?.id === dream.user_id;
        return (
          <AlertDialog.Root key={index}>
            <div className="relative transition-transform transform bg-green-100 border-gray-300 hover:scale-105 rounded-xl">
              <AlertDialog.Trigger>
                <div className="border rounded-xl shadow-lg p-5 min-h-48 flex flex-col justify-between items-center">
                  <div className="text-gray-800 overflow-hidden line-clamp-2 break-all">
                    {dream.content}
                  </div>
                  <div className="font-medium mt-5 text-base text-center">
                    {dream.likes} いいね
                  </div>
                </div>
              </AlertDialog.Trigger>
              {!isMyDream && (
                <div className="absolute top-24 z-10 left-1/2 transform -translate-x-1/2">
                  <PublicDreamLikeButton
                    dream={dream}
                    setPublicDreams={setPublicDreams}
                  />
                </div>
              )}
            </div>

            <AlertDialog.Content className="flex flex-col h-full min-h-[300px] max-w-[400px]">
              <AlertDialog.Title></AlertDialog.Title>
              <AlertDialog.Description size="4" className="flex-grow">
                {dream.content}
              </AlertDialog.Description>
              {0 < dream.hashtags.length && (
                <div className="text-center my-4 text-pink-500">
                  {dream.hashtags.map((tag, i) => (
                    <span
                      key={i}
                      className="mr-3 text-sm font-semibold underline"
                    >
                      {"# " + tag.name}
                    </span>
                  ))}
                </div>
              )}
              <Flex direction="column" justify="end" align="center">
                <AlertDialog.Cancel>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded max-w-[100px]">
                    閉じる
                  </button>
                </AlertDialog.Cancel>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        );
      })}
    </div>
  );
};

export default PublicDreamCards;
