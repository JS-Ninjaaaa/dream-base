import { deleteDream, fetchMyDreams } from "@/api/dreams/mine";
import { Dream } from "@/types/dream";
import { RxCross1 } from "react-icons/rx";

interface MyDreamDeleteButtonProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const MyDreamDeleteButton = ({
  dream,
  setMyDreams,
}: MyDreamDeleteButtonProps) => {
  const handleDeleteButtonClick = async (dreamId: number) => {
    await deleteDream(dreamId);
    const myDreams = await fetchMyDreams();
    setMyDreams(myDreams);
  };

  return (
    <button
      className=""
      onClick={() => {
        handleDeleteButtonClick(dream.id!);
      }}
    >
      <RxCross1 size={20} />
    </button>
  );
};

export default MyDreamDeleteButton;
