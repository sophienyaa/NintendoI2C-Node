var keycodes = require('./lib/keycodes')

var mapping = {};

mapping.GP_UP = keycodes.KEY_UP;
mapping.GP_DOWN = keycodes.KEY_DOWN;
mapping.GP_LEFT = keycodes.KEY_LEFT;
mapping.GP_RIGHT = keycodes.KEY_RIGHT;
mapping.GP_A = keycodes.KEY_Z;
mapping.GP_B = keycodes.KEY_X;
mapping.GP_START = keycodes.KEY_1;
mapping.GP_SELECT = keycodes.KEY_2;

for( var i in mapping ) {
    module.exports[ i ] = mapping[i];
}