angular.module('starter.services', [])

.factory('Chats', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: '54-148-3-176',
    lastText: 'CPU Critical',
    backgroundColor: 'red'
  }, {
    id: 1,
    name: '54-186-143-155',
    lastText: 'CPU Non-Critical',
    backgroundColor: 'orange'
  }, {
    id: 2,
    name: '54-186-143-158',
    lastText: 'Storage Non-Critical',
    backgroundColor: 'orange'
  }];
  

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})



.factory('Hosts', function($http) {

var hosts = [{
	    id: 0,
	    name: '54-148-3-176'
	  }, {
	    id: 1,
	    name: '54-186-143-155'
	  }, {
	    id: 2,
	    name: '52-10-118-158'
	  }, {
		    id: 3,
		    name: '54-186-143-158'
		  }
	  , {
		    id: 4,
		    name: '54-186-143-158'
		  }
	  , {
		    id: 5,
		    name: '54-186-143-158'
		  }
	  , {
		    id: 6,
		    name: '54-186-143-158'
		  }
	  , {
		    id: 7,
		    name: '54-186-143-158'
		  }
	  , {
		    id: 8,
		    name: '54-186-143-158'
		  }
	  ];

return {
    all: function() {
      return hosts;
    },
    remove: function(host) {
    	hosts.splice(hosts.indexOf(host), 1);
    },
    get: function(hostId) {
      for (var i = 0; i < hosts.length; i++) {
        if (hosts[i].id === parseInt(hostId)) {
          return hosts[i];
        }
      }
      return null;
    }
  };
});
