
$(document).ready(function(){



    var selected_product = -1;
    var list_of_already_selected = [];
    var product_rate;
    var div_counter = 0;
    var list_of_added_products = [];
    var products_id_in_db = [];
    var products_quantity_to_db = [];
    var products_added_to_invoice = " ";
    var line_item_label_div = '</div> <div class="line_item_label">'
    var custom_product_added = false;
    var custom_products = []

  // console.log(gon.page_url)
  if(gon.page_url=="/products"||gon.page_url=="/products/new"||gon.page_url=="/"){
    $('.products_tab').addClass('active');
  }
  else if(gon.page_url=="/invoices"||gon.page_url=="/invoices/new"||gon.page_url=="/search"){
    $('.invoices_tab').addClass('active');
  }

  $('.date').datepicker({
        format: "dd/mm/yyyy"
  });

  //check if search params are entered
  $('#search_invoice_btn').click(function(){
    search_text_input = $('#search_text_input').val()
    
      
      $("form").submit(function(e){
          if (!search_text_input.trim()){
            alert("Please enter some search parameters!");
            return false;
          }      
          else {
            return true;
          }
      });
  });
      

  $('#product_select').on('change', function() {

   if (list_of_already_selected.indexOf(this.value)==-1)
   {
   list_of_already_selected.push(this.value);
   selected_product = this.value;
   }
   else if(this.value == 0){
     selected_product = 0;
   }
   else {
    selected_product = -1;
   }
  console.log(this.value);
 });


  $('#add_product_btn').click(function(){

    if(selected_product == -1)
    {
      alert("Please select a valid product (You cannot add the same product to the invoice twice!)")
    }

    //custom line-item
    else if(selected_product ==0){
     
            var $custom_product = $('<div class="parent'+div_counter.toString()+'"> <div class="line_item_label" id="product_label"> Product' +
    line_item_label_div +'Rate' + line_item_label_div +'Quantity' + line_item_label_div + 'Amount' +
    '</div> <br>' +
    '<textarea class="form-control line_item_textbox product_name" id="custom_product'+div_counter.toString()+'"></textarea>' +
    '<div style="float:left"> @ </div>' +
    '<textarea class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="rate"></textarea>' +
    '<div id="multiply_sign" >x </div>'+
    '<textarea  class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="quantity"></textarea>' +
    '<textarea readonly class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="amount"> </textarea>' +
    '<button name="button" type="button" class="btn remove_button'+div_counter.toString()+'" id="remove_product_btn">Remove</button>'+
    '<br> <hr id="below_line_item"> </div>'
      )

    $('#add_line_item').before($custom_product)

    list_of_added_products.push(div_counter);

    custom_product_added = true;
    custom_products.push(div_counter);

    div_counter += 1;

    }
    else{
      // console.log(selected_product);
      product_rate = gon.products[selected_product-1].rate;
      var product_name = gon.products[selected_product-1].name;

      

      var $new_product = $('<div class="parent'+div_counter.toString()+'"> <div class="line_item_label" id="product_label"> Product' +
    line_item_label_div +'Rate' + line_item_label_div +'Quantity' + line_item_label_div + 'Amount' +
    '</div> <br>' +
    '<textarea readonly class="form-control line_item_textbox product_name">'+ product_name + '</textarea>' +
    '<div style="float:left"> @ </div>' +
    '<textarea readonly class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="rate">'+ product_rate + '</textarea>' +
    '<div id="multiply_sign" >x </div>'+
    '<textarea  class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="quantity"> </textarea>' +
    '<textarea readonly class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="amount"> </textarea>' +
    '<button name="button" type="button" class="btn remove_button'+div_counter.toString()+'" id="remove_product_btn">Remove</button>'+
    '<br> <div id="override" class = "class_num'+div_counter.toString()+'"> <a>Override</a> </div> <hr id="below_line_item"> </div>'
      )



      $('#add_line_item').before($new_product)

    list_of_added_products.push(div_counter);
    products_id_in_db.push(selected_product);

    selected_product = -1;
    div_counter += 1;
  }
	});




  $(document).on('focusout', '#quantity',function() {
      // $('#amount').val(calc_amount);
      var className = $(this).attr('class');
      var class_num_name = className.split(' ')[2];
      var calc_amount = this.value * $('#rate.'+class_num_name).val();
      $('#amount.'+class_num_name).val(calc_amount);

      //Add quantity to list for adding to db
      class_num = class_num_name.split('m')[1];
      if(typeof products_quantity_to_db[class_num] === 'undefined') {
        products_quantity_to_db.splice(class_num,0,this.value);
        }
        else {
          products_quantity_to_db[class_num] = this.value;
        }
      // console.log(class_num);
      // console.log(products_quantity_to_db);
  });


  $(document).on('click', '#remove_product_btn',function(){
    var div_className = $(this).attr('class');
    var class_number = div_className.split(' ')[1].split('n')[1];
    $('.parent'+class_number).remove();

    index_of_element = list_of_added_products.indexOf(parseInt(class_number));
    // console.log("class number" +class_number);
    // console.log("Index of elemnt" + index_of_element)
    list_of_added_products.splice(index_of_element,1);
    products_id_in_db.splice(index_of_element,1);
    products_quantity_to_db.splice(index_of_element,1);
    console.log("list of added products"+list_of_added_products);
    console.log(products_id_in_db);
    console.log(products_quantity_to_db);
  });

$('#submit_new_invoice').click(function(){
  for (var i = 0; i < products_id_in_db.length; i++) {

  products_added_to_invoice = products_added_to_invoice + gon.products[parseInt(products_id_in_db[i])-1].name +" x "+products_quantity_to_db[i] +" ; "

  }
  if(custom_product_added==true){
    for( var j=0; j<custom_products.length; j++){
      current_product_name = $("#custom_product"+custom_products[j].toString()).val()
      products_added_to_invoice = products_added_to_invoice + current_product_name + " x "+products_quantity_to_db[custom_products[j]] +" ; "
    }
  }
  $('#products_list_form').val(products_added_to_invoice);
  //alert(products_added_to_invoice);

});

$(document).on('click', '#override',function(){
  override_className = $(this).attr('class');
  $('#rate.'+override_className).prop('readonly', false);
  $('#rate.'+override_className).focus();

});

$('#calc_total').click(function(){
  invoice_total = 0
  for (var i = 0; i < products_id_in_db.length; i++) {
    invoice_total+= parseInt($('#amount.class_num'+i.toString()).val());
  }
  if(custom_product_added==true){
    for( var j=0; j<custom_products.length; j++){
      invoice_total+=parseInt($('#amount.class_num'+custom_products[j].toString()).val());
    }
  }
  $('#invoice_total_textbox').val(invoice_total);
});


});
