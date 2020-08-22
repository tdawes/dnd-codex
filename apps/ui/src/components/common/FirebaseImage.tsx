import * as React from "react";
import * as firebase from "firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";

export type Props = {
  url: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Spinner = () => <div>Loading...</div>;
const Error = ({ error }: { error: Error }) => <div>{error.message}</div>;

export default ({ url, ...props }: Props) => {
  const ref = React.useMemo(() => firebase.storage().ref(url), [url]);

  const [downloadURL, isLoading, error] = useDownloadURL(ref);

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return <DynamicImage area={20000} src={downloadURL} {...props} />;
};

const DynamicImage = ({
  area,
  onLoad,
  ...props
}: { area: number } & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const ref = React.useRef<HTMLImageElement>(null);

  const [width, setWidth] = React.useState<number | undefined>();
  const [height, setHeight] = React.useState<number | undefined>();

  const wrappedOnLoad = () => {
    const w = ref.current!.width;
    const h = ref.current!.height;
    const a = w * h;

    const scale = Math.sqrt(area / a);

    setWidth(w * scale);
    setHeight(h * scale);
  };

  React.useEffect(() => {
    if (width != null && height != null) {
      onLoad && onLoad(null as any);
    }
  }, [width, height]);

  return (
    <img
      ref={ref}
      onLoad={wrappedOnLoad}
      src={props.src}
      width={width}
      height={height}
      {...props}
    />
  );
};
