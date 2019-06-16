import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {
  transform(value): any {
    const keys = [];
    for (const enumMember in value) {
      if (enumMember) keys.push({ key: enumMember, value: value[enumMember] });
    }
    return keys;
  }
}
