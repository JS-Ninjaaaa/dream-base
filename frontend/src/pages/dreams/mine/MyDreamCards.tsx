import { Dream, MyDreamSortKey } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import MyDreamCardDialog from "./card/dialog/MyDreamCardDialog";
import MyDreamCard from "./card/MyDreamCard";
import MyDreamSortKeySelectBox from "./MyDreamSortKeySelectBox";

interface MyDreamCardsProps {
  myDreams: {
    myDreams: Dream[];
    setMyDreams: (newMyDreams: Dream[]) => void;
  };
  sortKey: {
    myDreamSortKey: MyDreamSortKey;
    setMyDreamSortKey: (sortKey: MyDreamSortKey) => void;
  };
}

const MyDreamCards = ({
  myDreams: { myDreams, setMyDreams },
  sortKey: { myDreamSortKey, setMyDreamSortKey },
}: MyDreamCardsProps) => {
  return (
    <>
      <MyDreamSortKeySelectBox
        myDreamSortKey={myDreamSortKey}
        setMyDreamSortKey={setMyDreamSortKey}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
        {myDreams.map((dream, index) => (
          <AlertDialog.Root key={index}>
            <MyDreamCard dream={dream} setMyDreams={setMyDreams} />
            <MyDreamCardDialog dream={dream} />
          </AlertDialog.Root>
        ))}
      </div>
    </>
  );
};

export default MyDreamCards;
