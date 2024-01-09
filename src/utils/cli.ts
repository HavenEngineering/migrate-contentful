
type ValueFlags = '--glob';
export function extractCliFlagValue(flag: ValueFlags): string | null {
  const args = process.argv.slice(2);
  const flagIndex = args.findIndex(arg => arg === flag);

  if (flagIndex !== -1) {
    const nextValue = args[flagIndex + 1];
    if (nextValue && nextValue.substring(0, 1) === "-") {
      throw new Error(`Flag "${flag}" exists but no value provided`);
    }
    const [_f, value] = process.argv.splice(2 + flagIndex, 2);
    return value;
  }
  return null;
}

type BooleanFlags = '-y';
export function doesCliFlagExist(flag: BooleanFlags): boolean {
  const args = process.argv.slice(2);
  const flagIndex = args.findIndex(arg => arg === flag);

  if (flagIndex !== -1) {
    process.argv.splice(2 + flagIndex, 1);
    return true;
  }
  return false;
}

/*
type ObjectType<T> = T extends true ? boolean : string;

export function extractCliFlagValue<T extends boolean>(flag: Flags, { checkExistence = false } = {}): ObjectType<T> {
  const args = process.argv.slice(2);
  const flagIndex = args.findIndex(arg => arg === flag);

  if (flagIndex !== -1) {
    if (checkExistence) {
      process.argv.splice(2 + flagIndex, 1);
      return true
    }
    const nextValue = args[flagIndex + 1];
    if (nextValue && nextValue.substring(0, 1) === "-") {
      throw new Error(`Flag "${flag}" exists but no value provided`);
    }
    const [_f, value] = process.argv.splice(2 + flagIndex, 2);
    return value;
  }
  return checkExistence ? false : null;
}

*/