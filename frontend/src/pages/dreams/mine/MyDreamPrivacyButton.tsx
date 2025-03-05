import { fetchMyDreams, toggleMyDreamVisibility } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface MyDreamPrivacyButtonProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const MyDreamPrivacyButton = ({
  dream,
  setMyDreams,
}: MyDreamPrivacyButtonProps) => {
  const { setIsLoading } = useContext(LoadingContext);

  const handlePrivacyButtonClick = async (dreamId: number) => {
    setIsLoading(true);

    await toggleMyDreamVisibility(dreamId);
    const newDreams = await fetchMyDreams();

    setIsLoading(false);
    setMyDreams(newDreams);
  };

  return (
    <button
      onClick={() => {
        handlePrivacyButtonClick(dream.id!);
      }}
    >
      {dream.is_public ? <VscEye size={24} /> : <VscEyeClosed size={24} />}
    </button>
  );
};

export default MyDreamPrivacyButton;
