Rails.application.routes.draw do
  resources :users, only: [:create, :index]
  post '/login', to: 'auth#login'
  get '/profile', to: 'users#profile'
  resources :likes
  resources :comments
  resources :posts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
