import NoDataFound from "../../theme/illustrations";

const EmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <NoDataFound />
      <h2 className="font-bold text-2xl mt-[-50px]">No results found.</h2>
    </section>
  );
};

export default EmptyState;
