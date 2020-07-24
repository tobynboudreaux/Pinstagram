class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :image_url
      t.string :content
      t.integer :like_count

      t.timestamps
    end
  end
end
