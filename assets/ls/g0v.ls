$map-info =
  room-array: []

class $Room
  (...) ->
    @id = &0
    @name = (&1 -= /^"|"$/g)
    @x = &2
    @y = &3
    @width = &4
    @height = &5
    @zindex = &6

fetch-ethercalc = (cb) ->
  program-url = 'https://ethercalc.org/_/g0v.today/csv'
  $.ajax {
    url: program-url
    type: 'GET'
    error: (xhr) -> console.log xhr
    # async: false
    success: (data) ->
      csv = data.to-string!
      csv -= /^\"?#.*\n/gm
      current-table = void
      entries = for line in csv.split /\n/ when line
        fields = line.split /,/
        #console.log "line = #line"

        # get table
        if fields[0] == /{T:.*}/
          current-table = fields[0]
          continue

        if current-table == '{T:Room}'
          [id, name, x, y, width, height, zindex] = fields
          if !id or id == '{id}'
            # skip the metadata row
            continue
          $map-info.room-array.push new $Room ...fields

        if current-table == '{T:Schedule}'
          [id, topic, speaker_id, time_start, time_end, introduction, room_id, url] = fields
          if !id or id == '{id}'
            # skip the metadata row
            continue
          time_start -= /^"|"$/g
          time_end -= /^"|"$/g

      cb!
    # end ajax.success
  }


display-room = ->
  window-width = window.inner-width
  for room in $map-info.room-array
    if window-width < 760
      each_width = each_height = 20
      rooms_div_padding = 4
    if window-width < 980
      # tablet 720.css
      each_width = each_height = 15
      rooms_div_padding = 4
    else
      # PC 1200.css
      each_width = 27
      each_height = 25
      rooms_div_padding = 4

    top = "#{room.y * each_height}px"
    left = "#{room.x * each_width}px"
    width = "#{room.width * each_width - (rooms_div_padding * 2)}px"
    height = "#{room.height * each_height - (rooms_div_padding * 2)}px"
    z-index = room.zindex

    console.log \ww
    console.log width


    room-style = "top: #{top}; left:#{left}; z-index:#{z-index}; width:#{width}; height: #{height}; display:block; position: absolute;"
    str = "<div id='' data-id='' data-location='' class='session clearfix' style='#{room-style}'><span class='room_name room_tag'>#{room.name}</span></div>"
    $ '#F1' .prepend str



window.onload = ->
  # 網頁載入完成時隱藏最頂的網址列
  setTimeout ->
    window.scrollTo(0, 1);
  , 100
  # fb_CallBack()
