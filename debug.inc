<div>
<pre>
<?php
if (true || @$_COOKIE['unisharp'] === 'cool')  {
    echo '<h3>$ENV</h3>' . "\n";
    print_r($ENV);

    echo '<h3>$PAGE</h3>' . "\n";
    var_export($PAGE);

    echo '<h3>$CONFIG</h3>' . "\n";
    print_r($CONFIG);

    echo '<h3>$_COOKIE</h3>' . "\n";
    print_r($_COOKIE);
}
?>
</pre>
</div>
