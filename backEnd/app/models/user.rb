class User < ApplicationRecord
    has_secure_password
    has_many :inventories
    has_many :items, through: :inventories

    validates :username, uniqueness: true
end
