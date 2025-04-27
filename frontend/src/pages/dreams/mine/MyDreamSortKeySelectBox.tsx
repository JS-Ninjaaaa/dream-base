import { MyDreamSortKey } from "@/types/dream";

interface Props {
  myDreamSortKey: MyDreamSortKey;
  setMyDreamSortKey: (sortKey: MyDreamSortKey) => void;
}

const MyDreamSortKeySelectBox = ({
  myDreamSortKey,
  setMyDreamSortKey,
}: Props) => {
  return (
    <div className="my-5 ml-10 flex items-center gap-2">
      <span className="text-gray-600">並び替え:</span>
      <select
        value={myDreamSortKey}
        onChange={(event) => {
          setMyDreamSortKey(event.target.value as MyDreamSortKey);
        }}
        className="border rounded px-3 py-1 bg-white text-gray-800 shadow-sm"
      >
        <option value="updated_at">更新日順</option>
        <option value="likes">いいね順</option>
      </select>
    </div>
  );
};

export default MyDreamSortKeySelectBox;
