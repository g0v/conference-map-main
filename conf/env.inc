<?php
/*
 *
 * Copyright (c) 2013 UniSharp Inc. http://www.unisharp.com/
 * Copyright (c) 2012 Josh Lockhart
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/

function send_do_not_cache_header()
{
    // Do not cache
    // Expires in the past
    header("Expires: Mon, 26 Jul 1990 05:00:00 GMT");
    // Always modified
    header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
    // HTTP/1.1
    header("Cache-Control: no-store, no-cache, must-revalidate");
    header("Cache-Control: post-check=0, pre-check=0", false);
    // HTTP/1.0
    header("Pragma: no-cache");
}

$ENV = array();

//The HTTP request method
$ENV['REQUEST_METHOD'] = $_SERVER['REQUEST_METHOD'];

//The IP
$ENV['REMOTE_ADDR'] = $_SERVER['REMOTE_ADDR'];

/**
 * Application paths
 *
 * This derives two paths: SCRIPT_NAME and PATH_INFO. The SCRIPT_NAME
 * is the real, physical path to the application, be it in the root
 * directory or a subdirectory of the public document root. The PATH_INFO is the
 * virtual path to the requested resource within the application context.
 *
 * With htaccess, the SCRIPT_NAME will be an absolute path (without file name);
 * if not using htaccess, it will also include the file name. If it is "/",
 * it is set to an empty string (since it cannot have a trailing slash).
 *
 * The PATH_INFO will be an absolute path with a leading slash; this will be
 * used for application routing.
 */
if (strpos($_SERVER['REQUEST_URI'], $_SERVER['SCRIPT_NAME']) === 0) {
    $ENV['SCRIPT_NAME'] = $_SERVER['SCRIPT_NAME']; //Without URL rewrite
} else {
    $ENV['SCRIPT_NAME'] = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']) ); //With URL rewrite
}
$ENV['PATH_INFO'] = substr_replace($_SERVER['REQUEST_URI'], '', 0, strlen($ENV['SCRIPT_NAME']));
if (strpos($ENV['PATH_INFO'], '?') !== false) {
    $ENV['PATH_INFO'] = substr_replace($ENV['PATH_INFO'], '', strpos($ENV['PATH_INFO'], '?')); //query string is not removed automatically
}
$ENV['SCRIPT_NAME'] = rtrim($ENV['SCRIPT_NAME'], '/');
$ENV['PATH_INFO'] = '/' . ltrim($ENV['PATH_INFO'], '/');

//The portion of the request URI following the '?'
$ENV['QUERY_STRING'] = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';

//Name of server host that is running the script
$ENV['SERVER_NAME'] = $_SERVER['SERVER_NAME'];

//Number of server port that is running the script
$ENV['SERVER_PORT'] = $_SERVER['SERVER_PORT'];

//HTTP request headers
$specialHeaders = array('CONTENT_TYPE', 'CONTENT_LENGTH', 'PHP_AUTH_USER', 'PHP_AUTH_PW', 'PHP_AUTH_DIGEST', 'AUTH_TYPE');
foreach ($_SERVER as $key => $value) {
    $value = is_string($value) ? trim($value) : $value;
    if (strpos($key, 'HTTP_') === 0) {
        $ENV[substr($key, 5)] = $value;
    } elseif (strpos($key, 'X_') === 0 || in_array($key, $specialHeaders)) {
        $ENV[$key] = $value;
    }
}

//Is the application running under HTTPS or HTTP protocol?
$ENV['WEB_PROTOCOL'] = empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off' ? 'http' : 'https';

if (isset($_GET['cache'])) {
    $ENV['WITHCACHE'] = 'withcache-get';
    setcookie('APPCACHE', 1, time() + 86400, '/');
}

if (@$_COOKIE['APPCACHE']) {
    $ENV['WITHCACHE'] = 'withcache-cookie';
}

if (isset($_GET['nocache'])) {
    unset($ENV['WITHCACHE']);
    // remove cookie
    setcookie('APPCACHE', 0, time() - 3600, '/');
}

if (isset($_GET['debug'])) {
    $ENV['DEBUG'] = 'debug';
}

if (isset($_GET['reset'])) {
    $ENV['RESET'] = 'reset';
}
header( "Set-Cookie: name=value; httpOnly" );

if (@$_SERVER['mobile'] == 1) {
    $ENV['MOBILE'] = 1;
} else {
    $ENV['MOBILE'] = 0;
}
