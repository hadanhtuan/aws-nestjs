export function getPattern(prefixCmd: string[], functionName: string): string {
  const cmd = [...prefixCmd, functionName];
  return cmd.join('.');
}

export function prependHTTP(arg: string) {
  const prefix = 'http://';
  if (!arg.startsWith(prefix)) arg = prefix + arg;
  return arg;
}
