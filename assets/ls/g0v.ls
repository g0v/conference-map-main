load_programs_new = (cb) ->

  #sCOSCUP_Program_URL = '/assets/js/program.json.js?ts=1375435419'
  program-url = 'https://ethercalc.org/_/g0v.today/csv'
  $.ajax {
    url: program-url
    type: 'GET'
    #dataType: 'json'
    error: (xhr) -> console.log 'ERROR' + xhr
    async: false
    success: (data) ->
      dFrom = void
      dTo = void
      aTimeFrom = []
      aTimeTo = []

      csv = data.to-string!
      csv -= /^\"?#.*\n/gm
      current-table = void

      i = -1
      entries = for line in csv.split /\n/ when line
        i++
        fields = line.split /,/
        console.log "line = #line"

        if fields[0] == /{T:.*}/
          current-table = fields[0]

        if current-table == '{T:Room}'
          [id, name] = fields
          if !name or name == '{name}'
            continue
          if name
            console.log name
            aryRoom.push id

        if current-table == '{T:Schedule}'
          [id, topic, speaker_id, time_start, time_end, introduction, room_id, url] = fields
          if !topic or topic == '{topic}'
            continue
          console.log "id=#id, topic=#topic"
          item = {}
          time_start -= /^"|"$/g
          time_end -= /^"|"$/g


          item.name = topic
          item.room = \1
          item.speaker = speaker_id
          item.abstract = \Content
          item.from = Date.parse time_start
          item.to = Date.parse time_end
          item.id = id
          item.type = 1
          item.community = \community
          item.speakerTitle = \title
          item.bio = \bio
          item.isBreak = false
          item.isMultiSlot = false


          dProgram = new Date item.from * 1000
          sYear = dProgram.getYear! + 1900
          sMonth = dProgram.getMonth! + 1
          sDate = dProgram.getDate!
          sYMD = sYear + '/' + sMonth + '/' + sDate
          sPID = item.from + ':' + item.room
          oPro = new oProgram item.id, sPID, item.name, item.from, item.to, item.room, item.type, item.community, item.speaker, item.speakerTitle, item.bio, item.abstract, item.lang, item.isBreak, item.isMultiSlot

          arySID.push sPID
          obj_Program.push oPro
          dFrom := new Date sYMD + ' 00:00:00'

          tFrom = ConverToTimestamp dFrom

          #if i == 0 || dFrom.getTime! > dTo.getTime!
          if true
            console.log \A
            aTimeFrom := []
            aTimeTo := []
            aTimeFrom.push item.from
            aTimeTo.push item.to
            aryTimeFrom.push aTimeFrom
            aryTimeTo.push aTimeTo
            aryDate.push tFrom
          else
            console.log \B
            iSearch = aTimeFrom.indexOf item.from
            if iSearch < 0
              aTimeFrom.push item.from
              aTimeTo.push item.to
              aryTimeFrom[aryTimeFrom.length - 1] = aTimeFrom
              aryTimeTo[aryTimeTo.length - 1] = aTimeTo
          item = null

          dTo := new Date sYMD + ' 23:59:59'
      console.log \beforecb

      cb!
  }
