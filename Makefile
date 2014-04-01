all: install ls-to-js

ls-to-js:
	./node_modules/.bin/lsc -c -b assets/ls/*.ls

clean:
	rm -f ./assets/ls/*.js

test:
	./node_modules/.bin/lsc assets/ls/ethercalc-fetcher.ls


#all: todo gen-app-cache

gen-appcache-ts: all
	./scripts/gen-app-cache.sh ts > map.appcache
	git diff map.appcache


gen-appcache: all
	./scripts/gen-app-cache.sh > map.appcache
	git diff map.appcache

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
