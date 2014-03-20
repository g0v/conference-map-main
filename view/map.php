<?php
// FIXME ugly
$form_open_html ='';
$form_end_html = '';

// FIXME use a proper name instead of macgic num
$hotkey_info_array1 = array(
    "w" => "上一場",
    "s" => "下一場",
    "a" => "前一天",
    "d" => "後一天",
);

$hotkey_info_array2 = array(
    "1"=>"1F",
    "2"=>"2F",
);

// FIXME use $PAGE variabe, not $page_type
if ($PAGE['ACTIVITY_INFO']['ACTION_ID'] == 'user-program') {
    $form_open_html = '<div id="myprogram_frm" class="" action="" method="POST">';
    /*
     *form的radio由js產生,詳見coscup2013.js, search 'is_my_program_show_radio'
     *未來考慮將顯示面邏輯移到這裡
     */
    $form_end_html = '</div>';
} // end user-program
?>
        <div id="diy_controller" class="grid_9 right clearfix">
            <button class="custom_btn prev_floor" onClick=" trigger_slider_floor(1);"><i class="icon prev" style="vertical-align:baseline;" alt="Previous"></i> 1F</button>
            <div id="map_info" class="clearfix">
                <p class="l">
                    <time class="date">8/3</time>
                    <time class="time">10:10</time>
                </p>
            <div class="floor r">1F</div>
            </div><!--map_info-->
            <div id="hotkey_info">
                <div class="group2">
<?php
    foreach($hotkey_info_array2 as $k => $v) {
        echo "<i class=\"keyboard\" title=\"$v\">$k</i>";
    }
        $ret = <<<EOF
                    <p>鍵盤快速鍵：</p>
                </div> <!-- group2 -->
                <div class="group1">
                    <table>
                        <tr><td colspan="3"> <i class="keyboard w" title="上一場">W</i></td></tr>
                        <tr>
                            <td><i class="keyboard" title="前一天">A</i></td>
                            <td><i class="keyboard" title="前一天">S</i></td>
                            <td><i class="keyboard" title="前一天">D</i></td>
                        </tr>
                    </table>
                </div> <!-- group1 -->
            </div> <!-- hotkey_info -->
        <button class="custom_btn next_floor" style="float:right" onClick="trigger_slider_floor(2);">2F <i class="icon next" style="vertical-align:baseline;" alt="Next"></i></button>
    </div><!-- diy_controller -->
    <div id="map" class="program grid_9 right">
        <div id="program_info" style="display:block;"></div>
        $form_open_html
        <div id="floor_name"></div>
        <div id="date_name"></div>
        <div class="diy_tip">
            <span class="txt"></span>
            <span class="triangle"></span>
        </div>
        <div id="layer_slides">
            <div id="F1">
EOF;
    for($iY = 0 ; $iY <= 17 ; $iY++) {
        $ret .= '<div class="y '. $iY .'  clearfix" data-yposition="'.$iY.'">';

        for($iX = 0 ; $iX <= 30 ; $iX++){
            $ret .= '<div class="x '.$iX.'" data-room="1:'.$iX.':'.$iY.':1"></div>';
        }
        $ret .= <<<EOF
                </div>
EOF;
    }
    $ret .= <<<EOF

            </div> <!-- F1 -->
            <div id="F2">
EOF;

    for($iY = 0 ; $iY <= 17 ; $iY++){
        $ret.= <<<EOF
                <div class="y $iY  clearfix" data-yposition="$iY">
EOF;
        for($iX = 0 ; $iX <= 30 ; $iX++){
            $ret .= '<div class="x '.$iX.'" data-room="2:'.$iX.':'.$iY.':1"></div>';
        }
        $ret.= <<<EOF
                </div>
EOF;
    }
    $ret.= <<<EOF
            </div><!-- F2 -->
        </div><!-- layer_slides -->
        <div id="custom_program_navi" class="clearfix">
            <a id="linkGoPreProgram" class="go_prev_program go_program" href="javascript:void(0);" title="上一場(快速鍵 i )">&uarr; 上一場</a>
            <span id="SelectedTime" data-ts="" ></span>
            <a id="linkGoNextProgram" class="go_next_program go_program" href="javascript:void(0);" title="下一場(快速鍵 k )">&darr; 下一場</a>
        </div><!-- custom_program_navi -->
        <div id="compass" class="icon compass"></div>
    </div><!--＃map.program-->
    $form_end_html
EOF;
    echo $ret;
