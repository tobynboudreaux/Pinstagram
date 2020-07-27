# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'securerandom'

Post.delete_all
Like.delete_all
Comment.delete_all

post_collection = []

# 10.times do 

# title = 
# image_url = 
# content = Faker::Quotes::Shakespeare
# post_collection << Post.create(title: title, image_url: image_url, content: content)

# end

# post_collection.each do |post|

#     content = Faker::
  

# end

# end

Post.create(title: "Yeet", image_url: "http://www.opsopet.com/wp-content/uploads/2017/06/Siberian-Husky.jpg", content: ["lol, this is a post lol."], like_count: 2)

Post.create(title: "Burnnn!", image_url: "https://images.unsplash.com/photo-1556195332-95503f664ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80", content: ["Yay Magic!!!"], like_count: 10)

Comment.create(content: "Lol, very funny lol", post_id: 1)

Comment.create(content: "Yay Magic !!!", post_id: 2)

Like.create(post_id: 1) 
Like.create(post_id: 2) 