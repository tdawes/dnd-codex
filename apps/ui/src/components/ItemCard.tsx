import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import * as React from "react";
import { Item, Weapon, Caster } from "../types/items";
import FirebaseImage from "./common/FirebaseImage";
import styled from "@emotion/styled";
import { Flex } from "theme-ui";

export interface Props {
  item: Item;
  frontRef?: React.RefObject<HTMLDivElement>;
  backRef?: React.RefObject<HTMLDivElement>;
}

const modifier = (m: number) => {
  if (m > 0) {
    return `+${m}`;
  } else {
    return `${m}`;
  }
};

const requiresAttunement = (item: Item) => {
  if (!item.requiresAttunement) {
    return null;
  }

  if (
    Array.isArray(item.requiresAttunement) &&
    item.requiresAttunement.length > 0
  ) {
    return `requires attunement (${item.requiresAttunement.join(", ")})`;
  } else {
    return "requires attunement";
  }
};

const getBasicSummary = (item: Item) =>
  [item.type, item.rarity, requiresAttunement(item)]
    .filter(x => !!x)
    .join(", ");

const getWeaponSummary = (item: Weapon) =>
  [
    item.modifier != null && item.modifier !== 0
      ? `${modifier(item.modifier)} ${item.subtype}`
      : item.subtype,

    item.rarity,
    requiresAttunement(item),
  ]
    .filter(x => !!x)
    .join(", ");

const getCasterSummary = (item: Caster) =>
  [item.subtype, item.rarity, requiresAttunement(item)]
    .filter(x => !!x)
    .join(", ");

const getSummary = (item: Item) => {
  if (item.type === "weapon") {
    return getWeaponSummary(item);
  } else if (item.type === "caster") {
    return getCasterSummary(item);
  } else {
    return getBasicSummary(item);
  }
};

const Card = styled.div`
  border-radius: 30px;
  border: 15px solid black;
  width: 256px;
  height: 384px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  margin: 0.5em;
  overflow: hidden;
  box-sizing: content-box;
  font-family: pristina;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  margin-top: 12px;
  margin-bottom: 0;
  text-decoration: underline;
  font-size: 24px;
  text-align: center;
  font-family: pristina;
`;

const Summary = styled.div`
  font-size: 14px;
  margin: 12px 0;
  text-align: center;
  font-style: italic;
  font-family: pristina;
`;

const Description = styled.div<{ fontSize: number; inline: number }>`
  display: ${props => (props.inline ? "inherit" : "flex")};
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-family: pristina;
  line-height: initial;
  white-space: pre-wrap;
  font-size: ${props => props.fontSize}px;
  flex-grow: 1;
`;

const InlineWrapper = styled.div<{ inline: number }>`
  display: ${props => (props.inline ? "block" : "flex")};
  flex-direction: column;
  align-items: center;
`;

const StyledFirebaseImage = styled(FirebaseImage)<{ inline: number }>`
  // width: auto;
  // height: auto;
  // max-height: 128px;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  margin-bottom: 12px;
  ${props => props.inline && "float: left;"}
`;

export interface FrontCardProps {
  name: string;
  summary: string;
  image?: string;
  description: string;
  descriptionFontSize: number;
  inlineImage: boolean;
  parentRef: React.Ref<HTMLDivElement>;
  childRef: React.Ref<HTMLDivElement>;
  recalculateLayout: () => any;
}

const FrontCard = ({
  name,
  summary,
  image,
  description,
  descriptionFontSize,
  inlineImage,
  parentRef,
  childRef,
  recalculateLayout,
}: FrontCardProps) => (
  <Card ref={parentRef}>
    <CardContent ref={childRef}>
      <Header>{name}</Header>
      <Summary>{summary}</Summary>
      <InlineWrapper inline={inlineImage ? 1 : 0}>
        {image && (
          <StyledFirebaseImage
            url={image}
            onLoad={recalculateLayout}
            inline={inlineImage ? 1 : 0}
          />
        )}
        <Description
          fontSize={descriptionFontSize}
          inline={inlineImage ? 1 : 0}
        >
          {description}
        </Description>
      </InlineWrapper>
    </CardContent>
  </Card>
);

export interface BackCardProps {
  description: string;
  descriptionFontSize: number;
  parentRef: React.Ref<HTMLDivElement>;
  childRef: React.Ref<HTMLDivElement>;
}

const BackCard = ({
  description,
  descriptionFontSize,
  parentRef,
  childRef,
}: BackCardProps) => (
  <Card ref={parentRef}>
    <CardContent ref={childRef}>
      <Description fontSize={descriptionFontSize} inline={0}>
        {description}
      </Description>
    </CardContent>
  </Card>
);

export interface DynamicLayoutProps {
  item: Item;
  children: (props: any) => React.ReactNode;
}

const layoutOptions = [
  {
    multiside: false,
    inlineImage: false,
    maxFontSize: 20,
    minFontSize: 14,
  },
  {
    multiside: false,
    inlineImage: true,
    maxFontSize: 20,
    minFontSize: 14,
  },
  {
    multiside: true,
    inlineImage: false,
    maxFontSize: 18,
    minFontSize: 14,
  },
  {
    multiside: true,
    inlineImage: true,
    maxFontSize: 20,
    minFontSize: 14,
  },
];

export interface DynamicLayoutState {
  option: number;
  fontSize: number;
  breakpoint: number;
}

class DynamicLayout extends React.Component<Props> {
  public state: DynamicLayoutState;

  public constructor(props: Props) {
    super(props);
    this.state = {
      option: 0,
      fontSize: layoutOptions[0].maxFontSize,
      breakpoint: props.item.description?.length || 0,
    };
  }

  private frontParent = React.createRef<HTMLDivElement>();
  private frontChild = React.createRef<HTMLDivElement>();
  private backParent = React.createRef<HTMLDivElement>();
  private backChild = React.createRef<HTMLDivElement>();

  private asyncSetState = (newState: Partial<DynamicLayoutState>) => {
    return new Promise(resolve => this.setState(newState, () => resolve()));
  };

  private isOverflowing = (parent: HTMLDivElement, child: HTMLDivElement) => {
    const style = window.getComputedStyle(parent, null);
    const target =
      parent.clientHeight -
      parseInt(style.getPropertyValue("padding-top"), 10) -
      parseInt(style.getPropertyValue("padding-bottom"), 10);
    const actual = child.scrollHeight - 1;
    return actual > target;
  };

  private _contentFits = (
    parent: React.RefObject<HTMLDivElement>,
    child: React.RefObject<HTMLDivElement>,
  ) => {
    if (parent.current == null || child.current == null) {
      return false;
    }

    const overflow = this.isOverflowing(parent.current, child.current);
    return !overflow;
  };

  private frontContentFits = () =>
    this._contentFits(this.frontParent, this.frontChild);

  private backContentFits = () =>
    this._contentFits(this.backParent, this.backChild);

  private contentFits = () => {
    if (!this.frontContentFits()) {
      return false;
    }
    const layout = layoutOptions[this.state.option];
    if (layout.multiside) {
      if (!this.backContentFits()) {
        return false;
      }
    }

    return true;
  };

  public componentDidMount() {
    this.process();
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.item !== this.props.item) {
      this.process();
    }
  }

  public async process() {
    const possibleBreakpoints = (this.props.item.description || "")
      .split("")
      .map((c, i) => (/\s/.test(c) ? i : null))
      .filter(x => x != null) as number[];

    for (let i = 0; i < layoutOptions.length; i++) {
      await this.asyncSetState({ option: i });

      // Choose a font size
      const layout = layoutOptions[i];

      let lowFontSize = layout.minFontSize;
      let highFontSize = layout.maxFontSize + 1;
      let midFontSize;

      while (lowFontSize < highFontSize) {
        midFontSize = Math.ceil((lowFontSize + highFontSize) / 2);
        await this.asyncSetState({ fontSize: midFontSize });

        if (layout.multiside) {
          // Find the best breakpoint
          let lowBreakpoint = 0;
          let highBreakpoint = possibleBreakpoints.length;
          let midBreakpoint;

          while (lowBreakpoint < highBreakpoint) {
            midBreakpoint = Math.ceil((lowBreakpoint + highBreakpoint) / 2);
            await this.asyncSetState({
              breakpoint: possibleBreakpoints[midBreakpoint]!,
            });

            if (this.frontContentFits()) {
              lowBreakpoint = midBreakpoint;
            } else {
              highBreakpoint = midBreakpoint - 1;
            }
          }

          await this.asyncSetState({
            breakpoint: possibleBreakpoints[lowBreakpoint],
          });
        } else {
          await this.asyncSetState({
            breakpoint: (this.props.item.description || "").length,
          });
        }

        if (this.contentFits()) {
          lowFontSize = midFontSize;
        } else {
          highFontSize = midFontSize - 1;
        }
      }

      await this.asyncSetState({ fontSize: lowFontSize });
      if (this.contentFits()) {
        break;
      }
    }
  }

  public render() {
    return (
      <div>
        {this.props.children &&
          typeof this.props.children === "function" &&
          this.props.children({
            multiside: layoutOptions[this.state.option].multiside,
            inlineImage: layoutOptions[this.state.option].inlineImage,
            fontSize: this.state.fontSize,
            breakpoint: this.state.breakpoint,
            frontParent: this.frontParent,
            frontChild: this.frontChild,
            backParent: this.backParent,
            backChild: this.backChild,
            recalculate: () => this.process(),
          })}
      </div>
    );
  }
}

export default ({ item, frontRef, backRef }: Props) => {
  return (
    <Flex>
      <DynamicLayout item={item}>
        {({
          multiside,
          inlineImage,
          fontSize,
          breakpoint,
          frontParent,
          frontChild,
          backParent,
          backChild,
          recalculate,
        }) => {
          const frontDescription = _.trimEnd(
            item.description?.slice(0, breakpoint),
          );
          const backDescription = _.trimStart(
            item.description?.slice(breakpoint + 1),
          );

          const renderFrontCard = children => {
            if (frontRef == null) {
              return children;
            } else if (frontRef.current === null) {
              return <div />;
            } else {
              return ReactDOM.createPortal(children, frontRef.current);
            }
          };

          const renderBackCard = children => {
            if (backRef == null) {
              return multiside ? children : null;
            } else if (backRef.current === null) {
              return <div />;
            } else {
              return ReactDOM.createPortal(children, backRef.current);
            }
          };

          return (
            <Flex>
              {renderFrontCard(
                <FrontCard
                  parentRef={frontParent}
                  childRef={frontChild}
                  name={item.name}
                  summary={getSummary(item)}
                  image={item.image}
                  description={frontDescription}
                  descriptionFontSize={fontSize}
                  inlineImage={inlineImage}
                  recalculateLayout={recalculate}
                />,
              )}
              {renderBackCard(
                <BackCard
                  parentRef={backParent}
                  childRef={backChild}
                  description={backDescription}
                  descriptionFontSize={fontSize}
                />,
              )}
            </Flex>
          );
        }}
      </DynamicLayout>
    </Flex>
  );
};
