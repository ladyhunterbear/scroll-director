

export class CssClass {
  public initial: string;
  public on: string;
  public final: string = '';
  
  constructor(initial: string, on: string, final: string = '') {
    this.initial = initial;
    this.on = on;
    this.final = final;
  }
}