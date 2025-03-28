import { fetchMyDreams } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream, MyDreamSortKey } from "@/types/dream";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import SakuraScatterEffect from "../components/SakuraScatterEffect";
import MyDreamCards from "./MyDreamCards";
import MyDreamInput from "./form/MyDreamForm";

const MyDreamPage = () => {
  const [myDreams, setMyDreams] = useState<Dream[]>([]);
  // prettier-ignore
  const [myDreamSortKey, setMyDreamSortKey] = useState<MyDreamSortKey>("updated_at");
  const { setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const loadMyDreams = async () => {
      try {
        setIsLoading(true);
        const dreams: Dream[] = await fetchMyDreams(myDreamSortKey);
        setMyDreams(dreams);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadMyDreams();
  }, [myDreamSortKey]);

  return (
    <>
      <Header />
      <SakuraScatterEffect />
      <MyDreamInput setMyDreams={setMyDreams} />
      <div className="flex flex-col items-center py-6">
        <MyDreamCards
          myDreams={{ myDreams, setMyDreams }}
          sortKey={{ myDreamSortKey, setMyDreamSortKey }}
        />
      </div>
    </>
  );
};

export default MyDreamPage;
