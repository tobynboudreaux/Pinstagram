class PostsController < ApplicationController

    def index 
        posts = Post.all
        render json: PostSerializer.new(posts)
    end

    def create
        post = Post.new(post_params)
        post.save
        render json: PostSerializer.new(post)
    end

    private

    def post_params
        params.require(:post).permit(:title, :image_url, :content, :user_id)
    end

end
