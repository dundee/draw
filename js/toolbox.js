goog.require('goog.ui.ColorPicker');

goog.provide('draw.toolbox');

/**
 * @constructor
 */
function Toolbox() {
	var self = this;
}

/**
 * Render toolbox
 * @param {Element} element Element to render the toolbox into.
 */
Toolbox.prototype.render = function(element) {
	var self = this;
	self.cp = new goog.ui.ColorPicker();
	self.cp.setSize(7);
	self.cp.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS);
	self.cp.addEventListener(goog.ui.ColorPicker.EventType.CHANGE, function(e) {
		alert(e.target.getSelectedColor());
	});
	self.cp.render(element);
};
