import Header from "../components/Header";
import SakuraScatterEffect from "../components/SakuraScatterEffect";
import PublicDreamCards from "./PublicDreamCards";

const DreamCards = () => {
  return (
    <>
      <Header />
      <SakuraScatterEffect />
      <div className="flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          みんなの夢を見よう！🌸
        </h1>
        <PublicDreamCards />
      </div>
    </>
  );
};

export default DreamCards;
