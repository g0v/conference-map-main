// Generated by LiveScript 1.2.0
var $xss, $digit, $trimQuotes, debug, log, $getHashtag, $fetchEthercalc, update, replace$ = ''.replace;
$xss = function(str){
  return document.createTextNode(str).data;
};
$digit = function(num){
  num = replace$.call(num, /\D/g, '');
  return parseInt(num);
};
$trimQuotes = function(str){
  return str = replace$.call(str, /^"|"$/g, '');
};
debug = function(){
  return console.log($mapInfo);
};
log = function(msg){
  console.log(msg);
};
$getHashtag = function(){
  var doc;
  doc = location.hash;
  doc = replace$.call(doc, /^#/, '');
  doc = replace$.call(doc, /\?.*$/, '');
  return doc;
};
$fetchEthercalc = function(doc, cb){
  var programUrl;
  log('fetch-ethercalc' + " " + doc);
  programUrl = "https://ethercalc.org/_/" + doc + "/csv";
  return $.ajax({
    url: programUrl,
    type: 'GET',
    error: function(xhr){
      return console.log(xhr);
    },
    success: function(data){
      return cb(data);
    }
  });
};
update = function(doc){
  var oldData;
  log('update');
  if ($mapInfo.roomArray) {
    $mapInfo.roomArray = [];
  }
  oldData = document.getElementById('room-data');
  while (oldData.firstChild) {
    oldData.removeChild(oldData.firstChild);
  }
  if (!doc) {
    doc = 'map:event1';
  }
  return $fetchEthercalc(doc, $updateRoom);
};
$(document).ready(function(){
  log('document-ready');
  setTimeout(function(){
    return window.scrollTo(0, 1);
  }, 100);
  window.onhashchange = function(){
    var doc;
    log('onhashchange');
    doc = $getHashtag();
    update(doc);
    return true;
  };
  return update($getHashtag());
});