json.array!(@products) do |product|
  json.extract! product, :id, :name, :rate
  json.url product_url(product, format: :json)
end
