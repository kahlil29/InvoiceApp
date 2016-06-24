class Invoice < ActiveRecord::Base
	validates :invoice_number, :inv_date, :customer_name, :customer_phone, :customer_email, :products, :total, presence: true
	validates :invoice_number, uniqueness:true
	validates :total, numericality: {greater_than_or_equal_to: 0.99}
end
