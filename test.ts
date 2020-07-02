let matrix = SmartMatrix.create(DigitalPin.P0, 32, 8, NeoPixelMode.RGB)

basic.forever(function () {
    matrix.scrollText("Hello World!", 512, 0, neopixel.colors(NeoPixelColors.Purple))
    basic.pause(500)
})