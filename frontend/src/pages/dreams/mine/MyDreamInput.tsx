import { createMyDream, fetchMyDreams } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext, useState } from "react";

interface MyDreamInputProps {
  setMyDreams: (dreams: Dream[]) => void;
}

const MyDreamInput = ({ setMyDreams }: MyDreamInputProps) => {
  const [dream, setDream] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState("");

  const { setIsLoading } = useContext(LoadingContext);

  const handlePrivacyToggleClick = () => {
    setIsPublic((prev) => !prev);
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag("");
    }
  };

  const removeHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter((h) => h !== hashtag));
  };

  const handleSaveButtonClick = async () => {
    try {
      const newDream = {
        content: dream,
        is_public: isPublic,
        likes: 0,
        hashtags: hashtags,
      };
      setIsLoading(true);

      await createMyDream(newDream);
      const myDreams: Dream[] = await fetchMyDreams();

      setMyDreams(myDreams);
      setDream("");
    } catch (e) {
      alert("夢の保存に失敗しました");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div className="flex w-full flex-col sm:flex-row px-4">
        
        <div className="m-4 w-full sm:w-3/4 lg:w-4/5">
        <h2 className="text-lg font-semibold ml-10">あなたの夢を教えてください</h2>
          {/* 入力エリア */}
          <div className="w-full h-hull border border-gray-300 rounded-lg p-4 flex items-center justify-center relative bg-white shadow">
            <textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="ダンスの全国大会で優勝する"
              maxLength={100}
              className="w-full h-40 resize-none p-2 border-none focus:outline-none text-gray-700"
            />
            <div className="absolute top-2 right-2 text-gray-400 text-sm">{dream.length}/100</div>
          </div>
        </div>

        <div className="md:flex-row  bg-gray-100 p-4 m-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold">ハッシュタグの追加</h3>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
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
              <div key={index} className="flex justify-between items-center bg-white px-3 py-1 rounded shadow mt-2">
                <span className="text-gray-700"># {hashtag}</span>
                <button onClick={() => removeHashtag(hashtag)} className="text-red-400 hover:text-red-600">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="text-gray-600">close</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={handlePrivacyToggleClick}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-gray-300 peer-focus:ring-4 peer-focus:ring-pink-200 rounded-full peer peer-checked:bg-pink-400 after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:border after:rounded-full after:transition-all after:left-1 after:top-0.5 peer-checked:after:translate-x-5"></div>
        </label>
        <span className="text-pink-500">open</span>
        <button
          onClick={handleSaveButtonClick}
          className="px-6 py-2 rounded-md bg-pink-400 hover:bg-green-400 text-white mt-4 hover:bg-pink-500  transition"
        >
          保存する
        </button>
      </div>
    </div>
  );
};

export default MyDreamInput;
