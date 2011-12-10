CanvasTest = TestCase("CanvasTest");

CanvasTest.prototype.testCreate = function() {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');

	var mockControl = new MockControl();
	contextMock = mockControl.createMock(ctx);
	contextMock.canvas = {};

	elementMock = mockControl.createMock(canvas);

	var canvas = new draw.Canvas(elementMock);
	assertInstanceOf(draw.Canvas, canvas);

	elementMock.expects().getContext('2d').andReturn(contextMock);

	canvas.init();
	assertEquals({}, canvas.lastPoint);

	contextMock.expects().beginPath().andReturn(true);
	contextMock.expects().stroke().andReturn(true);

	canvas.drawLine({points: [], color: '#000'});

	mockControl.verify();
};
