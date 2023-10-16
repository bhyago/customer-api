export class Entity<Props> {
  private _id?: number
  readonly props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: number) {
    this.props = props
    this._id = id || undefined
  }
}
