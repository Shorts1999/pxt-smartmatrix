let matrix = SmartMatrix.create(DigitalPin.P0, 32, 8, NeoPixelMode.RGB)

matrix.scrollText("Hello World!", 512, neopixel.colors(NeoPixelColors.Red))

let testmap = [0x80,0x40,0x20,0x10,0x08,0x04,0x02,0x01]

matrix.drawBitmap(testmap, 2, 0, 8, 8, 0x00ff00)

matrix.show();
basic.pause(2000)

matrix.drawBitmap(testmap, 14, 0, 8, 8, 0x0000ff, 0) //testing the mirrored feature

matrix.show()
basic.pause(2000)
