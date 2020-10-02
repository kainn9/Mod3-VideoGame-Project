class ItemsController < ApplicationController
    # use this for shop page
    def index
        items = Item.all
        render json: items
    end
end
