interface MyDreamFormInputProps {
  content: string;
  setContent: (dream: string) => void;
}

const MyDreamFormInput = ({ content, setContent }: MyDreamFormInputProps) => {
  return (
    <div className="m-4 w-full sm:w-3/4 lg:w-4/5">
      <h2 className="text-lg font-semibold ml-10">
        あなたの夢を教えてください
      </h2>
      <div className="w-full h-hull border border-gray-300 rounded-lg p-4 flex items-center justify-center relative bg-white shadow">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ダンスの全国大会で優勝する"
          maxLength={100}
          className="w-full h-40 resize-none p-2 border-none focus:outline-none text-gray-700"
        />
        <div className="absolute top-2 right-2 text-gray-400 text-sm">
          {content.length}/100
        </div>
      </div>
    </div>
  );
};

export default MyDreamFormInput;
