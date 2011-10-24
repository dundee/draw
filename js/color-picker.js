goog.require('goog.ui.ColorPicker');

goog.provide('draw.colorpicker');

/**
 * @constructor
 * @param {draw.Canvas} canvas Canvas instance.
 */
draw.ColorPicker = function(canvas) {
	var self = this;

	self.canvas = canvas;
};

/**
 * Render toolbox
 * @param {Element} element Element to render the toolbox into.
 */
draw.ColorPicker.prototype.render = function(element) {
	var self = this;
	self.cp = new goog.ui.ColorPicker();
	self.cp.setSize(7);
	self.cp.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS);
	self.cp.addEventListener(goog.ui.ColorPicker.EventType.CHANGE, function(e) {
		self.canvas.setColor(e.target.getSelectedColor());
	});
	self.cp.render(element);
};
