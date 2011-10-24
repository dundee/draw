COMPILE=../tools/compile.sh

build: compiled-draw.js
	@cp compiled-draw.js ../public/

compiled-draw.js: externs.js toolbox.js draw.js main.js
	${COMPILE} $@ $^
