import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { CommentIcon } from "../../theme/icons";
import { Post } from "../../types";

const PostCard = ({ post }: { post: Post }) => {
  const { usersMap } = useSelector((state: RootState) => state.users);

  return (
    <Link
      key={`post-${post.id}-${post.userId}`}
      to={`/${post.id}/comments`}
      className="post h-60 w-full flex flex-col justify-center items-center border-t-[1px] shadow-md p-12 cursor-pointer hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out"
    >
      <div className="w-full flex items-center justify-center first:justify-start ml-5">
        <span className="flex flex-row gap-2 items-center justify-center text-center">
          <Link
            to={`/profile/${post.userId}`}
            className={`rounded-full w-10 h-10 flex-shrink-0 mb-[-30px] text-center flex items-center justify-center hover:brightness-75 duration-300 ease-in-out z-10`}
            style={{ backgroundColor: usersMap[post.userId]?.color }}
          >
            {usersMap[post.userId]?.name.split("")[0]}
          </Link>
          <Link
            to={`/profile/${post.userId}`}
            className="text-lg font-bold hover:underline "
          >
            {usersMap[post.userId]?.name}
          </Link>
          <span className="text-neutral-400 text-sm">
            @{usersMap[post.userId]?.username}
          </span>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <Link
          to={`/${post.id}/comments`}
          className="max-w-[600px] text-xl font-semibold text-blue-400 hover:text-blue-300 first-letter:capitalize text-center hover:underline "
        >
          {post.title}
        </Link>
        <p className="mt-2 max-w-[600px] text-wrap text-justify first-letter:capitalize">
          {post.body}
        </p>
        <span className="flex items-center justify-center gap-2 p-2 px-4 hover:bg-gray-500 duration-300 ease-in-out rounded-full mt-4">
          <CommentIcon />
          Comments
        </span>
      </div>
    </Link>
  );
};

export default PostCard;
