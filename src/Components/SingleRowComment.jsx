import { useState } from "react";

export function SingleRowComment({ data }) {
  const { setReload, e, reload, userEmail } = data;
  const userName = localStorage.getItem("userName");

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(e.commentData);

  // Handle deleting comment
  async function handleDelete(commentId) {
    console.log("Attempting to delete comment:", commentId);

    const deleteUser = await fetch("https://youtube-backend-iukm.onrender.com/comment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: commentId })
    });
    const message = await deleteUser.json();

    console.log("Delete response:", message);
    if (message.message === "comment deleted") {
      setReload(!reload);
    } else {
      alert("Failed to delete the comment. Please try again.");
    }
  }

  // Handle starting the editing process
  function handleEdit() {
    setIsEditing(true);
  }

  // Handle saving the edited comment
  async function handleSaveEdit() {
    if (text === "") {
      alert("Comment can't be empty");
      return;
    }

    console.log("Saving comment:", text);

    const updateComment = await fetch("https://youtube-backend-iukm.onrender.com/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        commentData: text,
        id: e._id
      })
    });
    const message = await updateComment.json();
    console.log("Update response:", message);

    if (message.message === "comment updated") {
      setIsEditing(false);
      setReload(!reload);
    } else {
      alert("Failed to update the comment. Please try again.");
    }
  }

  // Display logic for Edit/Delete only if the logged-in user is the one who posted the comment
  return (
    <div className="relative flex gap-5 border border-black-400 bg-[#668B8B] justify-start items-center w-[60%] rounded-xl">
      <div className="w-[80%] flex gap-5 pl-4 justify-start items-center">
        <div className="flex gap-2  w-fit p-[5px] rounded-xl text-white bg-[#668B8B]">
          <div>{e.userName}</div>
        </div>
        {!isEditing && <div className="text-black">{e.commentData}</div>}
        {isEditing && (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)} // Update text on change
            className="text-black rounded-lg p-[2px]"
          />
        )}
      </div>

      {/* Only show the time if the email is not the same */}
      {userEmail !== e.userEmail && <div className="right-5 text-gray-800">Recently</div>}

      {/* Show Edit/Delete buttons only if the logged-in user is the author of the comment */}
      {userEmail === e.userEmail && (
        <div>
          {!isEditing && (
            <div
              className="cursor-pointer text-black font-semibold"
              onClick={handleEdit}
            >
              Edit
            </div>
          )}
          {isEditing && (
            <div
              className="cursor-pointer text-black font-semibold"
              onClick={handleSaveEdit}
            >
              Save
            </div>
          )}
          <div
            onClick={() => handleDelete(e._id)}
            className="cursor-pointer text-black font-semibold"
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
}
