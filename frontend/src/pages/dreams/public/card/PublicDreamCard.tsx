import { userAtom } from "@/atoms/userAtom";
import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import { useAtom } from "jotai";
import PublicDreamLikeButton from "./PublicDreamLikeButton";

interface Props {
  dream: Dream;
  updatePublicDreams: () => Promise<void>;
}

const PublicDreamCard = ({ dream, updatePublicDreams }: Props) => {
  const [user] = useAtom(userAtom);
  const isMyDream = user?.id === dream.user_id;
  return (
    <div className="flex flex-col items-center p-4">
      {/* 突起 */}
      <div className="w-[100px] h-[40px] rounded-full bg-[#ffbadf] border-2 border-gray-500 z-10" />

      {/* 軸 */}
      <div className="w-[40px] h-[20px] bg-white border-l-2 border-r-2 border-gray-500 z-0" />

      {/* 本体 */}
      <AlertDialog.Trigger>
        <div
          className={`
            bg-[#fff1fa] relative rounded-t-[95px] rounded-b-[50px] w-[220px] h-[220px] 
            flex flex-col items-center justify-center border-2 border-gray-500
          `}
        >
          <div className="text-base font-mpulus text-center px-6 my-3 line-clamp-3">
            {dream.content}
          </div>
          <div className="bg-white px-4 gap-3 py-2 rounded-2xl flex items-center gap-2">
            {!isMyDream && (
              <PublicDreamLikeButton
                dream={dream}
                updatePublicDreams={updatePublicDreams}
              />
            )}
            <div className="font-ubuntu flex flex-col items-center">
              <span className="text-lg">{dream.likes}</span>
              <p className="text-xs">いいね</p>
            </div>
          </div>
        </div>
      </AlertDialog.Trigger>
    </div>
  );
};

export default PublicDreamCard;
