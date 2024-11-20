import component from "./generators/component/generator.js";
import package_ from "./generators/package/generator.js";
import nextPagePackage from "./generators/next-page-package/generator.js";

const generators = [component, package_, nextPagePackage];

export default function (plop) {
  generators.map((generator) => generator(plop));
}
