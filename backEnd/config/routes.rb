Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :index, :update, :show]
  resources :items, only: [:index]
  resources :inventories, only:[:create]

  patch '/destroyInv', to: 'users#destroy_items'
  patch '/login', to: 'users#login'
  post '/survivor', to: 'inventories#mass_create'
  delete '/deleteItem', to: 'inventories#sell'
  delete '/scroll', to: 'inventories#scroll'
  post '/pickUP', to: 'inventories#pickup'
  get '/rankings', to: 'users#rankings'
  
end
