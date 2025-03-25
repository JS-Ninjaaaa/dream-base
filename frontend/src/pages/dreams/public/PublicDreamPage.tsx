import Header from "../components/Header";
import SakuraScatterEffect from "../components/SakuraScatterEffect";
import PublicDreamCards from "./PublicDreamCards";
import "../../../css/style.css"

const DreamCards = () => {
  return (
    <>
      <Header />
      <SakuraScatterEffect />
      <div className="flex flex-col items-center py-6">
        <h1 className="text-2xl font-mpulus mb-8 mt-4 flex items-center">
          みんなの夢を見よう！
        </h1>
        <PublicDreamCards />
      </div>
    </>
  );
};

export default DreamCards;
