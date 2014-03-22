    <div id="map" class="program grid_9 right">
        <div id="program_info" style="display:block;"></div>
        <div id="floor_name"></div>
        <div id="date_name"></div>
        <div class="diy_tip">
            <span class="txt"></span>
            <span class="triangle"></span>
        </div>
        <div id="layer_slides">
            <div id="F1">
<?php
    for($iY = 0 ; $iY <= 17 ; $iY++) {
        echo '<div class="y '. $iY .'  clearfix" data-yposition="'.$iY.'">';

        for($iX = 0 ; $iX <= 30 ; $iX++){
            echo '<div class="x '.$iX.'" data-room="1:'.$iX.':'.$iY.':1"></div>';
        }
        echo '</div>';
    }
?>
            </div> <!-- F1 -->
        </div><!-- layer_slides -->
    </div><!--＃map.program-->
