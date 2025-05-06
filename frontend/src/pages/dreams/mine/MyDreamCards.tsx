import { Dream, MyDreamSortKey } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import { useState } from "react";
import MyDreamCard from "./card/MyDreamCard";
import MyDreamCardDialog from "./dialog/MyDreamCardDialog";
import MyDreamSortKeySelectBox from "./MyDreamSortKeySelectBox";

interface Props {
  myDreams: {
    myDreams: Dream[];
    updateMyDreams: (updatedDreamId?: number) => Promise<void>;
  };
  sortKey: {
    myDreamSortKey: MyDreamSortKey;
    setMyDreamSortKey: (sortKey: MyDreamSortKey) => void;
  };
  publishedDreamId: number | null;
}

const MyDreamCards = ({
  myDreams: { myDreams, updateMyDreams },
  sortKey: { myDreamSortKey, setMyDreamSortKey },
  publishedDreamId,
}: Props) => {
  const [openedDreamId, setOpenedDreamId] = useState<number | null>(null);

  return (
    <>
      <MyDreamSortKeySelectBox
        myDreamSortKey={myDreamSortKey}
        setMyDreamSortKey={setMyDreamSortKey}
      />
      <div className="grid px-8 pb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {myDreams.map((dream, index) => (
          <AlertDialog.Root
            key={index}
            open={openedDreamId === dream.id}
            onOpenChange={(isOpen) => {
              if (isOpen) {
                setOpenedDreamId(dream.id);
              } else {
                setOpenedDreamId(null);
              }
            }}
          >
            <MyDreamCard
              dream={dream}
              published={dream.id === publishedDreamId}
              updateMyDreams={updateMyDreams}
            />
            <MyDreamCardDialog
              dream={dream}
              updateMyDreams={updateMyDreams}
              onClose={() => setOpenedDreamId(null)}
            />
          </AlertDialog.Root>
        ))}
      </div>
    </>
  );
};

export default MyDreamCards;
