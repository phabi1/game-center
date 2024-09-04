export class Color {
  static getColor(color: string): number {
    switch (color) {
      case "red":
        return 0xff0000;
      case "green":
        return 0x00ff00;
      case "blue":
        return 0x0000ff;
      case "yellow":
        return 0xffff00;
      case "purple":
        return 0xff00ff;
      case "orange":
        return 0xffa500;
      default:
        return 0xffffff;
    }
  }
}
