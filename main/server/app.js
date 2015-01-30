Cluster.connect("mongodb://localhost/service-discovery");
Cluster.register("web");
var searchConn = Cluster.discoverConnection('search');

SearchSource.defineSource('packages', function(searchText, options) {
  return searchConn.call('getPackages', searchText, options);
});

Meteor.publish('topPackages', function() {
  console.log("accessing topPackages");
  var options = {sort: {isoScore: -1}, limit: 20};
  return Packages.find({}, options);
});