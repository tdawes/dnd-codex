import * as React from "react";

export interface Layout {
  min: number;
  max: number;
  layout: string;
}

export interface Props {
  layouts: Layout[];
  Layout: React.ComponentType<{
    className: string | null | undefined;
    value: number;
  }>;
}

export interface State {
  layoutIndex: number;
  value: number;
}

export default class DynamicLayout extends React.Component<Props> {
  public state: State;

  private parent = React.createRef<HTMLDivElement>();
  private child = React.createRef<HTMLDivElement>();

  public constructor(props) {
    super(props);
    this.state = {
      layoutIndex: 0,
      value: this.props.layouts[0].max,
    };
  }

  private asyncSetState = (newState: Partial<State>) => {
    return new Promise(resolve => this.setState(newState, () => resolve()));
  };

  fits = () => {
    if (this.parent.current == null || this.child.current == null) {
      return false;
    }
    const style = window.getComputedStyle(this.parent.current, null);
    const target =
      this.parent.current.clientHeight -
      parseInt(style.getPropertyValue("padding-top"), 10) -
      parseInt(style.getPropertyValue("padding-bottom"), 10);
    const actual = this.child.current.scrollHeight - 1;
    const fits = actual <= target;
    return fits;
  };

  componentDidMount() {
    this.process();
  }

  async process() {
    for (let i = 0; i < this.props.layouts.length; i++) {
      await this.asyncSetState({ layoutIndex: i });
      const layout = this.props.layouts[i];

      let low = layout.min;
      let high = layout.max;
      let mid;

      while (low < high) {
        mid = Math.ceil((low + high) / 2);
        await this.asyncSetState({ value: mid });
        if (this.fits()) {
          low = mid;
        } else {
          high = mid - 1;
        }
      }

      await this.asyncSetState({ value: low });
      if (this.fits()) {
        break;
      }
    }
  }

  render() {
    const { layout } = this.props.layouts[this.state.layoutIndex];
    const { Layout } = this.props;
    return (
      <div
        ref={this.parent}
        style={{ overflow: "hidden", maxWidth: "100%", maxHeight: "100%" }}
      >
        <div ref={this.child} style={{ display: "block" }}>
          <Layout className={layout} value={this.state.value}>
            {this.props.children}
          </Layout>
        </div>
      </div>
    );
  }
}
