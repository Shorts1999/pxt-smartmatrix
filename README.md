# pxt-smartmatrix

## Micro:Bit SmartMatrix

This extensions allows you to easily control LED matrices/displays made from ws2812b/NeoPixel controllable RGB LEDs
There are a multitude of added cuntions, like drawing pixels in a x/y coördinante system, scrolling text over the display and drawing monochrome images.

IMPORTANT NOTE:
The extension only works with matrices made in a "column-zigzag pattern" meaning the matrix is made of strips in a zig-zag pattern going up and down.
The display can be any size you like, as long as the strips are laid out with this pattern in mind.

Current features and functions:

create (SmartMatrix.create). Create the matrix object, just like how you normally would create a normal neopixel strip.
Select a digital pin to attach it to, the width and height of the matrix and the type of LED connected (RGB, RGBW RGB_RGB)
"let matrix = SmartMatrix.create(digitalPin, matrixWidth, matrixHeight, LEDtype)"

brightness (matrix.Brightness(0-255)). set the brightness of the LEDs, just as you would in the NeoPixel library.

show (matrix.show()). Display all the changes made to the display, just as you would in the NeoPixel library.

clear (matrix.clear()). Remove everything from the display buffer. A call to matrix.show() must be made to make these changes visible!

setPixel (matrix.setPixel(X position, Y position, Colour)). set a specific pixel in the matrix to the specified colour. Call to matrix.show() must be made to make changes visible.

draw Bitmap (matrix.drawBitmap(bitmap, x offset, y offset, width, height, colour, direction)
This function allows for drawing a monochrome bitmap on the display. it can be placed anywhere using the xoffset and yoffse. With direction you can either draw the bitmap normally or mirrored on the Y-axis.

Scroll Text (matrix.scrollText(text, speed, Y offset, colour) allows you to scroll a string of text across the matrix. this uses a 6x8 font, so every letter is 8 pixels tall and six pixels wide. the speed variable determines how fast it scrolls across the screen and the Y offset places it up or down on the screen.

#To do:
*Drawing graphics primitives like lines, squares and circles
*support for other display types (non-zigzag, different start pixel positions etc)

## TODO

- [ ] Add a reference for your blocks here
- [ ] Add "icon.png" image (300x200) in the root folder
- [ ] Add "- beta" to the GitHub project description if you are still iterating it.
- [ ] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [ ] On GitHub, create a new file named LICENSE. Select the MIT License template.
- [ ] Get your package reviewed and approved https://makecode.microbit.org/extensions/approval

Read more at https://makecode.microbit.org/extensions

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

