export class Example {
    constructor(name, x, y, z, r = null, claster = 0) {
      this.name = name
      this.x = x
      this.y = y
      this.z = z
      this.r = r
      this.claster = claster
    }

    name() {
        return this.name
    }

    x() {
        return this.x
    }

    y() {
        return this.y
    }

    z() {
        return this.z
    }

    r() {
        return this.r
    }

    claster() {
        return this.claster
    }

    to_string(){
        return JSON.stringify(this, ['name', 'r', 'claster'], 3)    
    }
}