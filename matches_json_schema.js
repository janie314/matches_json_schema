// matches_json_schema
// Version 1.0 (October 2021)
// https://gitlab.com/jane314/matches_json_schema

function type_name(x) {
  const type_name = typeof (x);
  if (
    type_name === "string" || type_name === "number" ||
    type_name === "undefined" || type_name === "function"
  ) {
    return type_name;
  }
  if (x === null) {
    return "null";
  }
  if (Array.isArray(x)) {
    return "Array";
  }
  return "Object";
}

export function matches_json_schema(schema_json, obj) {
  try {
    const schema = JSON.parse(schema_json);
    return matches_obj_schema(schema, obj);
  } catch (e) {
    console.error(e.message);
    return false;
  }
}

export function matches_obj_schema(schema, obj) {
  const schema_type = type_name(schema);
  const obj_type = type_name(obj);
  if (schema_type === "function") {
    return schema(obj);
  }

  if (schema_type !== obj_type) {
    return false;
  }
  // At this point we can assume schema_type === obj_type
  if (
    schema_type === "string" || schema_type === "number" ||
    schema_type === "undefined" || schema_type === "null"
  ) {
    return true;
  }
  // At this point we can assume schema_type === obj_type, and either they are both "Array" or both "Object"
  if (schema_type === "Array") {
    return obj.map((entry) => matches_obj_schema(schema[0], entry)).reduce(
      (a, b) => a && b,
      true,
    );
  }
  // At this point we can assume schema_type === obj_type, and either they are both "Object"
  for (const key in schema) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
    if (!matches_obj_schema(schema[key], obj[key])) {
      return false;
    }
  }
  return true;
}
