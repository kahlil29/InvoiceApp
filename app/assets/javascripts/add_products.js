
$(document).ready(function(){



    var selected_product = -1;
    var list_of_already_selected = [];
    var product_rate;
    var div_counter = 0;
    var list_of_added_products = [];
    var products_id_in_db = [];
    var products_quantity_to_db = [];
    var products_added_to_invoice = " ";

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

      var line_item_label_div = '</div> <div class="line_item_label">'

      var $new_product = $('<div class="parent'+div_counter.toString()+'"> <div class="line_item_label" id="product_label"> Product' +
    line_item_label_div +'Rate' + line_item_label_div +'Quantity' + line_item_label_div + 'Amount' +
    '</div> <br>' +
    '<textarea readonly class="form-control line_item_textbox" id="product_name">'+ product_name + '</textarea>' +
    '<div style="float:left"> @ </div>' +
    '<textarea readonly disabled class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="rate">'+ product_rate + '</textarea>' +
    '<div id="multiply_sign" >x </div>'+
    '<textarea  class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="quantity"> </textarea>' +
    '<textarea readonly class="form-control line_item_textbox class_num'+div_counter.toString()+'" id="amount"> </textarea>' +
    '<button name="button" type="button" class="btn remove_button'+div_counter.toString()+'" id="remove_product_btn">Remove</button>'+
    '<br> <hr id="below_line_item"> </div>'
      )



      $('#add_line_item').before($new_product)

    list_of_added_products.push(div_counter);
    products_id_in_db.push(selected_product);

    selected_product = -1;
    div_counter += 1;
  }
	});




  $(document).on('change', '#quantity',function() {
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
  $('#products_list_form').val(products_added_to_invoice);
  //alert(products_added_to_invoice);

});

});
