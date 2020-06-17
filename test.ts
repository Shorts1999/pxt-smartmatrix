// tests go here; this will not be compiled when this package is used as a library
let test=SmartMatrix.create(DigitalPin.P0, 0, 0, NeoPixelMode.RGB)

test.scrollText("H", 10, 0xff0000)