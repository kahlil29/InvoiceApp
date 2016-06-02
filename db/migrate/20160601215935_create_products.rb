class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.integer :rate

      t.timestamps null: false
    end
  end
end
