https = require \https

ethercalc-fetcher =
  data: void
  cb: (data) !->
    csv = data.to-string!
    csv -= /^\"?#.*\n/gm
    current-table = void

    entries = for line in csv.split /\n/ when line
      fields = line.split /,/
      #console.log fields
      if fields[0] == /{T:.*}/
        current-table = fields[0]

      if current-table == '{T:Schedule}'
        [id, topic] = fields
        console.log "id=#id, topic=#topic"
        #@data.announ
        #console.log topic
  options:
    hostname: \www.ethercalc.org
    path: '/_/g0v.today/csv'
    port: 443
    method: \GET

  do-req: ->
    req = https.request @options, (resp) !~>
      resp.on \data, @cb

    req.end!

  show: ->
    console.log @data


ethercalc-fetcher.do-req!
#ethercalc-fetcher.show!
