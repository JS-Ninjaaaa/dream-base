import { fetchMyDreams, toggleMyDreamVisibility } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext } from "react";

interface MyDreamPrivacyButtonProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const MyDreamPrivacyButton = ({
  dream,
  setMyDreams,
}: MyDreamPrivacyButtonProps) => {
  const { setIsLoading } = useContext(LoadingContext);

  const handleToggle = async (dreamId: number) => {
    try {
      setIsLoading(true);

      await toggleMyDreamVisibility(dreamId);
      const newDreams = await fetchMyDreams();

      setMyDreams(newDreams);
    } catch (e) {
      alert("夢の公開設定の変更に失敗しました");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggle(dream.id!);
      }}
      className="w-11 h-6 rounded-full flex items-center px-1 transition-colors duration-300"
      style={{ backgroundColor: dream.is_public ? "#ffbadf" : "#c4c4c4" }}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full border-[1px] border-[#d1d5db] transition-transform duration-300 ${
          dream.is_public ? "translate-x-4.5" : "-translate-x-0.5"
        }`}
      ></div>
    </button>
  );
};

export default MyDreamPrivacyButton;
