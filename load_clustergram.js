

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

        ////////////////////////////////////////
        //  plan
        ////////////////////////////////////////
        // 1) if buttons are not active, then wait 2 seconds and check again

        // 2) if after two seconds you are still in the same section and buttons
        // are active, then redo transformation

        has_stopped_db(i);

        if (i === 0){
          if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
            cgm.update_view({'N_row_sum':'all'})
          }
        }
        else if (i===1){
          if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
            cgm.update_view({'N_row_sum':20})
          }
        } else if (i===2) {
          if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
            click_reorder_button('row','alpha');
          }
        } else if (i===3) {
          if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
            cgm.update_view({'N_row_sum':10})
          }
        } else if (i===4) {
          if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
            cgm.update_view({'N_row_sum':'all'})
          }
        }

      });

  // this is necessary for scrolling to see the last section
  d3.select('#source')
      .style({ 'margin-top': '800px'});

}

function click_reorder_button(inst_rc, inst_order){
  var inst_button = d3.selectAll('.toggle_'+inst_rc+'_order .btn')
    .filter(function(){
      return this.__data__ == inst_order;
    })[0];

  $(inst_button).click();
}

var has_stopped = function(i){console.log('has stopped ' + String(i))};

var has_stopped_db = _.debounce(has_stopped, 1000);