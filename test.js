//included libs
var uinput = require('./lib/uinput');
var keycodes = require('./lib/keycodes')
var virtual_keyboard = require('./lib/virtual_keyboard');

//npm libs
var i2c = require('i2c');

var address = 0x54;
var wire = new i2c(address, {device: '/dev/i2c-1'});

var kb = new virtual_keyboard;

function testf() {
    console.log('hi2');
    kb.connect(function() {
        console.log('hi');
        setTimeout(function() {
            kb.sendEvent({type: uinput.EV_KEY, code: keycodes.KEY_A, value:1});
            kb.sendEvent({type: uinput.EV_KEY, code: keycodes.KEY_A, value:0});
        }, 10000);
    });
}

testf();

/*function test() {
    console.log('hi');
    wire.on('data', function(data) {
        console.log(data);
    });
}
    while(true) {
    setTimeout(test, 100);
    }
*/