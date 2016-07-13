
var ini_window_height = window.innerHeight - 100;
if (ini_window_height > 800){
  ini_window_height = 800;
}

d3.select('#graph')
  .style('height', ini_window_height+'px');


d3.json('json/mult_view.json', function(network_data){

  // define arguments object
  var args = {
    root: '#graph',
    'network_data': network_data
    // 'about':'Zoom, scroll, and click buttons to interact with the clustergram.'
  };

  // resize_container(args);

  // d3.select(window).on('resize',function(){
  //   resize_container(args);
  //   cgm.resize_viz();
  // });

  cgm = Clustergrammer(args);

  ini_scroll();

});


function ini_scroll(){

  // define the container and graph
  var gs = graphScroll()
      .container(d3.select('#container'))
      .graph(d3.selectAll('#graph'))
      .sections(d3.selectAll('#sections > .instruction'))
      .on('active', function(i){
        update_section_db(i);
      });

}

function click_reorder_button(inst_rc, inst_order){
  var inst_button = d3.selectAll('.toggle_'+inst_rc+'_order .btn')
    .filter(function(){
      return this.__data__ == inst_order;
    })[0];

  $(inst_button).click();
}

var update_section_db = _.debounce(update_section, 1500);

var section_key = {};
section_key[0] = initialize_view;
section_key[1] = run_reorder;

function initialize_view(){
  console.log('--------- initializing view');
  cgm.update_view({'N_row_sum':'all'})
}

function run_reorder(){
  console.log('--------- sum filtering');
  cgm.update_view({'N_row_sum':20})
}

function update_section(i){

  var inst_function = section_key[i];

  if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
    inst_function();
  } else {
    setTimeout(inst_function, 2000);
  }

  ////////////////////////////////////////
  //  plan
  ////////////////////////////////////////
  // 1) if buttons are not active, then wait 2 seconds and check again

  // 2) if after two seconds you are still in the same section and buttons
  // are active, then redo transformation

  // if (i === 0){
  //   if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
  //     cgm.update_view({'N_row_sum':'all'})
  //   }
  // }
  // if (i===1){
  //   if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
  //     cgm.update_view({'N_row_sum':20})
  //   }
  // }

  // if (i===2) {
  //   if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
  //     click_reorder_button('row','alpha');
  //   }
  // }

  // if (i===3) {
  //   if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
  //     cgm.update_view({'N_row_sum':10})
  //   }
  // }

  // if (i===4) {
  //   if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
  //     cgm.update_view({'N_row_sum':'all'})
  //   }
  // }

}