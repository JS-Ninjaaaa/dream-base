import { fetchMyDreams } from "@/api/dreams/mine";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import SakuraScatterEffect from "../components/SakuraScatterEffect";
import MyDreamCards from "./MyDreamCards";
import MyDreamInput from "./MyDreamInput";

const MyDreamPage = () => {
  const [myDreams, setMyDreams] = useState<Dream[]>([]);
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

        const dreams: Dream[] = await fetchMyDreams();
        setMyDreams(dreams);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadMyDreams();
  }, []);

  return (
    <div>
      <Header />
      <SakuraScatterEffect />
      <MyDreamInput setMyDreams={setMyDreams} />
      <MyDreamCards myDreams={myDreams} setMyDreams={setMyDreams} />
    </div>
  );
};

export default MyDreamPage;
