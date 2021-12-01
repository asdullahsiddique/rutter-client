export default function RutterError(message, errorType, errorCode) {
  this.name = 'RutterError';
  this.message = message;
  this.errorType = errorType;
  this.errorCode = errorCode;
  this.stack = new Error().stack;
}
RutterError.prototype = Object.create(Error.prototype);
RutterError.prototype.constructor = RutterError;
