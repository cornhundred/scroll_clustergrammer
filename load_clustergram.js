
var tutorial_info;

function animate_arrow() {
  var repeat_time = 600;

  d3.select('#scroll_arrow')
    .transition()
    .ease('linear')
    .style('margin-top', '-15px')
    .transition()
    .ease('linear')
    .duration(repeat_time)
    .style('margin-top', '0px')
    .transition()
    .ease('linear')
    .duration(repeat_time)
    .style('margin-top', '-15px')
    .each("end", animate_arrow);
}

// make text section
var tutorial_info;
d3.json('tutorial_info.json', function(tmp_info){

  d3.select('#sections')
    .selectAll('.instructions')
    .data(tmp_info)
    .enter()
    .append('div')
    .classed('instruction', true)
    .each(function(d){

      d3.select(this)
        .append('h3')
        .text(d.title);

      var paragraphs = d.text;

      d3.select(this)
        .selectAll('p')
        .data(paragraphs)
        .enter()
        .append('p')
        .classed('instruction_text', true)
        .html(function(p){
          return p;
        });

      if (d.title === 'Introduction'){

        d3.select(this)
          .append('text')
          .classed('fa',true)
          .classed('fa-caret-down',true)
          .classed('icon_buttons',true)
          .attr('id', 'scroll_arrow')
          .style('font-size','80px')
          .style('text-align', 'center')
          .style('width','100%');

      }

    });

    tutorial_info = tmp_info;

});

var ini_window_height = window.innerHeight - 150;
var max_height = 700;
if (ini_window_height > max_height){
  ini_window_height = max_height;
}

var prev_section = 0;

d3.select('#graph')
  .style('height', ini_window_height+'px');


// make clustergram
////////////////////////////////
d3.json('json/mult_view.json', function(network_data){

  var args = {
    root: '#graph',
    'network_data': network_data
  };
  cgm = Clustergrammer(args);
  ini_scroll();

  d3.select('#source')
    .style('display','block');

  animate_arrow();

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

var section_fun = {};


section_fun['initialize_view'] = function initialize_view(){
  console.log('initializing view');
  click_reorder_button('row','clust');
  click_reorder_button('col ','clust');
  cgm.update_view({'N_row_sum':'all'});
}

section_fun['run_filter_sum_10'] = function run_filter_sum_10(){
  console.log('sum filtering');
  cgm.update_view({'N_row_sum':10});
}

section_fun['run_filter_sum_20'] = function run_filter_sum_20(){
  console.log('sum filtering');
  cgm.update_view({'N_row_sum':20});
}

section_fun['run_filter_var_10'] = function run_filter_var_10(){
  console.log('variance filtering');
  cgm.update_view({'N_row_var':10});
}

section_fun['reorder_row_alpha'] = function reorder_row_alpha(){
  console.log('reorder row alpha');
  click_reorder_button('row','alpha');
}

section_fun['reorder_row_var'] = function reorder_row_var(){
  console.log('reorder row variance');

  var highlight_class = 'toggle_row_order';
  var duration = 4000;
  d3.select(cgm.params.root+' .'+highlight_class)
    .style('background','#007f00')
    .style('box-shadow','0px 0px 10px 5px #007f00')
    .transition().duration(1).delay(duration)
    .style('background','#FFFFFF')
    .style('box-shadow','none');

  click_reorder_button('row','rankvar');
}

section_fun['run_conclusions'] = function run_conclusions(){
  console.log('in conclusion');
  click_reorder_button('row','clust');
  click_reorder_button('col ','clust');
}

section_fun['zoom_and_pan'] = function run_conclusions(){
  console.log('zoom_and_pan');
  setTimeout(function(){cgm.zoom(3)}, 0);
  setTimeout(function(){cgm.zoom(1)}, 1500);
}


var update_section_db = _.debounce(update_section, 1500);

function update_section(current_section){

  if (prev_section != current_section){

    prev_section = current_section;

    var function_name = tutorial_info[current_section].run_function;
    var inst_function = section_fun[function_name];

    // run if buttons are active
    if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
      inst_function();

    // wait if still transitioning
    } else {

      ///////////////
      // need to check that you are in the same section
      setTimeout(inst_function, 2000);
    }

  } else {
    console.log('already in section - do not run\n')
  }

}