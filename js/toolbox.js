goog.provide('draw.toolbox');

/**
 * @constructor
 * @param {draw.ColorPicker} colorPicker ColorPicker instance.
 */
draw.Toolbox = function(colorPicker) {
	var self = this;

	self.colorPicker = colorPicker;
};

/**
 * Render toolbox
 * @param {Element} element Element to render the toolbox into.
 */
draw.Toolbox.prototype.render = function(element) {
	var self = this;

	self.colorPicker.render(element);
};
