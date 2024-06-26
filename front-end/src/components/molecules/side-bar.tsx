export default function Sidebar() {
  return (
    <div // acting as sidebar
      className="w-[40vw] max-w-[300px] flex flex-col items-center justify-start gap-6 pt-12 bg-primary-color rounded-none"
    >
      {
        Array.from({ length: 4 }, (_, i) => i).map((index) => (
          <div key={index} className="w-[90%] flex items-center justify-start gap-4">
            <div className="w-[40px] h-[35px] rounded-sm bg-[#ffddd2]" />

            <div className="w-[90%] h-[35px] rounded-sm bg-[#ffddd2]" />
          </div>
        ))
      }
    </div>
  );
}
