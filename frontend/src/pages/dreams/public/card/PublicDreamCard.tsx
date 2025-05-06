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
      <AlertDialog.Trigger>
        <div
          className={`
            bg-[#fff1fa] relative rounded-[35px] w-[230px] h-[220px] 
            flex flex-col items-center justify-center border-2 border-gray-500
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out
            hover:-translate-y-2
            cursor-pointer
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
