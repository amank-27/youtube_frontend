import { useState, useEffect } from "react";
import { SingleRowComment } from "./SingleRowComment";

export function Comments(props) {
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    const [comment, setComment] = useState("");
    const [reload, setReload] = useState(true);
    const id = props.id;

    const [data, setData] = useState(null);

    useEffect(() => {
        async function retrieve() {
            const response = await fetch("https://youtube-backend-iukm.onrender.com/comment");
            const result = await response.json();
            setData(result);
        }
        retrieve();
    }, [reload]);

    async function handleSubmitComment() {
        if (comment === "") { return; }

        const saveUser = await fetch("https://youtube-backend-iukm.onrender.com/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userName": userName,
                "email": email,
                "commentData": comment,
                "videoId": id
            })
        });

        const message = await saveUser.json();
        setComment("");
        setReload(!reload);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            {/* Show comment input box if logged in */}
            {userName && (
                <div className="flex flex-col gap-[5px] justify-center items-center">
                    <textarea 
                        value={comment} 
                        onChange={(e) => { setComment(e.target.value); }} 
                        className="w-[50vw] rounded-xl p-[10px] text-black" 
                        placeholder="add your comment"
                    />
                    <button 
                        onClick={handleSubmitComment} 
                        className="border border-red-600 bg-red-600 rounded-lg font-extrabold text-xl p-[5px] w-[20vw]"
                    >
                        Add Comment
                    </button>
                </div>
            )}

            {/* Display comments for this video */}
            {data && data.filter(e => id === e.videoId).map(e => (
                <SingleRowComment key={e._id} data={{ setReload, e, reload, userEmail: email }} />
            ))}
        </div>
    );
}
