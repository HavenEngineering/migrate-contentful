const valueFlags = ["--glob"] as const;
const booleanFlags = ["-y"] as const;

type ValueFlags = typeof valueFlags[number];
type BooleanFlags = typeof booleanFlags[number];

type flagNames = ValueFlags | BooleanFlags;
type ExtractedReturnType<T extends flagNames> = T extends BooleanFlags
  ? boolean
  : T extends ValueFlags
  ? string
  : never;

const isBooleanFlag = (flag: flagNames): flag is BooleanFlags =>
  booleanFlags.find(f => f === flag) !== undefined;
const isValueFlag = (flag: flagNames): flag is ValueFlags =>
  valueFlags.find(f => f === flag) !== undefined;

export function extractCliFlagValueFromArgs<T extends flagNames>(
  flag: T
): ExtractedReturnType<T> {
  const args = [...process.argv.slice(2)];
  const flagIndex = args.findIndex(arg => arg === flag);
  const flagExists = flagIndex !== -1;

  if (flagExists) {
    if (isBooleanFlag(flag)) {
        process.argv.splice(2 + flagIndex, 1); // remove so they don't get passed onto the next command
        return true as ExtractedReturnType<T>;
      } else if (isValueFlag(flag)) {
      const value = args[flagIndex + 1];
      if (value && value.substring(0, 1) === "-") {
        throw new Error(`Flag "${flag}" exists but no value provided`);
      }
      process.argv.splice(2 + flagIndex, 2); // remove so they don't get passed onto the next command
      return value as ExtractedReturnType<T>;
    }
  }

  if (isBooleanFlag(flag)) {
    return false as ExtractedReturnType<T>;
  }

  return null as ExtractedReturnType<T>;
}
