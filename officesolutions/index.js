$(document).ready(function() {
$('#logout').on('click',function(){

  Cookies.set('isLoggedIn','false')
  window.location="http://localhost/officesolutions/login.html";
});

$('#notLoggedIn').hide();

  if( Cookies.get('isLoggedIn')=='true'){


    $('#main').show();
    $('#notLoggedIn').hide();
    $('#login').hide();
      $('#register').hide();
  }
  else{

    $('#main').hide();
    $('#notLoggedIn').show();
    $('#login').show();
      $('#register').show();
      $('#logout').hide();
  }

  $.ajax({
  url: "https://officesolutions2-api-heroku.herokuapp.com/office-solutions/getData",
  type: "GET",
  success: function(data,textStatus,jqXHR){
    data=JSON.parse(data)
    console.log(data)
    populateData(data)
  },
  error: function(jqXHR,textStatus,errorThrown){}
});
function makeTable(headingLeft,headingRight,dataL,dataR){
  tablestr="<table>";
    tablestr+="<tr>";
  tablestr+="<th>"+headingLeft+"</th>"+"<th>"+headingRight+"</th>";
    tablestr+="</tr>";
  for (i = 0; i < dataL.length; i++) {
    tablestr+="<tr>";
    tablestr+="<td> "+dataL[i]+"</td>";
      tablestr+="<td> $"+dataR[i]+"</td>";
      tablestr+="</tr>";
  }
tablestr+="</table>";
return tablestr;
}
function makeArr(data){
  return $.map(data, function(el) { return el });
}
function transformData(data){
  var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  Tdata=[]
  Categories=[]
  counter=0
  colorCounter=14
  $.each(data,function(k,v){
    Categories.push(k);
  $.each(v['Profit'],function(k2,v2){
    eachData={}
    eachData['name']=k2
    if(counter==0)
    dataArr=[]
    else if(counter==1)
    dataArr=[0]
    else if(counter==2)
    dataArr=[0,0]
    else {
      dataArr=[0,0,0]
    }
    dataArr.push(v2)
      eachData['data']=dataArr;
      eachData['color']=colorArray[colorCounter];
      colorCounter+=1;
      Tdata.push(eachData);
  });
  counter+=1
});
console.log(Tdata)
returnData={}
returnData['cat']=Categories
returnData['data']=Tdata
return returnData
}
function populateData(data){
graphData=data['option1']
transformData=transformData(graphData)
  // $('#collapseOne div').html(data.option1)
  Highcharts.chart('panel-one-graph', {

    chart: {
      type: 'column'
    },

    title: {
      text: 'Top Three States in Each Region'
    },

    xAxis: {
      categories: transformData['cat']
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Sales in USD'
      }
    },

    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
      }
    },

    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },

    series: transformData['data']
  });



//option2
option2Data=data['option2'];
// $.each(option2Data,function(k,v){
//   console.log(k)
// });
$('#collapseTwo div').html(makeTable("Products","Sales",makeArr(option2Data['Category']),makeArr(option2Data['Quantity'])));
option3Data=data['option3'];
$('#collapseThree div').html(makeTable("Product Name","Returns",makeArr(option3Data['Product Name']),makeArr(option3Data['Return'])));
option4NonProfitData=data['option4-nonprofit'];
$('#collapseFour #right-table').html(makeTable("Customer Name","Sales",makeArr(option4NonProfitData['Customer Name']),makeArr(option4NonProfitData['Sales'])));

option4ProfitData=data['option4-profit'];
$('#collapseFour #left-table').html(makeTable("Customer Name","Sales",makeArr(option4ProfitData['Customer Name']),makeArr(option4ProfitData['Sales'])));
}
  // $(".toggle-accordion").on("click", function() {
  //   var accordionId = $(this).attr("accordion-id"),
  //     numPanelOpen = $(accordionId + ' .collapse.in').length;
  //
  //   $(this).toggleClass("active");
  //
  //   if (numPanelOpen == 0) {
  //     openAllPanels(accordionId);
  //   } else {
  //     closeAllPanels(accordionId);
  //   }
  // })
  //
  // openAllPanels = function(aId) {
  //   console.log("setAllPanelOpen");
  //   $(aId + ' .panel-collapse:not(".in")').collapse('show');
  // }
  // closeAllPanels = function(aId) {
  //   console.log("setAllPanelclose");
  //   $(aId + ' .panel-collapse.in').collapse('hide');
  // }

});
