class InventoriesController < ApplicationController
    def mass_create
        item_ids = params[:item_ids]
        user_id = params[:user_id]

        if item_ids != []
            item_ids.each do |item_id|
                Inventory.create(user_id: user_id, item_id: item_id)
            end
    
            render json: { message: 'items saved' }
        else
            render json: { message: 'Ya had no items buddy'}

        end
    end

    def create
    
        inv = Inventory.create(params.require(:inventory).permit(:user_id, :item_id));
        user = User.find(params[:user_id]);
        item = Item.find(params[:item_id]);
        user.yennies -= item.value;
        user.save;


        render json: item
    end

    def pickup
        inv = Inventory.create(params.require(:inventory).permit(:user_id, :item_id));
        user = User.find(params[:user_id]);
        item = Item.find(params[:item_id]);
        render json: item
    end

    def sell
        # params.permit(:user_id, :item_id)
        
        user = User.find(params[:user_id])
        delInv = user.inventories.find { |inv| inv.item_id == params[:item_id]}
        value = Item.find(params[:item_id]).value
        delInv.destroy;
        user.yennies += value;
        user.save;
    
        render json: {'yennies': user.yennies};
    end

    def scroll
        # params.permit(:user_id, :item_id)
        
        user = User.find(params[:user_id])
        delInv = user.inventories.find { |inv| inv.item_id == params[:item_id]}
        
        delInv.destroy;
    

    
        render json: {'scroll': 'consumed'}
    end
end
