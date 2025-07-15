const ChartWrapper = ({
  title,
  isOpen,
  toggle,
  children,
  summaryContent,
  fullWidth = false,
}) => {
  return (
    <div className={`col-span-1 ${isOpen && fullWidth ? "col-span-3" : ""} transition-all duration-300`}>
      <div
        className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={toggle} className="text-sm text-blue-600 hover:underline">
            {isOpen ? "Collapse" : "Expand"}
          </button>
        </div>

        <div className="mt-4">
          {isOpen ? children : summaryContent}
        </div>
      </div>
    </div>
  );
};

export default ChartWrapper;