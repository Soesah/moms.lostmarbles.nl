export class UUIDUtil {
  public static maxFromBits(bits: number) {
    return Math.pow(2, bits);
  }

  public static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static randomUI06(): number {
    return UUIDUtil.getRandomInt(0, UUIDUtil.maxFromBits(6) - 1);
  }

  public static randomUI08(): number {
    return UUIDUtil.getRandomInt(0, UUIDUtil.maxFromBits(8) - 1);
  }

  public static randomUI12(): number {
    return UUIDUtil.getRandomInt(0, UUIDUtil.maxFromBits(12) - 1);
  }

  public static randomUI16(): number {
    return UUIDUtil.getRandomInt(0, UUIDUtil.maxFromBits(16) - 1);
  }

  public static randomUI32(): number {
    return UUIDUtil.getRandomInt(0, UUIDUtil.maxFromBits(32) - 1);
  }

  public static randomUI48(): number {
    return (
      // tslint:disable-next-line
      (0 | (Math.random() * (1 << 30))) +
      // tslint:disable-next-line
      (0 | (Math.random() * (1 << (48 - 30)))) * (1 << 30)
    );
  }

  public static paddedString(str: string, length: number, z?: string): string {
    str = String(str);
    z = !z ? '0' : z;
    let i = length - str.length;
    // tslint:disable-next-line
    for (; i > 0; i >>>= 1, z += z) {
      // tslint:disable-next-line
      if (i & 1) {
        str = z + str;
      }
    }
    return str;
  }

  public static fromParts(
    timeLow: number,
    timeMid: number,
    timeHiAndVersion: number,
    clockSeqHiAndReserved: number,
    clockSeqLow: number,
    node: number,
  ) {
    const hex =
      UUIDUtil.paddedString(timeLow.toString(16), 8) +
      '-' +
      UUIDUtil.paddedString(timeMid.toString(16), 4) +
      '-' +
      UUIDUtil.paddedString(timeHiAndVersion.toString(16), 4) +
      '-' +
      UUIDUtil.paddedString(clockSeqHiAndReserved.toString(16), 2) +
      UUIDUtil.paddedString(clockSeqLow.toString(16), 2) +
      '-' +
      UUIDUtil.paddedString(node.toString(16), 12);
    return hex;
  }

  public static uuid4(): string {
    return UUIDUtil.fromParts(
      UUIDUtil.randomUI32(),
      UUIDUtil.randomUI16(),
      // tslint:disable-next-line
      0x4000 | UUIDUtil.randomUI12(),
      // tslint:disable-next-line
      0x80 | UUIDUtil.randomUI06(),
      UUIDUtil.randomUI08(),
      UUIDUtil.randomUI48(),
    );
  }

  // addition by Ka-Jan to test for validity
  // Based on: http://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
  public static validate(uuid: string) {
    const testPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return testPattern.test(uuid);
  }
}
