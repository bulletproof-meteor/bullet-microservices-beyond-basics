var packagesDump = Assets.getText('packages.dump').split('\n').filter(function(p) {
  return !!p;
});

if(Packages.find().count() < packagesDump.length) {
  console.log("adding initial set of packages (%s)", packagesDump.length);
  for(var lc=0; lc<packagesDump.length; lc++) {
    if(lc > 0 && lc % 500 == 0) {
      console.log("  added packages: ", lc);
    }
    var p = packagesDump[lc];
    p = EJSON.parse(p);
    SavePackage(p.packageName, p);
  };
  console.log("completed!");
}

function SavePackage(name, data) {
  data = _.clone(data);
  delete data._id;
  data.stars = (data.repoInfo)? data.repoInfo.stars : 0;
  Packages.update(name, {$set: data}, {upsert: true});
};

// Hide a method in this file :D

Meteor.methods({
  getTheMagicNumber: function() {
    return Packages.find().count();
  }
});

Meteor.publish("topSearches", function() {
  var collName = 'top-searches';
  this.added(collName, "1", {text: "bootstrap"});
  this.added(collName, "2", {text: "performance"});
  this.added(collName, "3", {text: "router"});
  this.added(collName, "4", {text: "accounts"});
  this.added(collName, "5", {text: "polymer"});
  this.ready();
});