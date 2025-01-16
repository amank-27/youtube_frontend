import { useState } from "react";

export function SingleRowComment({ data }) {
  const { setReload, e, reload } = data;
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("email");  // Fetch userEmail from localStorage

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

    console.log("Delete response:", message);  // Debug response from the delete request
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

    console.log("Saving comment:", text);  // Debug the comment being saved

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
    console.log("Update response:", message);  // Debug response from the update request

    if (message.message === "comment updated") {
      setIsEditing(false);
      setReload(!reload);
    } else {
      alert("Failed to update the comment. Please try again.");
    }
  }

  // Debugging: Check the logged-in user's email and the comment's userEmail
  console.log("Current logged-in user's email:", userEmail);
  console.log("Comment userEmail:", e.userEmail);

  return (
    <div className="relative flex gap-5 border border-black-400 bg-purple-600 justify-start items-center w-[60%] rounded-xl">
      <div className="w-[80%] flex gap-5 justify-start items-center">
        <div className="flex gap-2 border border-black-600 w-fit p-[5px] rounded-xl bg-red-600">
         
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

      {/* Debug: Check if the logged-in user's email matches the userEmail in the comment */}
      {userEmail !== e.userEmail && <div className="right-5 text-gray-800">a while ago</div>}
      {userEmail === e.userEmail && (
        <div>
          {/* Only show Edit and Delete options for the logged-in user's comment */}
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
