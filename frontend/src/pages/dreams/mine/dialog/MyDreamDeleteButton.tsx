import { deleteMyDream } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext } from "react";

interface Props {
  dream: Dream;
  updateMyDreams: () => Promise<void>;
  onClose: () => void;
}

const MyDreamDeleteButton = ({ dream, updateMyDreams, onClose }: Props) => {
  const { setIsLoading } = useContext(LoadingContext);

  const handleDeleteButtonClick = async (dreamId: number) => {
    if (confirm("本当に削除しますか？")) {
      try {
        setIsLoading(true);

        await deleteMyDream(dreamId);
        await updateMyDreams();
        onClose();
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
      className="m-2 bg-red-400 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded max-w-[100px]"
      onClick={() => {
        handleDeleteButtonClick(dream.id!);
      }}
    >
      削除
    </button>
  );
};

export default MyDreamDeleteButton;
