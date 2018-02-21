
var gamepad = {};

gamepad.UP = [0,0,128,128,255,254];
gamepad.DOWN = [0,0,128,128,191,254];
/*mapping.LEFT = keycodes.KEY_LEFT;
mapping.RIGHT = keycodes.KEY_RIGHT;
mapping.A = keycodes.KEY_Z;
mapping.B = keycodes.KEY_X;
mapping.START = keycodes.KEY_1;
mapping.SELECT = keycodes.KEY_2;*/

for( var i in gamepad ) {
    module.exports[ i ] = gamepad[i];
}