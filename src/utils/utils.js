export function hexToString(hex) {

    hex = hex.startsWith('0x') ? hex.slice(2) : hex;
  
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
      var byte = parseInt(hex.substr(i, 2), 16);
      if (byte) str += String.fromCharCode(byte);
    }
    
    return str;
  }