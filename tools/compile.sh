#!/bin/bash

BASE_PATH=~/workspace/js/closure
CALCDEPS_PATH=$BASE_PATH/closure-library/closure/bin/  #directory containing calcdeps.py
JAR_PATH=$BASE_PATH                                    #directory containing compiler.jar
CLOSURE_PATH=$BASE_PATH/closure-library                #path to closure-library
#COMPILER_FLAGS='--compiler_flags --compilation_level=ADVANCED_OPTIMIZATIONS'
COMPILE=0

if [ -z $1 ]; then
	echo "Usage:" $0 "file.js"
	exit 1
fi

INPUTS=""
for IN in $@; do
	INPUTS="${INPUTS} -i ${IN}"
done

if [ $COMPILE -eq 1 ]; then
	$CALCDEPS_PATH/calcdeps.py $INPUTS \
		-p $CLOSURE_PATH -o compiled \
		$COMPILER_FLAGS \
		-c $JAR_PATH/compiler.jar > compiled-$1
else
	$CALCDEPS_PATH/calcdeps.py $INPUTS \
		-p $CLOSURE_PATH -o script > compiled-$1
fi
