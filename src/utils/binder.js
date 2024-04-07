/**
 *
 * @param {Array Of Objects} ObjectsConfiguration -----------> Array of the configuration objects
 * @param {Array of Objects} ObjectsMethods -----------> Array of the configuration object ids and the method to bind
 * @param {string} objectMethodDataField -----------> The  method datafield used for these configuration objects
 * @param {string} objectIdDataField -----------> The id datafield used for these configuration objects
 */
export function Binder(
  ObjectsConfiguration,
  ObjectsMethods,
  objectMethodDataField,
  objectIdDataField,
) {
  ObjectsConfiguration.map((object) => {
    var ObjectMethod = ObjectsMethods.find(
      (objectMethod) =>
        objectMethod[objectIdDataField] == object[objectIdDataField],
    );
    if (ObjectMethod) {
      object[objectMethodDataField] = ObjectMethod[objectMethodDataField];
      return object;
    } else {
      console.warn('Binding not found for ' + object[objectIdDataField]);
    }
  });
}
