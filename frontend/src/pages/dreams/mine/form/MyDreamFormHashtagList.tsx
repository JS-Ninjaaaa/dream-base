import { useState } from "react";

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
    <div className="md:flex-row  bg-gray-100 p-4 m-4 rounded-lg shadow">
      <h3 className="text-sm font-semibold">ハッシュタグの追加</h3>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={hashtag}
          onChange={(e) => {
            setHashtag(e.target.value);
          }}
          placeholder="# ハッシュタグ"
          className="w-full p-2 border rounded focus:outline-none text-gray-700"
        />
        <button
          onClick={addHashtag}
          className="px-3 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
        >
          +
        </button>
      </div>
      <div className="mt-2">
        {hashtags.map((hashtag, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white px-3 py-1 rounded shadow mt-2"
          >
            <span className="text-gray-700"># {hashtag}</span>
            <button
              onClick={() => removeHashtag(hashtag)}
              className="text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDreamFormHashtagList;
