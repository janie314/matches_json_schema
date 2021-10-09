# matches_json_schema

Version 1.0 (October 2021).

## About

Provides functions `matches_json_schema(schema_json, obj)` and `matches_obj_schema(schema, obj)`, which return `true` or `false`: whether or not `obj` matches the provided `schema`. 

Schema validation happens as follows.

There are 4 primitive types, `number`, `string`, `null`, and `undefined`, and 2
complex types, `Array` and `Object`. Here, "type" always means a primitive type
or complex type, by this definition. You can forget about all other Javascript
and Typescript ideas of "type" for the purposes of this library.

From this, validation is defined recursively as:

- If `schema` and `obj` are both primitive types, then `obj` matches `schema` if
  and only if `schema` and `obj` are the same primitive type.
- If `schema` and `obj` are both complex types, then:
  - If `schema` and `obj` are both type `Array`, then `obj` matches `schema` if
    and only if each element in the array `obj` matches schema `schema[0]`.
  - If `schema` and `obj` are both type `Object`, then `obj` matches `schema` if
    and only if for each key `key` of `schema`, the object `obj` also has the
    key `key`, and `obj[key]` is of type `schema[key]`.

So, for Arrays, we can check that every element in the Array is of a certain
type. For Objects, we check that certain keys are present and associated with
certain types. Extra keys are fine.

## Examples

```javascript
import {
  matches_json_schema,
  matches_obj_schema,
} from "./matches_json_schema.js";

let schema_json = `
{
	"a": 0,
	"b": {
		"c": "",
		"d": 0,
		"e": null
	}
}
`;

// Matching Object
let obj = {
  a: 34,
  b: {
    c: "hello",
    d: 12,
    e: null,
    f: [],
  },
  c: [undefined, 4],
};

console.log(matches_json_schema(schema_json, obj)); // Prints true

// Schema
let schema = [0];

// Matching Object
obj = [2, 3, 5, 7, 11, 13];

console.log(matches_obj_schema(schema, obj)); // Prints true
```



