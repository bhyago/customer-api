"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    _id;
    props;
    get id() {
        return this._id;
    }
    constructor(props, id) {
        this.props = props;
        this._id = id || undefined;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map