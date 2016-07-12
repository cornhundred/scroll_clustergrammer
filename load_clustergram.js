

d3.json('json/mult_view.json', function(network_data){

  // define arguments object
  var args = {
    root: '#graph',
    'network_data': network_data,
    'about':'Zoom, scroll, and click buttons to interact with the clustergram.'
  };

  // resize_container(args);

  // d3.select(window).on('resize',function(){
  //   resize_container(args);
  //   cgm.resize_viz();
  // });

  cgm = Clustergrammer(args);

  d3.select(cgm.params.root + ' .wait_message').remove();

});


// function resize_container(args){

//   var screen_width = window.innerWidth;
//   var screen_height = window.innerHeight - 20;

//   d3.select(args.root)
//     .style('width', screen_width+'px')
//     .style('height', screen_height+'px');
// }
