json.array!(@invoices) do |invoice|
  json.extract! invoice, :id, :invoice_number, :inv_date, :customer_name, :customer_phone, :customer_email, :products, :total
  json.url invoice_url(invoice, format: :json)
end
