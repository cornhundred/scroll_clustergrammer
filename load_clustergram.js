

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
      .sections(d3.selectAll('#sections > div'))
      .on('active', function(i){

        // Set up something to wait two seconds and then check if the viz is in
        // the requested state. All state instructions should be given at each step

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
            cgm.update_view({'N_row_sum':10})
          }
        } else if (i===3) {
          if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
            cgm.update_view({'N_row_sum':'all'})
          }
        }


      })

  // this is necessary for scrolling to see the last section
  d3.select('#source')
      .style({ 'margin-top': '400px'});

  function allow_scroll(){
    console.log('scroll')
    d3.select('body').style('overflow','visible');
  }

}

// function resize_container(args){

//   var screen_width = window.innerWidth;
//   var screen_height = window.innerHeight - 20;

//   d3.select(args.root)
//     .style('width', screen_width+'px')
//     .style('height', screen_height+'px');
// }
