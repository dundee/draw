goog.provide('draw.toolbox');

/**
 * @constructor
 * @param {ColorPicker} colorPicker ColorPicker instance.
 */
function Toolbox(colorPicker) {
	var self = this;

	self.colorPicker = colorPicker;
}

/**
 * Render toolbox
 * @param {Element} element Element to render the toolbox into.
 */
Toolbox.prototype.render = function(element) {
	var self = this;

	self.colorPicker.render(element);
};
