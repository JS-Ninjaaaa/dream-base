import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import MyDreamPrivacyButton from "./MyDreamCardPrivacyButton";

interface MyDreamCardProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const getPinkGradientClass = (likes: number = 0): string => {
  if (likes >= 100) return "to-pink-500";
  if (likes >= 70) return "to-pink-400";
  if (likes >= 50) return "to-pink-300";
  if (likes >= 30) return "to-pink-200";
  if (likes >= 10) return "to-pink-100";
  return "to-pink-50";
};

const MyDreamCard = ({ dream, setMyDreams }: MyDreamCardProps) => {
  const gradientClass = getPinkGradientClass(dream.likes);
  return (
    <AlertDialog.Trigger>
      
      <div className="flex flex-col items-center p-4">
        {/* 突起 */}
        <div className="w-[100px] h-[40px] rounded-full bg-[#ffbadf] border-2 border-gray-500 z-10" />

        {/* 軸 */}
        <div className="w-[40px] h-[20px] bg-white border-l-2 border-r-2 border-gray-500 z-0" />

        {/* 本体 */}
        <div
            className={`
              relative rounded-[70px] xl:w-[260px] xl:h-[260px] md:w-[220px] md:h-[220px] w-[220px] h-[220px] 
              transform transition-transform duration-300
              flex flex-col items-center justify-center gap-2
              bg-gradient-to-b from-white border-2 border-gray-500
              ${gradientClass} 
            `}
          >
          <div className="text-base font-mpulus text-center px-6">{dream.content}</div>
          <div className="bg-white rounded-2xl px-4 py-2 flex flex-col items-center">
            <div className="font-mpulus flex gap-2 items-center">
              <span className="text-lg">{dream.likes}</span>
              <p className="text-xs">いいね</p>
            </div>
            <MyDreamPrivacyButton dream={dream} setMyDreams={setMyDreams} />
          </div>
        </div>
        </div>
    </AlertDialog.Trigger>
  );
};

export default MyDreamCard;
