# NintendoI2C-Node

An attempt to build a daemon for a Nintendo Classic Mini controller (and maybe others) for use with RetroPie and similar.

These controllers use the standard I2C protocol to communicate and thus can be read by a Raspberry Pi using its I2C bus.

## Connecting to the Raspberry Pi

Connecting the controller is simple, you can either cut off the plug and wire directly, or use an adapter such as this one from adafruit

https://www.adafruit.com/product/345

There are four wires that need to be connected;

* 3.3v - Power Input - Raspberry Pi Pin 1
* Gnd - Power Input - Raspberry Pi Pin 6
* SDA - I2C Data - Raspberry Pi Pin 3
* SCL - I2C Clock - Raspberry Pi Pin 5

The pinout is as per below;

![pinout](http://img.gunook.com/upload/9/f4/9f466e4b21882a5473c0a61a77a5f166.jpg)

and a pinout for the Raspberry Pi is available at

https://pinout.xyz/pinout/i2c

I found a cheap controller called a "Gioteck Nintendo Mini" These can be had in the UK from from Poundland, Argos, Ebay and similar.

I got mine for £5 from Poundland and it is what I am using for testing, as it was so cheap I opted to cut the plug off and add header sockets to plug directy linto the Raspebrry Pi.

https://www.ebay.co.uk/itm/Gioteck-Turbo-Controller-for-Nintendo-Classic-Mini-From-the-Argos-Shop-on-ebay/362156662685?epid=719581866&hash=item5452381f9d:g:9uUAAOSwXz9Zk3ZV

## Building and using the daemon

TBC

## How it works

The daemon translates button presses into keyboard presses.

For example;

If you press 'Up' on the controller dpad, the program sends a keyboard 'Up' to the system.

You then map these keys in your application or emulator and you can use the controller as you would normally.

### Default Key Mappings

* Dpad Up - Keyboard Up Arrow
* Dpad Down -  Keyboard Down Arrow
* Dpad Left - Keyboard Left Arrow
* Dpad Right - Keyboard Right Arrow
* Start - Keyboard "1" Key
* Select - Keyboard "2" Key
* A - Keyboard "Z" Key
* B - Keyboard "X" Key

These mappings can be changed by editing "mapping_keyboard.js"
