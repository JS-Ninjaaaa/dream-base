import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import PublicDreamLikeButton from "../PublicDreamLikeButton";

interface PublicDreamCardProps {
  dream: Dream;
  setPublicDreams: (newPublicDreams: Dream[]) => void;
}

const PublicDreamCard = ({ dream, setPublicDreams }: PublicDreamCardProps) => {
  const [user] = useAtom(userAtom);
  const isMyDream = user?.id === dream.user_id;
  return (
    <div className="relative transition-transform transform hover:scale-105">
      <AlertDialog.Trigger>
        <div className="flex flex-col items-center m-6">
          {/* 突起 */}
          <div className="w-[100px] h-[40px] rounded-full bg-[#ffbadf] border-2 border-gray-500 z-10" />

          {/* 軸 */}
          <div className="w-[40px] h-[20px] bg-white border-l-2 border-r-2 border-gray-500 z-0" />

          {/* 本体 */}
          <div
              className={`
                bg-[#fff1fa] relative rounded-[70px] w-[260px] h-[260px] flex flex-col items-center justify-center gap-2 border-2 border-gray-500
              `}
            >
            <div className="text-base font-mpulus text-center px-6">{dream.content}</div>
            <div className="bg-white px-4 gap-3 py-2 rounded-2xl flex items-center gap-2">
              <div className="font-ubuntu flex flex-col items-center">
                <span className="text-lg">{dream.likes}</span>
                <p className="text-xs">いいね</p>
              </div>
              {!isMyDream && (
                <PublicDreamLikeButton
                dream={dream}
                setPublicDreams={setPublicDreams}
                />
              )}
            </div>
          </div>

        </div>
      </AlertDialog.Trigger>
    </div>
  )
}

export default PublicDreamCard