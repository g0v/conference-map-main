all: install ls-to-js

ls-to-js:
	./node_modules/.bin/lsc -c -b assets/ls/room.ls
	./node_modules/.bin/lsc -c -b assets/ls/main.ls

test:
	./node_modules/.bin/lsc assets/ls/ethercalc-fetcher.ls


#all: todo gen-app-cache

gen-app-cache-ts:
	./scripts/gen-app-cache.sh ts > unisharp-map.appcache
	git diff unisharp-map.appcache


gen-app-cache:
	./scripts/gen-app-cache.sh > unisharp-map.appcache
	git diff unisharp-map.appcache

fetch:
	./scripts/fetch-coscup-program.sh
	git diff assets/js/program.json.js

todo:
	./scripts/todo.sh

install:
	npm install

grunt: install
	grunt

.PHONY: all gen-app-cache-ts gen-app-cache fetch todo grunt
