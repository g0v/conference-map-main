#!/bin/bash
export LESS=-R
export GREP_COLOR='00;38;5;157'
find . -name "*.php" -o -name "*.inc" -o -name "*.css" -o -name '*.js'  | grep -v jquery | xargs grep -n -E 'TODO|XXX|DEBUG|FIXME|SECURITY'  --color
