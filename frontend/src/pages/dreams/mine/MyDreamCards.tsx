import { Dream } from "@/types/dream";
import { AlertDialog, Flex } from "@radix-ui/themes";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import MyDreamDeleteButton from "./MyDreamDeleteButton";
import MyDreamPrivacyButton from "./MyDreamPrivacyButton";

interface MyDreamCardsProps {
  myDreams: Dream[];
  setMyDreams: (newMyDreams: Dream[]) => void;
}

const getPinkGradientClass = (likes: number): string => {
  if (likes >= 100) {
    return "to-pink-500";
  } else if (likes >= 70) {
    return "to-pink-400";
  } else if (likes >= 50) {
    return "to-pink-300";
  } else if (likes >= 30) {
    return "to-pink-200";
  } else if (likes >= 10) {
    return "to-pink-100";
  } else {
    return "to-pink-50";
  }
};

const MyDreamCards = ({ myDreams, setMyDreams }: MyDreamCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
      {myDreams.map((dream, index) => (
        <AlertDialog.Root key={index}>
          <div className="relative transition-transform transform hover:scale-105">
            <AlertDialog.Trigger>
              <div
                // prettier-ignore
                className={`
                  border rounded-xl shadow-lg p-5 min-h-48 bg-gradient-to-b from-white
                  flex flex-col justify-between
                  ${getPinkGradientClass(dream.likes)}
                `}
              >
                <div className="mt-8 text-gray-800 overflow-hidden line-clamp-2">
                  {dream.content}
                </div>
                <div className="font-medium mt-5 mb-2 text-base text-center">
                  {dream.likes} いいね
                </div>
              </div>
            </AlertDialog.Trigger>
            <div className="absolute top-5 left-5 z-10">
              <MyDreamPrivacyButton dream={dream} setMyDreams={setMyDreams} />
            </div>
            <div className="absolute top-5 right-5 z-10">
              <MyDreamDeleteButton dream={dream} setMyDreams={setMyDreams} />
            </div>
          </div>

          <AlertDialog.Content className="flex flex-col h-full min-h-[300px] max-w-[400px]">
            <AlertDialog.Title></AlertDialog.Title>
            <AlertDialog.Description size="4" className="flex-grow">
              {dream.content}
            </AlertDialog.Description>
            {0 < dream.hashtags.length && (
              <div className="text-center my-2 text-pink-500">
                {dream.hashtags.map((tag, i) => (
                  <span key={i} className="mr-2 text-sm font-semibold underline">
                    {"# " + tag.name}
                  </span>
                ))}
              </div>
            )}
            <Flex gap="3" direction="column" justify="end" align="center">
              <p className="text-center font-bold mt-3">
                ＼発信して夢を叶えよう！／
              </p>
              <Flex gap="2" justify="center">
                <FacebookShareButton
                  url={window.location.href}
                  title={dream.content}
                  hashtag="#AprilDream"
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  title={dream.content}
                  hashtags={["AprilDream"]}
                >
                  <XIcon size={40} round />
                </TwitterShareButton>
              </Flex>
              <AlertDialog.Cancel>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded max-w-[100px]">
                  閉じる
                </button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      ))}
    </div>
  );
};

export default MyDreamCards;
