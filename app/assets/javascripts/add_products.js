
$(document).ready(function(){


    var selected_product = -1;
    var list_of_already_selected = [];
    var product_rate;
    var div_counter = 0;

  if(gon.page_url=="/products"||gon.page_url=="/products/new"){
    $('.products_tab').addClass('active');
  }
  else if(gon.page_url=="/invoices"||gon.page_url=="/invoices/new"){
    $('.invoices_tab').addClass('active');
  }


  $('#product_select').on('change', function() {

   if (list_of_already_selected.indexOf(this.value)==-1)
   {
   list_of_already_selected.push(this.value);
   selected_product = this.value;
   }
   else {
     selected_product = -1;
   }
  console.log(this.value);
 });


  $('#add_product_btn').click(function(){
		// $(this).addClass('btn-success');
    if(selected_product == -1)
    {
      alert("Please select a valid product (You cannot add the same product to the invoice twice!)")
    }
    else if(selected_product ==0){
      alert("add html for custom product and make provision to add amount of custom product in final total");
    }
    else{
      // console.log(selected_product);
      product_rate = gon.products[selected_product-1].rate;
      var product_name = gon.products[selected_product-1].name;
  //     var $new_product = $(`<div class="parent">
  //   <div class="line_item_label" id="product_label">
  //     Product
  //   </div>
  //   <div class="line_item_label">
  //     Rate
  //   </div>
  //   <div class="line_item_label">
  //     Quantity
  //   </div>
  //   <div class="line_item_label">
  //     Amount
  //   </div>
  //   <br>
  //   <textarea readonly class="form-control line_item_textbox" id="product_name">`+ product_name + `</textarea>
  //   <div style="float:left"> @ </div>
  //   <textarea readonly disabled class="form-control line_item_textbox class_num`+div_counter.toString()+`" id="rate">`+ product_rate + `</textarea>
  //   <div id="multiply_sign" >x </div>
  //   <textarea  class="form-control line_item_textbox class_num`+div_counter.toString()+`" id="quantity"> </textarea>
  //   <textarea readonly class="form-control line_item_textbox class_num`+div_counter.toString()+`" id="amount"> </textarea>
  //   <br>
  //   <br>
  //   <hr id="below_line_item">
  // </div>`)
      $('#add_line_item').before($new_product)
    }
    selected_product = -1;
    div_counter += 1;
	});


  $(document).on('change', '#quantity',function() {

      // $('#amount').val(calc_amount);
      var className = $(this).attr('class');
      var class_num_name = className.split(' ')[2];
      var calc_amount = this.value * $('#rate.'+class_num_name).val();
      $('#amount.'+class_num_name).val(calc_amount);

  });

});
