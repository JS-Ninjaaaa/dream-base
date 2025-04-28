import { fetchPublicDreams } from "@/api/dreams/public";
import { LoadingContext } from "@/contexts/LoadingContext";
import "@/css/style.css";
import { Dream } from "@/types/dream";
import { useContext, useEffect, useState } from "react";
import Header from "../components/header/Header";
import SakuraScatterEffect from "../components/SakuraScatterEffect";
import PublicDreamCards from "./PublicDreamCards";
import PublicDreamSearchInput from "./PublicDreamSearchInput";

const PublicDreamPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [publicDreams, setPublicDreams] = useState<Dream[]>([]);

  const { setIsLoading } = useContext(LoadingContext);

  const updatePublicDreams = async () => {
    try {
      setIsLoading(true);
      const dreams = await fetchPublicDreams(keyword);
      setPublicDreams(dreams);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updatePublicDreams();
  }, []);

  return (
    <>
      <Header />
      <SakuraScatterEffect />
      <div className="flex flex-col items-center py-6">
        <h1 className="text-2xl font-mpulus sm:m-4 mt-4 mb-8 flex items-center">
          みんなの夢を見よう！
        </h1>
        <PublicDreamSearchInput
          keyword={keyword}
          setKeyword={setKeyword}
          updatePublicDreams={updatePublicDreams}
        />
      </div>
      <PublicDreamCards
        publicDreams={publicDreams}
        updatePublicDreams={updatePublicDreams}
      />
    </>
  );
};

export default PublicDreamPage;
