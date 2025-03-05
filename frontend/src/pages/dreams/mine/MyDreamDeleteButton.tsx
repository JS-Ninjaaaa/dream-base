import { deleteMyDream, fetchMyDreams } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext } from "react";
import { RxCross1 } from "react-icons/rx";

interface MyDreamDeleteButtonProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const MyDreamDeleteButton = ({
  dream,
  setMyDreams,
}: MyDreamDeleteButtonProps) => {
  const { setIsLoading } = useContext(LoadingContext);

  const handleDeleteButtonClick = async (dreamId: number) => {
    setIsLoading(true);

    await deleteMyDream(dreamId);
    const myDreams = await fetchMyDreams();

    setIsLoading(false);
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
