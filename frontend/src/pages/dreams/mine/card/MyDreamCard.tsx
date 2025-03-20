import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import MyDreamDeleteButton from "./MyDreamCardDeleteButton";
import MyDreamPrivacyButton from "./MyDreamCardPrivacyButton";

interface MyDreamCardProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const getPinkGradientClass = (likes: number): string => {
  if (likes >= 100) {
    return "to-pink-500";
  } else if (likes >= 70) {
    return "to-pink-400";
  } else if (likes >= 50) {
    return "to-pink-300";
  } else if (likes >= 30) {
    return "to-pink-200";
  } else if (likes >= 10) {
    return "to-pink-100";
  } else {
    return "to-pink-50";
  }
};

const MyDreamCard = ({ dream, setMyDreams }: MyDreamCardProps) => {
  return (
    <div className="relative transition-transform transform hover:scale-105">
      <AlertDialog.Trigger>
        <div
          // prettier-ignore
          className={`
          border rounded-xl shadow-lg p-5 min-h-48 bg-gradient-to-b from-white
          flex flex-col justify-between
          ${getPinkGradientClass(dream.likes)}
        `}
        >
          <div className="mt-8 text-gray-800 overflow-hidden line-clamp-2">
            {dream.content}
          </div>
          <div className="font-medium mt-5 mb-2 text-base text-center">
            {dream.likes} いいね
          </div>
        </div>
      </AlertDialog.Trigger>
      <div className="absolute top-5 left-5 z-10">
        <MyDreamPrivacyButton dream={dream} setMyDreams={setMyDreams} />
      </div>
      <div className="absolute top-5 right-5 z-10">
        <MyDreamDeleteButton dream={dream} setMyDreams={setMyDreams} />
      </div>
    </div>
  );
};

export default MyDreamCard;
