import { increasePublicDreamLikes } from "@/api/dreams/public";
import { userAtom } from "@/atoms/userAtom";
import { Dream } from "@/types/dream";
import { useAtom } from "jotai";
import { HiThumbUp } from "react-icons/hi";

interface PublicDreamLikeButtonProps {
  dream: Dream;
  setPublicDreams: (dreams: Dream[]) => void;
}

const PublicDreamLikeButton = ({
  dream,
  setPublicDreams,
}: PublicDreamLikeButtonProps) => {
  const [user] = useAtom(userAtom);

  const handleLikeAddButtonClick = async (id: number) => {
    const updatedPublicDreams = await increasePublicDreamLikes(id);
    setPublicDreams(updatedPublicDreams);
  };

  const likable = user && dream.user_id !== user.id;

  return (
    <button
      className="text-yellow-500 text-3xl hover:scale-110 transition-transform cursor-pointer"
      onClick={() => {
        handleLikeAddButtonClick(dream.id!);
      }}
      disabled={!likable}
    >
      <HiThumbUp size={35} className="text-pink-300" />
    </button>
  );
};

export default PublicDreamLikeButton;
