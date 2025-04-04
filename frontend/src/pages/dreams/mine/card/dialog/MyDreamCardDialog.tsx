import { Dream } from "@/types/dream";
import { AlertDialog, Flex } from "@radix-ui/themes";
import MyDreamCardDialogShareButton from "./MyDreamCardDialogShareButton";
import MyDreamDeleteButton from "../MyDreamCardDeleteButton";

interface MyDreamCardDialogProps {
  dream: Dream;
  setMyDreams: (newMyDreams: Dream[]) => void;
  onClose: () => void;
}

const MyDreamCardDialog = ({ dream, setMyDreams, onClose,  }: MyDreamCardDialogProps) => {
  return (
    <AlertDialog.Content className="flex flex-col h-full min-h-[320px] max-w-[400px]">
      <AlertDialog.Title></AlertDialog.Title>
      <AlertDialog.Description size="4" className="flex-grow">
        <div className="font-mpulus text-2xl text-center">{dream.content}</div>
      </AlertDialog.Description>
      {0 < dream.hashtags.length && (
        <div className="text-center my-2 text-pink-500">
          {dream.hashtags.map((tag, i) => (
            <span key={i} className="mr-3 text-lg font-semibold underline">
              {"# " + tag.name}
            </span>
          ))}
        </div>
      )}
      <Flex gap="3" direction="column" justify="end" align="center">
        <p className="text-center font-bold mt-3">＼発信して夢を叶えよう！／</p>
        <MyDreamCardDialogShareButton dream={dream} />
        <div>
          <AlertDialog.Cancel>
          <MyDreamDeleteButton 
            dream={dream} 
            setMyDreams={setMyDreams} 
            onClose={onClose}
          />
          </AlertDialog.Cancel>
          <AlertDialog.Cancel>
            <button className="m-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded max-w-[100px]">
              閉じる
            </button>
          </AlertDialog.Cancel>
        </div>
      </Flex>
    </AlertDialog.Content>
  );
};

export default MyDreamCardDialog;
