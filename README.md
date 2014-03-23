## 零時廣場開發

 * `assets/js/*` => 待整理的舊 code，先不用看
 * `assets/ls/*` => **目前的開發**在此

## How to Start

 * just `make`

## Requirement 

 * 基本需求
   * php5 & php5-json (未來會將 php 抽離，變成純 html + js 的架構)
   * node.js & npm

 * 只有在「聊天地圖」、「使用者議程」等功能需要
   * php5-redis
   * [Conference Map socket.io server](https://github.com/UniSharp/conference-map-message-server)

## TODO

 * [TODO] Use ethercalc as the map/room/programs/conference backend.
 * nginx support? (currently only tested on apache2)

## Licensing

 * Copyright (C) 2014 g0v Contributors
 * Copyright (C) 2013-2014 UniSharp Inc.
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
