import {
  fetchPublicDreams,
  increasePublicDreamLikes,
} from "@/api/dreams/public";
import { userAtom } from "@/atoms/userAtom";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useAtom } from "jotai";
import { useContext } from "react";
import { HiThumbUp } from "react-icons/hi";

interface PublicDreamLikeButtonProps {
  dream: Dream;
  setPublicDreams: (dreams: Dream[]) => void;
}

const PublicDreamLikeButton = ({
  dream,
  setPublicDreams,
}: PublicDreamLikeButtonProps) => {
  const { setIsLoading } = useContext(LoadingContext);
  const [user] = useAtom(userAtom);

  const handleLikeAddButtonClick = async (id: number) => {
    try {
      setIsLoading(true);

      await increasePublicDreamLikes(id);
      const updatedPublicDreams = await fetchPublicDreams();

      setPublicDreams(updatedPublicDreams);
    } catch (e) {
      alert("いいね数の更新に失敗しました");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const likable = user && dream.user_id !== user.id;

  return (
    <button
      className="transition-transform cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleLikeAddButtonClick(dream.id!);
      }}
      disabled={!likable}
    >
      <HiThumbUp size={32} className="text-pink-300" />
    </button>
  );
};

export default PublicDreamLikeButton;
