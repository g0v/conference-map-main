<?php
require_once '../UserClient.inc';

try {
    $c = new UserClient(false);


    var_export($c->set('abc', array('x'=>3, 'y'=>4)));
    echo "\n";
    var_export($c->set('abc', array('z'=>5)));
    echo "\n";
    var_export($c->set('abc', array()));
    echo "\n";

    var_export($c->is_exists('abc'));
    echo "\n";

    print_r($c->getAll('abc'));
} catch (Exception $e) {
    error_log($e->getMessage());
}
