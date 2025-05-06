import { fetchMyDreams } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream, MyDreamSortKey } from "@/types/dream";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/header/Header";
import SakuraScatterEffect from "../components/SakuraScatterEffect";
import MyDreamForm from "./form/MyDreamForm";
import MyDreamCards from "./MyDreamCards";

const MyDreamPage = () => {
  const [myDreams, setMyDreams] = useState<Dream[]>([]);
  // prettier-ignore
  const [myDreamSortKey, setMyDreamSortKey] = useState<MyDreamSortKey>("updated_at");
  const [publishedDreamId, setPublishedDreamId] = useState<number | null>(null);

  const { setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const updateMyDreams = async (updatedDreamId?: number) => {
    try {
      setIsLoading(true);
      const dreams: Dream[] = await fetchMyDreams(myDreamSortKey);
      if (updatedDreamId) {
        setPublishedDreamId(updatedDreamId);
      } else {
        setPublishedDreamId(null);
      }
      setMyDreams(dreams);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    updateMyDreams();
  }, [myDreamSortKey]);

  return (
    <>
      <Header />
      <SakuraScatterEffect />
      <MyDreamForm updateMyDreams={updateMyDreams} />
      <MyDreamCards
        myDreams={{ myDreams, updateMyDreams }}
        sortKey={{ myDreamSortKey, setMyDreamSortKey }}
        publishedDreamId={publishedDreamId}
      />
    </>
  );
};

export default MyDreamPage;
