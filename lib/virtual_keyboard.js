/*
virtual_gamepad.js
orignal author: miroof
taken from: https://github.com/miroof/node-virtual-gamepads
adapted by: mickwheelz for https://github.com/mickwheelz/NintendoI2C-Node/
*/


(function() {

  var fs = require('fs');
  var ioctl = require('ioctl');
  var uinput = require('../lib/uinput');
  var uinputStructs = require('../lib/uinput_structs');

  virtual_keyboard = (function() {
    function virtual_keyboard() {}

    virtual_keyboard.prototype.connect = function(callback, error) {
      return fs.open('/dev/uinput', 'w+', (function(_this) {
        return function(err, fd) {
          var i, j, uidev, uidev_buffer;
          if (err) {
            return error(err);
          } else {
            _this.fd = fd;
            ioctl(_this.fd, uinput.UI_SET_EVBIT, uinput.EV_KEY);
            for (i = j = 0; j <= 255; i = ++j) {
              ioctl(_this.fd, uinput.UI_SET_KEYBIT, i);
            }
            uidev = new uinputStructs.uinput_user_dev;
            uidev_buffer = uidev.ref();
            uidev_buffer.fill(0);
            uidev.name = Array.from("Virtual keyboard");
            uidev.id.bustype = uinput.BUS_USB;
            uidev.id.vendor = 0x3;
            uidev.id.product = 0x4;
            uidev.id.version = 1;
            return fs.write(_this.fd, uidev_buffer, 0, uidev_buffer.length, null, function(err) {
              var error1;
              if (err) {
                console.log(err);
                return error(err);
              } else {
                try {
                  ioctl(_this.fd, uinput.UI_DEV_CREATE);
                  return callback();
                } catch (error1) {
                  error = error1;
                  console.log(error);
                  fs.close(_this.fd);
                  _this.fd = void 0;
                  return _this.connect(callback, error);
                }
              }
            });
          }
        };
      })(this));
    };

    virtual_keyboard.prototype.disconnect = function(callback) {
      if (this.fd) {
        ioctl(this.fd, uinput.UI_DEV_DESTROY);
        fs.close(this.fd);
        this.fd = void 0;
        return callback();
      }
    };

    virtual_keyboard.prototype.sendEvent = function(event) {
      var ev, ev_buffer, ev_end, ev_end_buffer;
      console.log(event);
      if (this.fd) {
        ev = new uinputStructs.input_event;
        ev.type = event.type;
        ev.code = event.code;
        ev.value = event.value;
        ev.time.tv_sec = Math.round(Date.now() / 1000);
        ev.time.tv_usec = Math.round(Date.now() % 1000 * 1000);
        ev_buffer = ev.ref();
        ev_end = new uinputStructs.input_event;
        ev_end.type = 0;
        ev_end.code = 0;
        ev_end.value = 0;
        ev_end.time.tv_sec = Math.round(Date.now() / 1000);
        ev_end.time.tv_usec = Math.round(Date.now() % 1000 * 1000);
        ev_end_buffer = ev_end.ref();
        fs.writeSync(this.fd, ev_buffer, 0, ev_buffer.length, null);
        return fs.writeSync(this.fd, ev_end_buffer, 0, ev_end_buffer.length, null);
      }
    };

    return virtual_keyboard;

  })();

  module.exports = virtual_keyboard;

}).call(this);
