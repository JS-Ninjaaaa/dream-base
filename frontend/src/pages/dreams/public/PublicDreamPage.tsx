import { fetchPublicDreams } from "@/api/dreams/public";
import { Dream } from "@/types/dream";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PublicDreamLikeButton from "./PublicDreamLikeButton";
import SakuraEffect from "../components/SakuraEffect";

const DreamCards = () => {
  const [publicDreams, setPublicDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);

  // 初回データ取得
  useEffect(() => {
    const loadPublicDreams = async () => {
      setLoading(true);

      const dreams = await fetchPublicDreams();
      setPublicDreams(dreams);

      setLoading(false);
    };

    void loadPublicDreams();
  }, []);

  return (
    <>
      <Header />
      <SakuraEffect />
        <div className="flex flex-col items-center p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            みんなの夢を見よう！🌸
          </h2>
        </div>
        {loading ? <p>読み込み中...</p> : null}
        <div className="max-w-screen-lg mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {publicDreams.map((dream) => (
              <div
                key={dream.id}
                className="bg-lime-100 rounded-2xl p-6 shadow-lg border border-gray-300 flex flex-col justify-between items-center transition-transform transform hover:scale-105"
              >
                <p className="mb-4 text-gray-700 line-clamp-2">{dream.content}</p>
                <PublicDreamLikeButton
                  dream={dream}
                  setPublicDreams={setPublicDreams}
                />
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default DreamCards;
