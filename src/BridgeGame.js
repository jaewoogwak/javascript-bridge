const { RESULT, DIRECTION, COMMAND } = require('./Constants/constant');
const Validator = require('./Validator');

class BridgeGame {
  #bridge;

  #records;

  #retry;

  constructor(bridge) {
    this.#bridge = bridge;
    this.#retry = 1;
    this.#records = [];
  }

  static createTokens(size, generateRandomNumber) {
    Validator.chekcBridgeSizeValue(size);
    const tokens = [];
    let count = 0;
    while (count < size) {
      tokens.push(generateRandomNumber());
      count += 1;
    }
    return tokens;
  }

  move(direction, records = this.#records) {
    Validator.checkCorrectDirection(direction);
    const dir = BridgeGame.isSelectUpper(direction)
      ? DIRECTION.up
      : DIRECTION.down;
    return this.recordDirection(dir, records);
  }

  static isSelectUpper(direction) {
    Validator.checkCorrectDirection(direction);
    if (direction === DIRECTION.up) return true;
    return false;
  }

  recordDirection(direction, records) {
    this.#records = [...records, direction];
    return this.#records;
  }

  retry() {
    this.addRetryCount(1);
    this.initRecords();
  }

  addRetryCount(count) {
    this.#retry += count;
  }

  initRecords() {
    this.#records = [];
  }

  getCurrentDistance() {
    return this.#records.length - 1;
  }

  isEndOfBridge(bridge = this.#bridge, records = this.#records) {
    if (bridge.length === records.length) return true;
    return false;
  }

  getRetryCount() {
    return this.#retry;
  }

  getBridge() {
    return this.#bridge;
  }

  getRecords() {
    return this.#records;
  }

  getGameResult() {
    if (this.isGameSuccess()) return RESULT.success;
    return RESULT.fail;
  }

  isGameSuccess() {
    if (
      this.isEndOfBridge() &&
      this.#bridge[this.getCurrentDistance()] ===
        this.#records[this.getCurrentDistance()]
    )
      return true;
    return false;
  }

  isSameDirection(direction) {
    if (direction === this.#bridge[this.getCurrentDistance()]) return true;
    return false;
  }

  static isWrongDirection(game, direction) {
    if (!game.isSameDirection(direction)) return true;
    return false;
  }

  static isCommandRetry(command) {
    Validator.checkCorrectCommand(command);
    if (command === COMMAND.retry) return true;
    return false;
  }
}

module.exports = BridgeGame;
