let matrix = SmartMatrix.create(DigitalPin.P0, 20, 10, NeoPixelMode.RGB)
matrix.Brightness(100);

basic.forever(function () {
    matrix.scrollText("Hello World!", 512, 0, neopixel.colors(NeoPixelColors.Purple))
    basic.pause(500)
    matrix.text("Hi!", 1, 2, NeoPixelColors.Green);
    basic.pause(2000);
})