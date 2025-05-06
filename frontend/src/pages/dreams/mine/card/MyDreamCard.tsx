import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import MyDreamPrivacyButton from "./MyDreamPrivacyButton";

interface Props {
  dream: Dream;
  published: boolean;
  updateMyDreams: (updatedDreamId?: number) => Promise<void>;
}

const getPinkGradientClass = (likes: number = 0): string => {
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
  }
  return "to-pink-50";
};

const MyDreamCard = ({ published, dream, updateMyDreams }: Props) => {
  const gradientClass = getPinkGradientClass(dream.likes);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (published && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      const centerx = rect.left + rect.width / 2;
      const centery = rect.top + rect.height / 2;

      confetti({
        origin: {
          x: centerx / window.innerWidth,
          y: centery / window.innerHeight,
        },
        colors: ["#FCCDE5", "#FBB1BD", "#F8BBD0"], // 桜色
      });
    }
  }, [dream, published]);

  return (
    <div className="flex flex-col items-center p-4">
      <AlertDialog.Trigger>
        <div
          ref={cardRef}
          className={`
            relative rounded-[35px] w-[230px] h-[220px]
            flex flex-col items-center justify-center gap-2
            bg-gradient-to-b from-white border-2 border-gray-500
            ${gradientClass}
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out
            hover:-translate-y-2
            cursor-pointer
          `}
        >
          <div className="text-base font-mpulus text-center px-6 mt-3 mb-1 line-clamp-3">
            {dream.content}
          </div>
          <div className="bg-white rounded-2xl px-4 py-2 flex gap-2 items-center">
            <MyDreamPrivacyButton
              dream={dream}
              updateMyDreams={updateMyDreams}
            />
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

export default MyDreamCard;
