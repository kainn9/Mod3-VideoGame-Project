class AdjustTypeColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :items, :type
    add_column :items, :itemType, :string
  end
end
