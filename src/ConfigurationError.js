export default function ConfigurationError(message) {
  this.name = 'ConfigurationError';
  this.message = message;
  this.stack = new Error().stack;
}
ConfigurationError.prototype = Object.create(Error.prototype);
ConfigurationError.prototype.constructor = ConfigurationError;
