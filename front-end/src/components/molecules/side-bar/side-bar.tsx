export default function Sidebar() {
  const dashboardElements = [
    {
      text: "Dashboard",
      icon: ""
    },
    {
      text: "All Tasks",
      icon: ""
    },
    {
      text: "Task Completed",
      icon: ""
    },
    {
      text: "Add Task",
      icon: ""
    }
  ];

  return (
    <>
      <div
        className="w-[40vw] max-w-[300px] flex flex-col items-center justify-start gap-6 pt-8 bg-primary-color rounded-none"
      >
        <div className="w-[90%] flex items-center justify-start gap-4">
          {dashboardElements.map((textIcon, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <div className="w-[40px] h-[35px] rounded-sm">
                <span>{textIcon.icon}</span>
              </div>
              <div className="w-[90%] h-[35px] rounded-sm bg-[#ffddd2]">
                <span>{textIcon.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}