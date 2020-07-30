Rails.application.routes.draw do
  resources :users, only: [:create]
  post '/login', to: 'auth#login'
  get '/loggedin', to: 'auth#logged_in'
  
  resources :likes
  resources :comments
  resources :posts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
