import * as React from "react";
import * as firebase from "firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";

export type Props = {
  url: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Spinner = () => <div>Loading...</div>;
const Error = ({ error }: { error: Error }) => <div>{error.message}</div>;

export default ({ url, ...props }: Props) => {
  const ref = firebase.storage().ref(url);
  const [downloadURL, isLoading, error] = useDownloadURL(ref);

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return <img src={downloadURL} {...props} />;
};
