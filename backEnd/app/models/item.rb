class Item < ApplicationRecord
    has_many :inventories
    has_many :users, through: :inventories
end
