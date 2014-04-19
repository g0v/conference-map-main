all: build

build:
	./node_modules/.bin/gulp

dev: build
	./node_modules/.bin/gulp dev

clean:
	rm -f ./assets/js/*.js

gen-appcache-ts: all
	./scripts/gen-app-cache.sh ts > map.appcache
	git diff map.appcache


gen-appcache: all
	./scripts/gen-app-cache.sh > map.appcache
	git diff map.appcache

#fetch:
#	./scripts/fetch-coscup-program.sh
#	git diff assets/js/program.json.js

todo:
	./scripts/todo.sh

install:
	npm install

.PHONY: all gen-app-cache-ts gen-app-cache fetch todo grunt
