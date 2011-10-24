goog.require('goog.ui.ColorPicker');

goog.provide('draw.toolbox');

/**
 * @constructor
 * @param {Element=} element to render the toolbox into.
 */
function Toolbox(element) {
	"use strict";
	var self = this;
}

Toolbox.prototype.render = function (element) {
	"use strict";
	var self = this;
	self.cp = new goog.ui.ColorPicker();
	self.cp.setSize(7);
	self.cp.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS);
	self.cp.addEventListener(goog.ui.ColorPicker.EventType.CHANGE,function(e){
		alert(e.target.getSelectedColor())
	});
	self.cp.render(element);
};
