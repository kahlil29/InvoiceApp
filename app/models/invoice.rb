class Invoice < ActiveRecord::Base
	validates :invoice_number, :inv_date, :customer_name, :customer_phone, :customer_email, :products, presence: true
	validates :invoice_number, uniqueness:true
	
end
