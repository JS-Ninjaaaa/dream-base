import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

interface MyDreamFormHashtagListProps {
  hashtags: string[];
  setHashtags: (hashtags: string[]) => void;
}

const MyDreamFormHashtagList = ({
  hashtags,
  setHashtags,
}: MyDreamFormHashtagListProps) => {
  const [hashtag, setHashtag] = useState("");

  const addHashtag = () => {
    const trimmedName = hashtag.trim();
    if (trimmedName.length === 0) {
      return;
    }
    if (hashtags.includes(trimmedName)) {
      return;
    }
    setHashtags([...hashtags, trimmedName]);
    setHashtag("");
  };

  const removeHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter((h) => h !== hashtag));
  };

  return (
    <div className="min-w-xs bg-gray-100 pt-5 p-5 mx-4 my-3 rounded-lg shadow">
      <div className="flex gap-2 mb-3">
        <span className="text-xl text-gray-700 my-2">#</span>
        <input
          type="text"
          value={hashtag}
          onChange={(e) => {
            setHashtag(e.target.value);
          }}
          placeholder="ハッシュタグを入力"
          className="w-full p-2 border rounded focus:outline-none text-gray-700"
        />
        <button
          onClick={() => {
            addHashtag();
          }}
          className="p-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
        >
          <GoPlus size={25} />
        </button>
      </div>
      <div className="mt-2">
        {hashtags.map((hashtag, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white px-3 py-2 rounded shadow mt-2.5"
          >
            <span className="text-gray-700"># {hashtag}</span>
            <button
              onClick={() => {
                removeHashtag(hashtag);
              }}
            >
              <RxCross1 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDreamFormHashtagList;
