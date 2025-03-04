import { fetchMyDreams, toggleVisibility } from "@/api/dreams/mine";
import { Dream } from "@/types/dream";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface MyDreamPrivacyButtonProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const MyDreamPrivacyButton = ({
  dream,
  setMyDreams,
}: MyDreamPrivacyButtonProps) => {
  const handlePrivacyButtonClick = async (dreamId: number) => {
    await toggleVisibility(dreamId);
    const newDreams = await fetchMyDreams();
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
