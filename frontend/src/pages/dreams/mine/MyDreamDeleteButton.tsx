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
    if (confirm("本当に削除しますか？")) {
      try {
        setIsLoading(true);

        await deleteMyDream(dreamId);
        const myDreams = await fetchMyDreams();

        setMyDreams(myDreams);
      } catch (e) {
        alert("夢の削除に失敗しました");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
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
