class CreateInvoices < ActiveRecord::Migration
  def change
    create_table :invoices do |t|
      t.string :invoice_number
      t.date :inv_date
      t.string :customer_name
      t.integer :customer_phone, :limit => 8
      t.string :customer_email
      t.text :products
      t.integer :total

      t.timestamps null: false
    end
  end
end
