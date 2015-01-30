SearchConn = Cluster.discoverConnection('search');
SearchConn.subscribe('topSearches');
TopSearches = new Mongo.Collection('top-searches', SearchConn);