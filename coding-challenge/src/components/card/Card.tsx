import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { myUserId } from "../../constants";
import { removePost } from "../../store/postsSlice";
import { RootState } from "../../store/store";
import { CommentIcon, TrashIcon } from "../../theme/icons";
import { Comment, Post } from "../../types";

const Card = ({ post, comment }: { post?: Post; comment?: Comment }) => {
  const { usersMap } = useSelector((state: RootState) => state.users);
  const params = useParams<{ userId: string }>();
  const dispatch = useDispatch();

  function renderPost() {
    if (!post) return;

    const handleDelete = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: number
    ) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(removePost(id));
    };

    return (
      <Link
        key={`comment${post.id}-${post.userId}`}
        to={`/${post.id}/comments`}
        className="post h-60 w-full flex flex-col justify-center items-center border-t-[1px] shadow-md p-12 cursor-pointer hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out"
      >
        <div className="w-full flex items-center justify-center first:justify-start ml-5">
          <span className="flex flex-row gap-2 items-center justify-center text-center">
            <Link
              to={`/profile/${post.userId}`}
              className={`rounded-full w-10 h-10 flex-shrink-0 mb-[-30px] text-center flex items-center justify-center hover:brightness-75 duration-300 ease-in-out z-10`}
              style={{ backgroundColor: usersMap[post.userId]?.color }}
              onClick={(e) => e.stopPropagation()}
            >
              {usersMap[post.userId]?.name.split("")[0]}
            </Link>
            <Link
              to={`/profile/${post.userId}`}
              className="text-lg font-bold hover:underline "
              onClick={(e) => e.stopPropagation()}
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
          <p className="flex gap-4">
            <span className="flex items-center justify-center gap-2 p-2 px-4 hover:bg-gray-500 duration-300 ease-in-out rounded-full mt-4">
              <CommentIcon />
              Comments
            </span>
            {post.userId === myUserId && (
              <button
                onClick={(e) => handleDelete(e, post.id)}
                className="flex items-center justify-center gap-2 p-2 px-4 hover:bg-gray-500 duration-300 ease-in-out rounded-full mt-4 z-30"
              >
                <TrashIcon />
                Delete
              </button>
            )}
          </p>
        </div>
      </Link>
    );
  }

  function renderComment() {
    if (!comment) return;
    return (
      <div
        key={`comment${comment.id}-${comment.postId}`}
        className="h-60 w-full flex flex-col justify-center items-center border-t-[1px] shadow-md p-12 hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out"
      >
        <div className="w-full flex items-center justify-center first:justify-start ml-5">
          <span className="flex flex-row gap-2 items-center justify-center text-center">
            <span className="text-lg font-bold">{comment.email}</span>
          </span>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <span className="max-w-[600px] text-xl font-semibold text-blue-400 first-letter:capitalize text-center">
            {comment.name}
          </span>
          <p className="mt-2 max-w-[600px] text-wrap text-justify first-letter:capitalize">
            {comment.body}
          </p>
          {params.userId === `${myUserId}` && (
            <button className="flex items-center justify-center gap-2 p-2 px-4 hover:bg-gray-500 duration-300 ease-in-out rounded-full mt-4">
              <TrashIcon />
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{comment ? renderComment() : renderPost()}</>;
};

export default Card;
