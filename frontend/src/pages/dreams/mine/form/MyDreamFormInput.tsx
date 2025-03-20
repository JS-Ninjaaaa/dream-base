interface MyDreamFormInputProps {
  content: string;
  setContent: (conent: string) => void;
}

const MyDreamFormInput = ({ content, setContent }: MyDreamFormInputProps) => {
  return (
    <div className="my-3 w-full min-w-sm max-w-lg">
      <div className="w-full h-hull border border-gray-300 rounded-lg p-4 flex items-center justify-center relative bg-white shadow">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ダンスの全国大会で優勝する"
          maxLength={100}
          className="w-full h-40 resize-none px-2 pt-2 pb-6 border-none focus:outline-none text-gray-700"
        />
        <div className="absolute bottom-3 right-3 text-gray-400 text-base">
          {content.length} / 100
        </div>
      </div>
    </div>
  );
};

export default MyDreamFormInput;
