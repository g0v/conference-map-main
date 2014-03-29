$xss = (str) ->
  document.create-text-node str .data

$digit = (num) ->
  num -= /\D/g
  parse-int num

$trim-quotes = (str) ->
  str -= /^"|"$/g

$map-info =
  room-array: []

debug = ->
  console.log $map-info

log = (msg) !->
  console.log msg

$get-hashtag = ->
  doc = location.hash
  doc -= /^#/
  doc -= /\?.*$/
  doc

# need jquery-csv, included from view/header.php
$fetch-ethercalc = (doc, cb) ->
  log \fetch-ethercalc + " " + doc
  program-url = "https://ethercalc.org/_/#{doc}/csv"
  $.ajax {
    url: program-url
    type: 'GET'
    error: (xhr) -> console.log xhr
    # async: false
    success: (data) ->
      cb data
  }


# ///////////////////////////////////
#         main program
# ///////////////////////////////////
update = (doc) ->
  log \update
  if $map-info.room-array
    $map-info.room-array = []

  old-data = document.get-element-by-id 'room-data'
  while old-data.first-child
    old-data.remove-child old-data.first-child
  if !doc
    doc = 'map-demo-1'

  $fetch-ethercalc doc, $update-room


$ document .ready ->
  log \document-ready
  # for mobile: 網頁載入完成時隱藏最頂的網址列
  setTimeout ->
    window.scrollTo(0, 1);
  , 100

  window.onhashchange = ->
    log \onhashchange
    doc = $get-hashtag!
    update doc
    true

  update $get-hashtag!
