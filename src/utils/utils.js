export function hexToString(hex) {
    // Ensure the hex string has the "0x" prefix removed
    hex = hex.startsWith('0x') ? hex.slice(2) : hex;
    
    // Convert the hex string to a string using the UTF-8 encoding
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
      var byte = parseInt(hex.substr(i, 2), 16);
      if (byte) str += String.fromCharCode(byte);
    }
    
    return str;
  }