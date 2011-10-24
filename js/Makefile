COMPILE=../tools/compile.sh

SOURCES=toolbox.js socket-storage.js color-picker.js canvas.js main.js

build: compiled-draw.js
	@cp compiled-draw.js ../public/js

compiled-draw.js: externs.js ${SOURCES}
	${COMPILE} $@ $^

run-linter: ${SOURCES}
	gjslint ${SOURCES} | grep -v "Illegal tab"
