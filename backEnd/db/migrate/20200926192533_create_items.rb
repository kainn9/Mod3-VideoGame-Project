class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.text :description
      t.string :type
      t.integer :value


      t.timestamps null: false
    end
  end
end
