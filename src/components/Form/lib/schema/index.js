export default class Schema {
  constructor(schema) {
    this._schema = {};
    this._traverseSchema(schema);
  }

  _ensurePresent(object, values = {}) {
    return Object.entries(values).reduce((prev, [key, value]) => {
      return object[key] !== undefined
        ? { ...prev, [key]: object[key] }
        : { ...prev, [key]: value };
    }, object);
  }

  _normalizeDefinition(definition) {
    return this._ensurePresent(definition, {
      defaultValue: "",
      display: true,
      required: false,
      validations: []
    });
  }

  _traverseSchema(schema) {
    return Object.entries(schema).forEach(([k, v]) => {
      this._schema[k] = this._normalizeDefinition(v);
    });
  }

  defaults() {
    return Object.entries(this._schema).reduce(
      (prev, [name, def]) => ({ ...prev, [name]: def.defaultValue }),
      {}
    );
  }

  inputs() {
    return this._schema;
  }
}
