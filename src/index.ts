import { MyType } from "../types";
import example from "./example";

export default function MyModule(): MyType {
  return {
    message: example()
  };
}

export * from "../types";
