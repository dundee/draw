COMPILE=../tools/compile.sh

build: compiled-draw.js
	@cp compiled-draw.js ../public/draw.js

compiled-draw.js: externs.js draw.js
	${COMPILE} $^
