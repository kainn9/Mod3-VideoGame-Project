class UsersController < ApplicationController

    def create
        user = User.create(userParams)
        user.level = 0
        user.yennies = 0
        user.save
        render json: user 
    end

    def login

        wrongPassword = {
            error: "Wrong info"
        }

        user = User.find_by(username: params[:username])

        if user && user.password_digest == params['password_digest']

            render json: UserSerializer.new(user)
   
        else
       
            User.create(username: params[:username], password: params[:password_digest], yennies: 300, level: 0)
            render json: UserSerializer.new(user)

        end

    end

    def index

        users = User.all 
        render json: UserSerializer.new(users)

    end

    def update

        user = User.find(params[:id])
        user.update(params.require(:user).permit(:level, :yennies))

        render json: {
            message: '---'
        }

    end

    def destroy_items

        user =  User.find(params[:id]);

        user.inventories.each do |rela|
            rela.destroy();
        end

        render json: user.items;
    end

    def show
        user = User.find(params[:id]);
        render json: UserSerializer.new(user);
    end

    def rankings
        
        users = User.all.sort_by { |u| u[:yennies] }.reverse;
        top5 = users.take(10);

        render json: top5

    end

    private

    def userParams
        params.require(:user).permit(:username, :password_digest)    
    end
 
end

