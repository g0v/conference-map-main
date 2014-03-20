#!/bin/bash
echo "CACHE MANIFEST"

if [ "$1" = "ts" ]; then
    echo -n "# "
    date +%Y:%m:%d-%H:%M:%S
fi

find . -type f \
    -name '*.js' \
    -o -name '*.php'  \
    -o -name '*.html' \
    -o -name '*.css' \
    -o -name '*.jpg' \
    -o -name '*.png' \
    -o -name '*.jpeg' \
    |  cut -b 2- \
    | grep -v '.git' |  grep -v "^/lib/" | grep -v "^/api/" |  grep -v "^/sample/" | grep -v 'save_friends_program.php' 

# FIXME
echo "/api-static/rooms/"

echo ""
echo "NETWORK:"

echo "FALLBACK:"
echo "/api /offline.html" 
