class PostSerializer
    include FastJsonapi::ObjectSerializer
    attributes :title, :image_url, :content, :comments, :likes, :id, :user
end