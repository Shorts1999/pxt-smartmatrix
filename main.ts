/**
 * Micro:Bit makeCode extension for neopixel.was2812b matrices
 * 
 * 
 */

//**********************************************//
// library for NeoPixel Displays/Matrices       //
//                                              //
//Written by Sjors Smit                         //
//December 2019/January 2020                    //
//                                              //
//**********************************************//

//% weight=6 color=#00CC60 icon="\uf110"
//% groups=["Setup", "Tools", "PixelControl"]
namespace SmartMatrix {
    /**
     * A Matrix made of ws2812b LEDs
     */
    export class Matrix {
        strip: neopixel.Strip
        Width: number
        Height: number

        //%blockId="Matrix_show" block="%matrix| show"
        //%weight=90 group="Tools"
        show(): void {
            this.strip.show();
        }
        //%blockId="Matrix_Brighness" block="%matrix set brightness to %setpoint"
        //%weight=80 group="Setup"
        //%setpoint.defl=32
        Brightness(setpoint: number): void {
            this.strip.setBrightness(setpoint);
        }
        //%blockId="Matrix_clear" block="clear %matrix"
        //%weight=80 group="Tools"
        clear(): void {
            this.strip.clear();
        }

        //%blockId="Matrix_setPixel" block="%matrix| set pixel at x %x| y %y| to colour %colour"
        //%weight=80 group="PixelControl"
        //%colour.shadow=neopixel_colors
        setPixel(x: number, y: number, colour: number): void {
            if (x < 0 || x > this.Width || y < 0 || y > this.Height) { return } //If the pixel does not fit on screen, do not draw it (to avoid aliasing)
            if (!(x % 2)) { this.strip.setPixelColor(y + x * this.Height, colour); } //Because of the zig-zag formation of the panel all even rows (including 0) are drawn top to bottom
            else { this.strip.setPixelColor(this.Height - y + x * this.Height, colour); } //While all odd rows are drawn bottom to top
        }
        /**
         * scroll text on the matrix
         */
        //%blockId="Matrix_scrollText" block="%matrix scroll text %text| with speed %speed| and colour %colour"
        //%weight=75 group="PixelControl"
        //%colour.shadow=neopixel_colors
        //%speed.min=1 speed.max=1024 speed.defl=512
        scrollText(text: string, speed: number, colour: number): void {
            this.strip.clear();
            for (let Xpos = this.Width; Xpos > -6 * text.length; Xpos--) {//for loop to scroll across the entire matrix
                for (let letter = 0; letter < text.length; letter++) {//for loop to retrieve all the letters from te text
                    let bitmap = getLettermap(text.charAt(letter))
                    this.drawBitmap(bitmap, Xpos + (6 * letter), 0, 6, 8, colour)
                }
                this.strip.show();
                basic.pause(2000 / speed);
                this.strip.clear();
            }
        }
        //%blockId="Matrix_drawBitmap" block="%matrix draw bitmap %bitmap at x %x y %y| with width %width height %height in colour %colour"
        //%weight=70 group="PixelControl"
        //% colour.shadow=neopixel.colors
        drawBitmap(bitmap: number[], x: number, y: number, width: number, height: number, colour: number): void {
            for (let bitmask = 0; bitmask < width; bitmask++) {
                if (!((x + bitmask) % 2)) {//Zigzag pixel string: if the row that's being drawn to (Xpos+bitmask) is odd, then draw from bottom to top
                    for (let Ypos = height; Ypos >= 0; Ypos--) {
                        if (bitmap[Ypos] & (0x80 >> bitmask)) { //draw the pixel when there is a "1" in the bitmap
                            this.strip.setPixelColor(((x + bitmask) * this.Height) + Ypos + ((this.Height - 8) / 2), colour)
                        }
                    }
                }
                else {//else draw from top to bottom
                    for (let Ypos = 0; Ypos < this.Height; Ypos++) {
                        if (bitmap[7 - Ypos] & (0x80 >> bitmask)) {
                            this.strip.setPixelColor(((x + bitmask) * this.Height + Ypos + ((this.Height - 8) / 2)), colour)
                        }
                    }
                }
            }
        }
    }

    /**
     * Create a new matrix object
     * @param pin the pin to which the matrix is connected
     * @param matrixWidth the amount of leds horizontally
     * @param matrixheight the amount of leds vertically
     */
    //%blockId="Matrix_Create" block="Matrix at pin %pin|with a width of %matrixWidth|height of %matrixheight| and with %mode pixeltype"
    //%weight=100 blockGap=8 group="Setup"
    //%parts="SmartMatrix"
    //%matrixWidth.defl=32 matrixheight.defl=8
    //%blockSetVariable=matrix
    export function create(pin: DigitalPin, matrixWidth: number, matrixheight: number, mode: NeoPixelMode): Matrix {
        let matrix = new Matrix;
        matrix.strip = neopixel.create(pin, matrixheight * matrixWidth, mode);
        matrix.Width = matrixWidth;
        matrix.Height = matrixheight;

        return matrix;
    }
    //Take in a string-character and return a bitmap to draw on the display
    export function getLettermap(char: string): number[] {
        let letterMap: number[] = [0, 0, 0, 0, 0, 0, 0, 0]
        let offset = ((char.charCodeAt(0)) - 32); //Convert the ASCII-Character to it's code to generate the offset in the font-array
        if (offset >= 0) {
            for (let i = 0; i < 8; i++) {
                //Every character has 8 arguments in the array, so multiply the offset by 8, and then take ne next 8 arguments as the value for the correct bitmap.
                letterMap[i] = font8x3.getNumber(NumberFormat.UInt8BE, ((offset * 8) + i))
            }
        }
        return letterMap;
    }
}
const font8x3 = hex`
    0000000000000000 1038381010001000 6C6C480000000000 00287C28287C2800
    2038403008701000 64640810204C4C00 2050502054483400 3030200000000000
    1020202020201000 2010101010102000 0028387C38280000 0010107C10100000
    0000000000303020 0000007C00000000 0000000000303000 0004081020400000
    38444C5464443800 1030101010103800 3844041820407C00 3844043804443800
    081828487C080800 7C40407804443800 1820407844443800 7C04081020202000
    3844443844443800 3844443C04083000 0000303000303000 0000303000303020
    0810204020100800 00007C00007C0000 2010080408102000 3844041810001000
    38445C545C403800 384444447C444400 7844447844447800 3844404040443800
    7844444444447800 7C40407840407C00 7C40407840404000 3844405C44443C00
    4444447C44444400 3810101010103800 0404040444443800 4448506050484400
    4040404040407C00 446C544444444400 4464544C44444400 3844444444443800
    7844447840404000 3844444454483400 7844447848444400 3844403804443800
    7C10101010101000 4444444444443800 4444444444281000 4444545454542800
    4444281028444400 4444442810101000 7808102040407800 3820202020203800
    0040201008040000 3808080808083800 1028440000000000 00000000000000FC
    3030100000000000 000038043C443C00 4040784444447800 0000384440443800
    04043C4444443C00 0000384478403800 1820207820202000 00003C44443C0438
    4040704848484800 1000101010101800 0800180808084830 4040485060504800
    1010101010101800 0000685454444400 0000704848484800 0000384444443800
    0000784444447840 00003C4444443C04 0000582420207000 0000384038043800
    0020782020281000 0000484848582800 0000444444281000 00004444547C2800
    0000484830484800 0000484848381060 0000780830407800 1820206020201800
    1010100010101000 3008080C08083000 2850000000000000`;
