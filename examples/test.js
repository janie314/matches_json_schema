import {
  matches_json_schema,
  matches_obj_schema,
} from "https://deno.land/x/matches_json_schema/matches_json_schema.js";

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
