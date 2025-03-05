import { fetchPublicDreams } from "@/api/dreams/public";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { AlertDialog, Flex } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import PublicDreamLikeButton from "./PublicDreamLikeButton";

const PublicDreamCards = () => {
  const [publicDreams, setPublicDreams] = useState<Dream[]>([]);
  const { setIsLoading } = useContext(LoadingContext);

  // 初回データ取得
  useEffect(() => {
    const loadPublicDreams = async () => {
      setIsLoading(true);

      const dreams = await fetchPublicDreams();

      setIsLoading(false);
      setPublicDreams(dreams);
    };

    loadPublicDreams();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-8">
      {publicDreams.map((dream, index) => (
        <AlertDialog.Root key={index}>
          <div className="relative transition-transform transform hover:scale-105">
            <AlertDialog.Trigger>
              <div className="border rounded-xl shadow-lg p-5 min-h-48 bg-green-100 flex flex-col justify-between align-center">
                <div className="text-gray-800 overflow-hidden line-clamp-2">
                  {dream.content}
                </div>
                <div className="font-medium mt-5 text-base text-center">
                  {dream.likes} いいね
                </div>
              </div>
            </AlertDialog.Trigger>
            <div className="absolute top-23 z-10 left-1/2 transform -translate-x-1/2">
              <PublicDreamLikeButton
                dream={dream}
                setPublicDreams={setPublicDreams}
              />
            </div>
          </div>

          <AlertDialog.Content className="flex flex-col h-full min-h-[300px] max-w-[400px]">
            <AlertDialog.Title></AlertDialog.Title>
            <AlertDialog.Description size="4" className="flex-grow">
              {dream.content}
            </AlertDialog.Description>
            <Flex direction="column" justify="end" align="center">
              <AlertDialog.Cancel>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded max-w-[100px]">
                  閉じる
                </button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      ))}
    </div>
  );
};

export default PublicDreamCards;
