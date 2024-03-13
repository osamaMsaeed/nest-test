import { Transform } from 'class-transformer';

export function ParseToInt() {
  return Transform(({ value }) =>
    value && typeof value == 'string' ? parseInt(value) : value,
  );
}

export function TrimString() {
  return Transform(({ value }) =>
    value && typeof value == 'string' ? value.trim() : value,
  );
}
