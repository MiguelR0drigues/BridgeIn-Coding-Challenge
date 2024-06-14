import { useDispatch } from "react-redux";
import { addComment } from "../../store/commentsSlice";
import { Comment } from "../../types";
import CommentDialog from "../comment-dialog/CommentDialog";

const AddCommentCard = () => {
  const dispatch = useDispatch();
  const handleNewComment = (newComment: Comment) => {
    dispatch(addComment(newComment));
  };
  return (
    <section className="h-40 w-full flex flex-col justify-center items-center border-t-[1px] shadow-md hover:bg-gray-600 bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out">
      <CommentDialog
        title="Add Comment"
        onSubmit={handleNewComment}
        triggerClasses="w-full h-40 p-12"
      >
        <span className="flex justify-between w-full">
          <h2 className="text-2xl text-neutral-400">Post your answer</h2>
          <span className="flex text-white mx-2 gap-4 text-center items-center justify-center text-lg font-bold rounded-full w-36 p-3 pl-4 hover:bg-blue-700 bg-blue-500 transition duration-300 ease-in-out">
            Comment
          </span>
        </span>
      </CommentDialog>
    </section>
  );
};

export default AddCommentCard;
