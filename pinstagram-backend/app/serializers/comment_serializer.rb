class CommentSerializer
    include FastJsonapi::ObjectSerializer
    attributes :content, :post, :user
end