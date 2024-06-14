import EmptyState from "../components/empty-state/EmptyState";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col gap-8 justify-center items-center">
      <EmptyState />
      <button className="flex text-white mx-2 gap-4 text-center items-center justify-center text-lg font-bold rounded-full w-36 p-3 pl-4 hover:bg-blue-700 bg-blue-500 transition duration-300 ease-in-out">
        Go Back
      </button>
    </section>
  );
};

export default NotFoundPage;
