import { Link } from "react-router-dom";
import { LeftArrowIcon } from "../../theme/icons";

const Header = ({
  children,
  hasGoBack = false,
}: {
  children: React.ReactNode;
  hasGoBack?: boolean;
}) => {
  return (
    <header
      className={`h-28 flex gap-4 justify-start items-center ${hasGoBack ? "ml-6" : "ml-12"}`}
    >
      {hasGoBack && (
        <Link
          to={`/`}
          className="rounded-full w-10 h-10 flex-shrink-0 text-center flex items-center justify-center hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
        >
          <LeftArrowIcon />
        </Link>
      )}
      {children}
    </header>
  );
};

export default Header;
