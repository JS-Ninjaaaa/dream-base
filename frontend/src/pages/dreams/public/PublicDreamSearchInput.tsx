import { IoSearchOutline } from "react-icons/io5";

interface Props {
  keyword: string;
  setKeyword: (keyword: string) => void;
  updatePublicDreams: () => Promise<void>;
}

const PublicDreamSearchInput = ({
  keyword,
  setKeyword,
  updatePublicDreams,
}: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updatePublicDreams();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto bg-white/90 backdrop-blur-sm"
    >
      <input
        type="text"
        placeholder="キーワードを入力してください"
        value={keyword}
        onChange={handleInputChange}
        className="w-full py-3 pl-4 pr-10 text-gray-700 border-2 border-[#ffbadf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffbadf]/50 placeholder:text-gray-400"
        aria-label="検索キーワード"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="検索実行"
      >
        <IoSearchOutline size={25} />
      </button>
    </form>
  );
};

export default PublicDreamSearchInput;
