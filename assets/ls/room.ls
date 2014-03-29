class $Room
  (...) ->
    @id = &0 |> $xss
    @name = &1 |> $trim-quotes |> $xss
    @topic = &2 |> $trim-quotes |> $xss
    @content = &3 |> $trim-quotes |> $xss
    @x = &4 |> $digit
    @y = &5 |> $digit
    @width = &6 |> $digit
    @height = &7 |> $digit
    @zindex = &8 |> $digit



$update-room = (data) ->
  csv = data.to-string!
  csv -= /^\"?#.*\n/gm
  current-table = void
  entries = for line in csv.split /\n/ when line
    fields = $.csv.to-array line

    if fields[0] == /{T:.*}/
      current-table = fields[0]
      continue

    if current-table == '{T:Room}'
      [id, ...] = fields
      if !id or id == '{id}'
      # skip the metadata row
        continue
      $map-info.room-array.push new $Room ...fields
  # end for line
  $display-room!

$display-room = !->
  log \display-room
  window-width = window.inner-width
  i = 0
  for room in $map-info.room-array
    node-id = "room_#{i++}"
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


    room-style = "top: #{top}; left:#{left}; z-index:#{z-index}; width:#{width}; height: #{height}; display:block; position: absolute;"
    str = "
        <span class='room_name room_tag'>#{room.name}</span>
        <span><b>#{room.topic}</b></span><br />
        <span class='program_desc'>#{room.content}</span>
"
    inner-node = document.create-element \div
    inner-node.class-name = 'session clearfix'
    inner-node.style.css-text = room-style
    inner-node.innerHTML = str

    node = document.create-element \div
    node.append-child inner-node
    node.id = node-id
    node.onclick = ->
      $ '#popup' .html str
      $ '#popup' .b-popup!
      true

    # show floor 1
    $ '#room-data' .prepend node
