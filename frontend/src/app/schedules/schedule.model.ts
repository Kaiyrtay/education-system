export class Schedule {
  constructor(
    public id: number | null,
    public group?: number,
    public subject?: number,
    public teacher?: number,
    public week_day?: number,
    public start_time?: string,
    public end_time?: string
  ) {}
}
