import NoDataFound from "../../theme/illustrations";

const EmptyState = () => {
  return (
    <p className="flex flex-col items-center justify-center gap-2">
      <NoDataFound />
      <h2 className="font-bold text-2xl mt-[-50px]">No results found.</h2>
    </p>
  );
};

export default EmptyState;
