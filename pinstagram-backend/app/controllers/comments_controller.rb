class CommentsController < ApplicationController

    def create
        comment = Comment.create(
            content: content,
            post_id: post_id
        )
        render json: comment
    end

end
