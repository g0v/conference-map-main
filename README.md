## 零時廣場開發

 * 目前 `assets/js` 中的 code 都待整理，先不要看
 * 從 ethercalc 拉資料的 function 額外分出來在 `assets/ls/g0v.ls`

## Pre-requirement

 * php5-redis
 * php5-json
 * [Conference Map socket.io server](https://github.com/UniSharp/conference-map-message-server)

## TODO

 * [TODO] Use ethercalc as the map/room/programs/conference backend.
 * nginx support? (currently only tested on apache2)

## Licensing

 * Copyright (C) 2013-2014 UniSharp Inc.
 * Copyright (C) 2014 g0v Contributors
 * Distributed Under the MIT License.

### Third Party License

| Name                                 | License                                |
| -------------                        |:-------------:                         |
| [adapt.min.js](http://adapt.960.gs/) | Licensed under GPL and MIT             |
| jQuery JavaScript Library v1.9.1     | MIT                                    |
| jQuery UI - v1.10.3                  | MIT                                    |
| [bPopup](http://dinbror.dk/bpopup)   | MIT                                    |
| [jquery.slides.js](http://www.slidesjs.com/) | Apache license                 |
| 960 Grid System ~ Core CSS           | Licensed under GPL and MIT             |



## Frontend Developer Note

* install node.js and npm
* `npm install`

| Task            | Command       |
| -------------   |:-------------:|
| css beautifier  | grunt cssbu   |
| js beautifier   | grunt jsbu    |
| js Hint  	      | grunt jshi    |
