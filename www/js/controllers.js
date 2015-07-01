angular.module('starter.controllers', ['ionic','nfcFilters'])




.controller('AppCtrl',function($scope, $ionicModal, $timeout, $http) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  $scope.auth_code = function(uid,pid){
	  var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	  var tok = uid + ':' + pid;
	  var hash = Base64.encode(tok);
	  return "Basic " + hash;
  } 
  $scope.highchart_data_value = [];
  $scope.highchart_data_value1 = [];
  $scope.highchart_data_value2 = [];
  $scope.highchart_mem_value = [];
  $scope.highchart_data_tm = [];
  $scope.highchart_mem_value1 = [];
  $scope.highchart_mem_value2 = [];
  $scope.highchart_mem_value3 = [];
  $scope.highchart_mem_tm = [];
  $scope.cnt = 0;
  $scope.highchart_rx = [];
  $scope.highchart_tx = [];
  $scope.highchart_txrx_tm = [];
  $scope.highchart_df_value1= [];
  $scope.highchart_df_value2= {};
  $scope.highchart_df_value3= [];

	  
  $scope.highchart_data = function(host) {
	  $scope.highchart_data_value.length = 0;
	  $scope.highchart_data_value1.length = 0;
	  $scope.highchart_data_value2.length = 0;
	  $scope.highchart_data_tm.length = 0;
	  $scope.highchart_mem_value.length = 0;
	  $scope.highchart_mem_value1.length = 0;
	  $scope.highchart_mem_value2.length = 0;
	  $scope.highchart_mem_value3.length = 0;
	  $scope.highchart_mem_tm.length = 0;
	  $scope.highchart_rx.length = 0;
	  $scope.highchart_tx.length = 0;
	  $scope.highchart_txrx_tm.length = 0;
	  $scope.highchart_df_value1.length = 0;
	  $scope.highchart_df_value2.length = 0;
	  $scope.highchart_df_value3.length = 0;
	  
	  var now = new Date();
	  var time1 = now.getTime();
//	  var tm = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
	  var time0 = (new Date).getTime() - 3600000;
	  
	  var t = $scope.auth_code("272admin","test1234");
	  
	//CPU usage data
	  $http.get('http://54.148.3.176:8080/_search?q=plugin:load AND host:"'+host+'" AND @timestamp:>'+time0+' AND @timestamp:<='+time1+'&size=100&fields=longterm,midterm,shortterm,host,@timestamp&sort=@timestamp',{ 
		    headers: { 
		        "authorization": t
		    }
		}).then(function(items) { 
		  var m  = items.data; 
//	  var m = {"took":42,"timed_out":false,"_shards":{"total":31,"successful":31,"failed":0},"hits":{"total":482217,"max_score":0.43707702,"hits":[{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0M_06kJFugunkBgYvy","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.67]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NAg4MJFugunkBgYyt","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.59]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBUKtJFugunkBgY2U","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.47]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBZDVJFugunkBgY21","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.47]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBqJiJFugunkBgY4N","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.43]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCMQLJFugunkBgY6R","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.38]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCYjWJFugunkBgY7T","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.35]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCubrJFugunkBgY8r","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.32]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCppyJFugunkBgY8V","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.33]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0M_tlrJFugunkBgYvR","_score":0.4365323,"fields":{"host":["localhost"],"longterm":[0.69]}}]}};
		  n = m.hits.hits;		  
		  n.map(function(i){ 
			  $scope.highchart_data_value.push(i.fields.longterm[0]);
			  $scope.highchart_data_value1.push(i.fields.midterm[0]);
			  $scope.highchart_data_value2.push(i.fields.shortterm[0]);
			  $scope.highchart_data_tm.push(i.fields['@timestamp'][0].split('.')[0].split('T').join('#'));
		  });
		
		  
	  });
	  
	  function uniq_fast(a) {
		    var seen = {};
		    var out = [];
		    var len = a.length;
		    var j = 0;
		    for(var i = 0; i < len; i++) {
		         var item = a[i];
		         if(seen[item] !== 1) {
		               seen[item] = 1;
		               out[j++] = item;
		         }
		    }
		    return out;
		}
	  //Memory usage data
	  $http.get('http://54.148.3.176:8080/_search?q=plugin:memory AND host:"'+host+'" AND @timestamp:>'+time0+' AND @timestamp:<='+time1+'&size=100&fields=type_instance,value,host,@timestamp&sort=@timestamp',{ 
		    headers: { 
		        "authorization": t
		    }
		}).then(function(items) { 
		  var m  = items.data;
		  var g = [], h = [];
		  //	  var m = {"took":42,"timed_out":false,"_shards":{"total":31,"successful":31,"failed":0},"hits":{"total":482217,"max_score":0.43707702,"hits":[{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0M_06kJFugunkBgYvy","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.67]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NAg4MJFugunkBgYyt","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.59]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBUKtJFugunkBgY2U","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.47]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBZDVJFugunkBgY21","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.47]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBqJiJFugunkBgY4N","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.43]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCMQLJFugunkBgY6R","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.38]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCYjWJFugunkBgY7T","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.35]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCubrJFugunkBgY8r","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.32]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCppyJFugunkBgY8V","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.33]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0M_tlrJFugunkBgYvR","_score":0.4365323,"fields":{"host":["localhost"],"longterm":[0.69]}}]}};
		  n = m.hits.hits;		  
		  n.map(function(i){ 
			  if(i.fields.type_instance[0].toString().trim() === "free")
			  $scope.highchart_mem_value.push(parseFloat(i.fields.value[0])/1024/1024);
			  if(i.fields.type_instance[0].toString().trim() === "used")
			  $scope.highchart_mem_value1.push(parseFloat(i.fields.value[0])/1024/1024);
			  if(i.fields.type_instance[0].toString().trim() === "cached")
			  $scope.highchart_mem_value2.push(parseFloat(i.fields.value[0])/1024/1024);
			  if(i.fields.type_instance[0].toString().trim() === "buffered")
			  $scope.highchart_mem_value3.push(parseFloat(i.fields.value[0])/1024/1024);
			  g.push(i.fields['@timestamp'][0].split('.')[0].split('T').join('#'));
		  });
		  h = uniq_fast(g).slice();
		  h.map(function(j){
			  $scope.highchart_mem_tm.push(j);
		  })
	  });
	  
	//Bandwidth usage data  
	  $http.get('http://54.148.3.176:8080/_search?q=plugin:interface AND host:"'+host+'" AND @timestamp:>'+time0+' AND @timestamp:<='+time1+'&size=100&fields=rx,tx,host,@timestamp&sort=@timestamp',{ 
		    headers: { 
		        "authorization": t
		    }
		}).then(function(items) { 
		  var m  = items.data;
		  var g = [];
		  //	  var m = {"took":42,"timed_out":false,"_shards":{"total":31,"successful":31,"failed":0},"hits":{"total":482217,"max_score":0.43707702,"hits":[{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0M_06kJFugunkBgYvy","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.67]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NAg4MJFugunkBgYyt","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.59]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBUKtJFugunkBgY2U","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.47]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBZDVJFugunkBgY21","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.47]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NBqJiJFugunkBgY4N","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.43]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCMQLJFugunkBgY6R","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.38]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCYjWJFugunkBgY7T","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.35]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCubrJFugunkBgY8r","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.32]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0NCppyJFugunkBgY8V","_score":0.43707702,"fields":{"host":["localhost"],"longterm":[0.33]}},{"_index":"logstash-2015.05.01","_type":"collectd","_id":"AU0M_tlrJFugunkBgYvR","_score":0.4365323,"fields":{"host":["localhost"],"longterm":[0.69]}}]}};
		  n = m.hits.hits;		  
		  n.map(function(i){ 
			  $scope.highchart_rx.push(i.fields.rx[0]/1024/1024);
			  $scope.highchart_tx.push(i.fields.tx[0]/1024/1024);
			  $scope.highchart_txrx_tm.push(i.fields['@timestamp'][0].split('.')[0].split('T').join('#'));
		  });
		  
	  });
	  
	//Storage usage data  
	  $http.get('http://54.148.3.176:8080/_search?q=plugin:df AND host:"'+host+'"&size=3&fields=type_instance,value,host,@timestamp&sort=@timestamp:desc',{ 
		    headers: { 
		        "authorization": t
		    }
		}).then(function(items) { 
		  var m  = items.data;
		  var g="",h="",d="";
//		  	  var m = {"took":24,"timed_out":false,"_shards":{"total":36,"successful":35,"failed":1,"failures":[{"index":".kibana","shard":0,"status":400,"reason":"SearchParseException[[.kibana][0]: query[+plugin:df +host:localhost],from[-1],size[3]: Parse Failure [Failed to parse source [{\"size\":3,\"query\":{\"query_string\":{\"query\":\"plugin:df AND host:localhost\",\"lowercase_expanded_terms\":true,\"analyze_wildcard\":false}},\"fields\":[\"type_instance\",\"value\",\"host\",\"@timestamp\"],\"sort\":[{\"@timestamp\":{\"order\":\"desc\"}}]}]]]; nested: SearchParseException[[.kibana][0]: query[+plugin:df +host:localhost],from[-1],size[3]: Parse Failure [No mapping found for [@timestamp] in order to sort on]]; "}]},"hits":{"total":154809,"max_score":null,"hits":[{"_index":"logstash-2015.05.03","_type":"collectd","_id":"AU0XjyosJFugunkBhIVf","_score":null,"fields":{"host":["localhost"],"type_instance":["free"],"@timestamp":["2015-05-03T02:16:07.848Z"],"value":[2.1417889792E10]},"sort":[1430619367848]},{"_index":"logstash-2015.05.03","_type":"collectd","_id":"AU0XjyosJFugunkBhIVg","_score":null,"fields":{"host":["localhost"],"type_instance":["reserved"],"@timestamp":["2015-05-03T02:16:07.848Z"],"value":[1.3901824E9]},"sort":[1430619367848]},{"_index":"logstash-2015.05.03","_type":"collectd","_id":"AU0XjyosJFugunkBhIVh","_score":null,"fields":{"host":["localhost"],"type_instance":["used"],"@timestamp":["2015-05-03T02:16:07.848Z"],"value":[8.754262016E9]},"sort":[1430619367848]}]}};
		  n = m.hits.hits;		  
		  n.map(function(i){ 
			  if(i.fields.type_instance[0].toString().trim() === "free")
				  g= parseFloat(i.fields.value[0]);
			  if(i.fields.type_instance[0].toString().trim() === "used")
				  h= parseFloat(i.fields.value[0]);
			  if(i.fields.type_instance[0].toString().trim() === "reserved")
				  d= parseFloat(i.fields.value[0]);
		  });
		  var c = g + h;
		  $scope.highchart_df_value1[0] = [];
		  $scope.highchart_df_value1[0].push("Free");
		  $scope.highchart_df_value1[0].push(parseFloat(parseFloat(g/c*100).toFixed(2)));
		  $scope.highchart_df_value1[1] = [];
		  $scope.highchart_df_value1[1].push("Reserved");
		  $scope.highchart_df_value1[1].push(parseFloat(parseFloat(d/c*100).toFixed(2)));
		  $scope.highchart_df_value1[2] = {};
		  $scope.highchart_df_value1[2].name="Used";
		  $scope.highchart_df_value1[2].y=parseFloat(parseFloat(h/c*100).toFixed(2));
		  $scope.highchart_df_value1[2].sliced= true;
		  $scope.highchart_df_value1[2].selected= true;
		  
	  });
	  
  }

  
  $scope.interval_highcharts = function(host){
	  $scope.highchart_data(host);
//	  if($scope.cnt === 0)
//	  var myVar=setInterval(function () { $scope.highchart_data(host); $scope.cnt=$scope.cnt+1;
//	  if($scope.cnt > 9)
//		  window.clearInterval(myVar);	
//	  }, 30000);
  }

  //Highcharts Module
  $scope.chartConfig = {
	        options: {
	            chart: {
	                type: 'line'
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'CPU Load'
	            },
	            plotLines: [{
	                width: 1
	            }]
	        },
	        xAxis: {
	            categories: $scope.highchart_data_tm
	        },
	        series: [{
	        	name: 'Longterm Usage (15 min)',
	            data: $scope.highchart_data_value
	        },
	        {
	        	name: 'Midterm Usage (5 min)',
	            data: $scope.highchart_data_value1
	        },
	        {
	        	name: 'Shortterm Usage (10 seconds)',
	            data: $scope.highchart_data_value2
	        }
	        
	        ],
	        title: {
	            text: 'CPU Usage'
	        },
	        loading: false
	    };
  
  $scope.chartConfig1 = {
	        options: {
	            chart: {
	                type: 'line'
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'Memory (MB)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1
	            }]
	        },
	        xAxis: {
	            categories: $scope.highchart_mem_tm
	        },
	        tooltip: {
	            valueSuffix: 'MB'
	        },
	        series: [{
	        	name: 'Free Memory',
	            data: $scope.highchart_mem_value
	        },
	        {
	        	name: 'Used Memory',
	            data: $scope.highchart_mem_value1
	        },
	        {
	        	name: 'Cached Memory',
	            data: $scope.highchart_mem_value2
	        },
	        {
	        	name: 'Buffered Memory',
	            data: $scope.highchart_mem_value3
	        }
	        ],
	        title: {
	            text: 'Memory Usage'
	        },
	        loading: false
	    };
  
  $scope.chartConfig2 = {
	        options: {
	            chart: {
	                type: 'line'
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'Octets'
	            },
	            plotLines: [{
	                width: 1
	            }]
	        },
	        xAxis: {
	            categories: $scope.highchart_txrx_tm
	        },
	        tooltip: {
	            valueSuffix: 'Octet'
	        },
	        series: [{
	        	name: 'Total Traffic Received (rx)',
	            data: $scope.highchart_rx
	        },
	        {
	        	name: 'Total Traffic Transmitted (tx)',
	            data: $scope.highchart_tx
	        }
	        ],
	        title: {
	            text: 'Total Bandwidth Usage'
	        },
	        loading: false
	    };

  $scope.chartConfig3 = {
		  chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: 'Storage Usage'
	        },
	        tooltip: {
	            pointFormat: '{series.name}:<b>{point.percentage:.2f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    formatter: function() {
	                        return Math.round(this.percentage*100)/100 + ' %';
	                    },
	                    distance: -30,
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                },
	                showInLegend: true
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Storage Usage:',
	            data: $scope.highchart_df_value1
	        }],
	        loading: false
	    };

  

})

.controller('SettingsCtrl', function($scope, Hosts) {
	  //hosts on list
	$scope.hosts = Hosts.all();
	  $scope.remove = function(host) {
	    Hosts.remove(host);
	  }
})

.controller('Hosts', function($scope, Hosts) {
	  //hosts on list
	$scope.hosts = Hosts.all();
	  $scope.remove = function(host) {
	    Hosts.remove(host);
	  }
})

.controller('HostsCtrl', function($scope, $stateParams, Hosts) {
	$scope.host = Hosts.get($stateParams.hostId);
})

.controller('PlaylistsCtrl', function($scope, Chats) {
	  //hosts on alert
	$scope.chats = Chats.all();
	  $scope.remove = function(chat) {
	    Chats.remove(chat);
	  }
})

.controller('PlaylistCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chartId);
})


.controller('LoginCtrl', function($filter,$scope,$http, $ionicModal, $state, $timeout,HardwareBackButtonManager,nfcService) {

  HardwareBackButtonManager.disable();
  nfcService.getE("","read");
  var nfcda=[];
  var pwddata,encrypt,tag=nfcService.tag; ;


  $scope.loginnfc=function(){
  //nfcService.getE("","read");
  nfcService.getE("","read");
  $timeout(function(){
    tag=null;
    nfcService.getE("","read");
    tag=nfcService.tag; 
    nfcService.getE("","read");
    tag=nfcService.tag;
    nfcService.getE("","read");
    tag=nfcService.tag;
  alert("Bring the NFC near");
  //alert("-"+tag);
  data=$filter('decodePayload')(tag.ndefMessage[0]);
                    //alert(data);
  var decrypted = CryptoJS.AES.decrypt(data,"iou#$%*slfwe345u#$udj#I$(sErpOW$#elfiwo4%345345");
  //alert(decrypted.toString(CryptoJS.enc.Utf8));
  pwddata=decrypted.toString(CryptoJS.enc.Utf8);
  nfcda=pwddata.split(" ");
  alert(nfcda[0]); 
  encrypt=CryptoJS.AES.encrypt(nfcda[1], "ertf#$$DDT@%^YJGFrer3548=-?><67f56uj+u789[]tjs");
  $http.get('http://ec2-52-8-38-55.us-west-1.compute.amazonaws.com:9111/login?username='+nfcda[0]+'&password='+encrypt)
        .success(function(data, status, headers, config) {
            if(data=="login")
              {
                alert("Welcome !");
                //tag=null;
                $state.go('app.playlists');
                nfcService.clearTag();

              }
              else if(data=="denied")
              {
                //$state.go('alerts');
                alert("Access Denied !");
              }
            //$state.go('alerts');
            //$scope.$apply();
        })
        .error(function(data, status, headers, config) {
          alert("error");
          alert(error);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
  }, 1);
  
  //var data=$filter('decodePayload')(tag.ndefMessage[0]);
  //alert(data);
  //var decrypted = CryptoJS.AES.decrypt(data, "iou#$%*slfwe345u#$udj#I$(sErpOW$#elfiwo4%345345");
  //alert(decrypted);
  //if(tag.id)
  //alert(((tag.ndefMessage[0]).tnf)|tnfToString);
  //nfcService.clear();
  };

  $scope.doLogin=function(loginData){
    
    var encrypted = CryptoJS.AES.encrypt(loginData.pwd, "ertf#$$DDT@%^YJGFrer3548=-?><67f56uj+u789[]tjs");
     encrypted;
     //alert(encrypted);
     if(loginData.username!="" && loginData.pwd!="")
    $http.get('http://ec2-52-8-38-55.us-west-1.compute.amazonaws.com:9111/login?username='+loginData.username+'&password='+encrypted)
        .success(function(data, status, headers, config) {
            if(data=="login")
              {
                alert("Welcome !");
                $state.go('app.playlists');
              }
              else if(data=="denied")
              {
                //$state.go('alerts');
                alert("Access Denied !");
                   
              }
            //$state.go('alerts');
            //$scope.$apply();

        })
        .error(function(data, status, headers, config) {
          alert("error");
          alert(error);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
  };

  })

.controller('CreateAccntCtrl', function($timeout,$scope,$http,$state,$ionicPlatform,nfcService,HardwareBackButtonManager) {
 //account={};
 //var account={"username":"ser","pwd":"","cpwd":"","email":""};
  $scope.account={"username":"","pwd":"","cpwd":"","email":"","nfc":false};
  var resultdata="";
  HardwareBackButtonManager.disable();

 $ionicPlatform.ready(function(){});
  $scope.doCreate=function(account)
  {
    //alert(account.nfc);
    if(account.username=="" )
      alert("Seriously? No username?");
    if(account.pwd=="" )
      alert("Seriously? No passwords?");
    else if(account.pwd!=account.cpwd)
      alert("Passwords not matching!");
    else if((account.pwd).length<6)
      alert("Password size should be 6+");
    else{
     //alert(account.username);
     var encrypted = CryptoJS.AES.encrypt(account.pwd, "ertf#$$DDT@%^YJGFrer3548=-?><67f56uj+u789[]tjs");
     encrypted;
     var encrypted_nfc = CryptoJS.AES.encrypt(account.username+" "+account.pwd, "iou#$%*slfwe345u#$udj#I$(sErpOW$#elfiwo4%345345");
     encrypted_nfc;
     $http.get('http://ec2-52-8-38-55.us-west-1.compute.amazonaws.com:9111/search?username='+account.username+'&value='+encrypted+'&email='+account.email)
        .success(function(data, status, headers, config) {
            if(data=="Error")
              {
                alert("Username existing");
              }
              else if(data=="Done")
              {
                //$state.go('alerts');
                if(account.nfc==true)
                {
                    alert("Please show the tag and press OK");
                    //$ionicPlatform.ready(function(){alert("ready2");});
                    //nfcService.value=encrypted;
                    //alert(encrypted);
                    
                    nfcService.getE(encrypted_nfc,"write");
                    //$ionicPlatform.ready(function(){});
                    //var tag = nfcService.tag;
                    window.localStorage.setItem("store", "saved");
                    var keyname = window.localStorage.key(0);
                }
              }
            //$state.go('alerts');
            //$scope.$apply();

        })
        .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    nfcService.clearTag();
    }
};
})

.controller('load', function($timeout,$scope,$state,$ionicPlatform) {
  //$state.go('createaccnt');
//$state.go('createaccnt');

  $timeout(function() {
    //var value ="23983klas%^#$#$%jdf";
    //var value1 ="23983klas%^#$#$%jdf";
    // keyname is now equal to "key"
    var value = null;
    $state.go('createaccnt');
    value = window.localStorage.getItem("store");
    //alert(value1);
    //value;value1;
    if(value!=null)
    {
      //$state.go('login');
    }
    else
      $state.go('createaccnt');
    }, 2000);  
})

.service('HardwareBackButtonManager', function($ionicPlatform){
  this.deregister = undefined;
 
  this.disable = function(){
    this.deregister = $ionicPlatform.registerBackButtonAction(function(e){
  e.preventDefault();
  return false;
    }, 101);
  }
 
  this.enable = function(){
    if( this.deregister !== undefined ){
      this.deregister();
      this.deregister = undefined;
    }
  }
  return this;
})
.factory('nfcService', function ($filter,$http,$state,$rootScope, $ionicPlatform) {
        var value="xxx",readwrite="";
        var tag = {};
        
        //alert("0");
        //var getE=function(val){value=val;alert(val);};
        //alert(value);
        $ionicPlatform.ready(function() {
          //alert("1");
            nfc.addNdefListener(function (nfcEvent) {//alert("2");
                console.log(JSON.stringify(nfcEvent.tag, null, 4));
                //value =ndef.textRecord("hello","en-US");
                
                if(readwrite=="write")
                {
                  //alert(value);
                  nfc.write(
                [
                    ndef.textRecord(value.toString())
                ],
                function() {alert("Saved Succesfully"); readwrite="read"; $state.go('app.playlists'); }, 
                function(error) { alert("Please  hold it longer!"); } 
                );
                //resultdata="done"
                }
                if(readwrite=="read")
                {
                $rootScope.$apply(function(){
                    angular.copy(nfcEvent.tag, tag);
                    // if necessary $state.go('some-route
                    //value=val;
                    // alert("2.5");
                    //$state.go('login');
                    //$state.go('test');
                    //alert("2.6");
                    //resultdata="done";
                    //alert(tag);
                    //alert(tag.ndefMessage[0]);
                    //alert(tag[0].ndefMessage[0] | decodePayload);
                   // alert($filter('decodePayload')(tag.ndefMessage[0]));
                    //alert(tag.ndefMessage[0] | decodePayload);
                    //alert(tag.ndefMessage[0] | decodePayload);
                    data=$filter('decodePayload')(tag.ndefMessage[0]);
                    //alert(data);
                    var decrypted = CryptoJS.AES.decrypt(data,"iou#$%*slfwe345u#$udj#I$(sErpOW$#elfiwo4%345345");
                    //alert(decrypted.toString(CryptoJS.enc.Utf8));

                });
                   readwrite="read";
                   //tag={};
              }

            }, function () {//alert(";
                console.log("Listening for NDEF Tags.");
            }, function (reason) {
                alert("Error adding NFC Listener " + reason);
            });
       });

        return {
            tag: tag,
            getE: function (val,rw) {
            		
                 value=val.toString();
                 readwrite = rw;
                 //value=""+value.toString();
                 //alert("yeahb -"+value);
             },
             clearTag: function () {
                angular.copy({}, this.tag);
            }

        };
    });
