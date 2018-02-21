//included libs
var uinput = require('./lib/uinput');
var keycodes = require('./lib/keycodes')
var virtual_keyboard = require('./lib/virtual_keyboard');
var gpmap = require('./gamepad_map');

//npm libs
var i2c = require('i2c');

var address = 0x52;
var wire = new i2c(address, {device: '/dev/i2c-1'});

var kb = new virtual_keyboard;
var mapping = require('./mapping_keyboard');

var oldKey;

function getKeyFromBytes(bytes) {
    if(bytes == undefined) {
        return 0;
    }
    //DIRECTIONAL
    if(bytes[5] == 254) {
        return mapping.GP_UP;
    }
    if(bytes[4] == 191) {
        return mapping.GP_DOWN;
    }
    if(bytes[4] == 127) {
        return mapping.GP_RIGHT;
    }
    if(bytes[5] == 253) {
        return mapping.GP_LEFT;
    }

    //BUTTONS
    if(bytes[4] == 239) {
        return mapping.GP_SELECT;
    }
    if(bytes[4] == 251) {
        return mapping.GP_START
    }
    if(bytes[5] == 239) {
        return mapping.GP_A;
    }
    if(bytes[5] == 191) {
        return mapping.GP_B;
    }
    else {
        return 0;
    }
}

function main() {
    console.log('Starting Up...');

    kb.connect(function() {
        console.log('Keyboard Connected!');
        //setTimeout(function() {
            writeI2CtoKeyboard(50)
        //}, 50);
    
    });
}

function writeI2CtoKeyboard(delay) {

    //console.log('MAP ' + JSON.stringify(gamePadToKeyMap) );

    setInterval(function () {
        
        wire.read(6, function(err, res) {
            //console.log('RAW ' + res);
            //console.log('Current ' + getKeyFromBytes(res))
            //console.log('Old ' + getKeyFromBytes(oldKey))

            if(res[0] == 0 ) {
                if(getKeyFromBytes(oldKey) != getKeyFromBytes(res)) {
                    sendKey(getKeyFromBytes(oldKey), 0);
                    sendKey(getKeyFromBytes(res), 1);
                }
                else {
                    if(getKeyFromBytes(res) != 0) {
                        sendKey(getKeyFromBytes(res), 1);
                    }
                }
                oldKey = res;
            }
        });
    }, delay); // repeat forever, polling every 3 seconds
}

function sendKey(key, value) {
    kb.sendEvent({type: uinput.EV_KEY, code: key, value:value});
}

main();

