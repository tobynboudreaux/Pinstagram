class User < ApplicationRecord
    
    has_secure_password

    has_many :posts
    has_many :comments
    has_many :likes, through: :posts

    validates :username, uniqueness: true
    validates :email, uniqueness: true

   

end
