import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "../../theme/icons";
import { Comment } from "../../types";

export interface Props {
  comment?: Comment;
  triggerClasses?: string;
  triggerIcon?: JSX.Element;
  triggerLabel: string;
  title: string;
  onSubmit: (data: Comment) => void;
}

export type FormData = {
  name: string;
  body?: string;
};

const CommentDialog = ({
  title,
  comment,
  triggerClasses,
  triggerLabel,
  onSubmit,
  triggerIcon,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: comment?.name || "",
    body: comment?.body || "",
  });
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && dialog.current) {
      dialog.current.showModal();
    }
  }, [isOpen]);

  const openDialog = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(true);
  };

  const closeDialog = () => {
    if (dialog.current) {
      dialog.current.close();
    }
    setIsOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleReset = () => {
    setFormData({ name: "", body: "" });
  };
  const handleSubmit = () => {
    onSubmit({
      id: Date.now(),
      email: comment?.email || "",
      body: formData.body || "",
      postId: comment?.postId || 0,
      name: comment?.name || "",
    });
    setFormData({ name: "", body: "" });
    closeDialog();
  };

  return (
    <>
      <button onClick={openDialog} className={triggerClasses}>
        {triggerIcon}
        {triggerLabel}
      </button>
      {isOpen && (
        <dialog
          ref={dialog}
          className="backdrop:bg-neutral-800 backdrop-blur-3xl backdrop:opacity-70 p-0 rounded-md shadow-lg max-w-xl w-full mx-auto bg-gray-800 cursor-default"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            className="relative p-5 rounded-t-md flex items-center justify-between"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <h2 className="font-bold text-white text-xl">{title}</h2>
            <button
              onClick={closeDialog}
              className="grid place-items-center bg-transparent border-none cursor-pointer rounded-full aspect-square w-10 hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              <CloseIcon className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </button>
          </div>
          <fieldset className="flex flex-col p-4 rounded-b-md space-y-4 gap-2">
            <section className="relative">
              <input
                name="title"
                type="text"
                placeholder="Insert a title"
                value={formData?.name}
                onChange={handleInputChange}
                aria-required
                className="peer mt-1 p-2 block w-full rounded-md shadow-sm bg-gray-700 border-b-[1px] border-gray-600 focus:outline-none focus:border-blue-500 placeholder-transparent focus:placeholder-gray-500 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
              <label
                htmlFor="title"
                className="absolute left-2 -top-4 text-gray-300 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Title
              </label>
            </section>
            <section className="relative">
              <textarea
                name="body"
                placeholder="What are you thinking?"
                value={formData?.body}
                onChange={handleInputChange}
                required
                aria-required
                rows={5}
                className="peer mt-1 p-2 block w-full rounded-md bg-gray-700 border-b-[1px] border-gray-600 focus:outline-none focus:border-blue-500 placeholder-transparent focus:placeholder-gray-500 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
              <label
                htmlFor="body"
                className="absolute left-2 -top-4 text-gray-300 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Comment
              </label>
            </section>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleReset();
                }}
              >
                Clear
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </fieldset>
        </dialog>
      )}
    </>
  );
};

export default CommentDialog;
