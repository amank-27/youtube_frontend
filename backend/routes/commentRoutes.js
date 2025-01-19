import { deletComment, editComment, getComment, addComment } from "../controllers/commentController.js";

export function commentRoutes(app){

    app.get("/comment",getComment)

    app.post("/comment",addComment);

    app.put("/comment",editComment);

    app.delete("/comment",deletComment);
    
}
