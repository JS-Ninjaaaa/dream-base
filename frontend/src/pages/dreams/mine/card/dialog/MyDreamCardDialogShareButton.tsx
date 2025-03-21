import { Dream } from "@/types/dream";
import { Flex } from "@radix-ui/themes";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

interface MyDreamCardDialogShareButtonProps {
  dream: Dream;
}

const MyDreamCardDialogShareButton = ({
  dream,
}: MyDreamCardDialogShareButtonProps) => {
  return (
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
  );
};

export default MyDreamCardDialogShareButton;
