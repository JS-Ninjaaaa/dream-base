import { Dream } from "@/types/dream";
import { AlertDialog, Flex } from "@radix-ui/themes";
import MyDreamCardDialogShareButton from "./MyDreamCardDialogShareButton";

interface MyDreamCardDialogProps {
  dream: Dream;
}

const MyDreamCardDialog = ({ dream }: MyDreamCardDialogProps) => {
  return (
    <AlertDialog.Content className="flex flex-col h-full min-h-[300px] max-w-[400px]">
      <AlertDialog.Title></AlertDialog.Title>
      <AlertDialog.Description size="4" className="flex-grow">
        {dream.content}
      </AlertDialog.Description>
      {0 < dream.hashtags.length && (
        <div className="text-center my-2 text-pink-500">
          {dream.hashtags.map((tag, i) => (
            <span key={i} className="mr-3 text-sm font-semibold underline">
              {"# " + tag.name}
            </span>
          ))}
        </div>
      )}
      <Flex gap="3" direction="column" justify="end" align="center">
        <p className="text-center font-bold mt-3">＼発信して夢を叶えよう！／</p>

        <MyDreamCardDialogShareButton dream={dream} />

        <AlertDialog.Cancel>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded max-w-[100px]">
            閉じる
          </button>
        </AlertDialog.Cancel>
      </Flex>
    </AlertDialog.Content>
  );
};

export default MyDreamCardDialog;
