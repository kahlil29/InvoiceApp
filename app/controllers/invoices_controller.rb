class InvoicesController < ApplicationController
  before_action :set_invoice, only: [:show, :edit, :update, :destroy]

  # GET /invoices
  # GET /invoices.json
  def index
    @invoices = Invoice.reorder(created_at: :desc).paginate(:page => params[:page], :per_page => 5)
    gon.page_url = request.path
  end

  # GET /invoices/1
  # GET /invoices/1.json
  def show
  end

  def search
    gon.page_url = request.path
    #@search_return = Invoice.all
    search_param = params[:invoice_search]
    search_result_products = Invoice.where('products LIKE ?', "%"+search_param+"%").all
    search_result_customer_name = Invoice.where('customer_name LIKE ?', "%"+search_param+"%").all
    @final_search_result = search_result_products + search_result_customer_name
  end

  # GET /invoices/new
  def new
    gon.page_url = request.path
    gon.products = Product.all
    @invoice = Invoice.new
    if (Invoice.count != 0)
      last_invoice_number = Invoice.last
      last_invoice_number = last_invoice_number.invoice_number.to_str
      last_invoice_number = last_invoice_number.split('V')[1].to_i
      next_invoice_number = last_invoice_number + 1
      @next_invoice_number = "INV"+next_invoice_number.to_s.rjust(3, '0') 
    else @next_invoice_number = "INV001"
    end
  end

  # GET /invoices/1/edit
  def edit
  end

  # POST /invoices
  # POST /invoices.json
  def create
    @invoice = Invoice.new(invoice_params)
    gon.page_url = request.path
    gon.products = Product.all

    respond_to do |format|
      if @invoice.save
        format.html { redirect_to invoices_path }
        format.json { render :show, status: :created, location: @invoice }
      else
        format.html { render :new }
        format.json { render json: @invoice.errors, status: :unprocessable_entity }
      end
    end
  end


  # PATCH/PUT /invoices/1
  # PATCH/PUT /invoices/1.json
  def update
    respond_to do |format|
      if @invoice.update(invoice_params)
        format.html { redirect_to @invoice, notice: 'Invoice was successfully updated.' }
        format.json { render :show, status: :ok, location: @invoice }
      else
        format.html { render :edit }
        format.json { render json: @invoice.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /invoices/1
  # DELETE /invoices/1.json
  def destroy
    @invoice.destroy
    respond_to do |format|
      format.html { redirect_to invoices_url, notice: 'Invoice was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_invoice
      @invoice = Invoice.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def invoice_params
      params.require(:invoice).permit(:invoice_number, :inv_date, :customer_name, :customer_phone, :customer_email, :products, :total)
    end
end
