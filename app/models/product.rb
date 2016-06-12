class Product < ActiveRecord::Base
	validates :name, :rate, presence:true
	validates :name, uniqueness:true
	validates :rate, numericality: {greater_than_or_equal_to: 0.99}
end
