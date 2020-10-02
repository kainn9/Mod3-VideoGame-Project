class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :level, :yennies, :items, :id
end
