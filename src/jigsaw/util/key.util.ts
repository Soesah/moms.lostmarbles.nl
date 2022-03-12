export class KeyUtil {
  // control
  public static TabKey: number = 9;
  public static EnterKey: number = 13;
  public static SpaceKey: number = 32;
  public static BackspaceKey: number = 8;
  public static DeleteKey: number = 46;
  public static EscapeKey: number = 27;

  public static ShiftKey: number = 16;
  public static CtrlKey: number = 17;
  public static AltKey: number = 18;
  public static CommandKey: number = 91;

  // arrow
  public static LeftKey: number = 37;
  public static UpKey: number = 38;
  public static RightKey: number = 39;
  public static DownKey: number = 40;

  // punctuation
  public static ColonKey: number = 186;
  public static CommaKey: number = 188;
  public static DotKey: number = 190;

  // number
  public static ZeroKey: number = 48;
  public static OneKey: number = 49;
  public static TwoKey: number = 50;
  public static ThreeKey: number = 51;
  public static FourKey: number = 52;
  public static FiveKey: number = 53;
  public static SixKey: number = 54;
  public static SevenKey: number = 55;
  public static EightKey: number = 56;
  public static NineKey: number = 57;

  public static ControlKeys: number[] = [
    KeyUtil.TabKey,
    KeyUtil.EnterKey,
    KeyUtil.EscapeKey,
    KeyUtil.ShiftKey,
    KeyUtil.CtrlKey,
    KeyUtil.AltKey,
    KeyUtil.CommandKey,
  ];

  public static ArrowKeys: number[] = Array.from(Array(4), (v, i) => i + 37);

  public static NumberKeys: number[] = Array.from(Array(10), (v, i) => i + 48);

  // uppercase and lowercase
  public static LetterKeys: number[] = Array.from(Array(26), (v, i) => i + 65)
    .concat(Array.from(Array(26), (v, i) => i + 97));

  public static isArrowKey(keyCode: number) {
    return KeyUtil.ArrowKeys.includes(keyCode);
  }

  public static isNumberKey(keyCode: number) {
    return KeyUtil.NumberKeys.includes(keyCode);
  }

  public static isLetterKey(keyCode: number) {
    return KeyUtil.LetterKeys.includes(keyCode);
  }

  public static isAlphaNumericKey(keyCode: number) {
    return KeyUtil.ControlKeys.includes(keyCode) && KeyUtil.ArrowKeys.includes(keyCode);
  }

  public static isAllowedHoursKey(keyCode: number) {
    return KeyUtil.NumberKeys.includes(keyCode) ||
      KeyUtil.ArrowKeys.includes(keyCode) ||
      keyCode === KeyUtil.ColonKey ||
      keyCode === KeyUtil.DotKey ||
      keyCode === KeyUtil.EnterKey ||
      keyCode === KeyUtil.DeleteKey ||
      keyCode === KeyUtil.BackspaceKey ||
      keyCode === KeyUtil.TabKey;
  }
}
