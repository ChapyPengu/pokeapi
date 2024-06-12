class Move {
  constructor(name, power, accuracy, type, priority, pp, category) {
    this.name = name
    this.power = power
    this.accuracy = accuracy
    this.type = type
    this.priority = priority
    this.maxPp = pp
    this.currentPp = pp
    this.category = category
  }
}

export default Move