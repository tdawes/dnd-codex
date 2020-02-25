import * as React from "react";
import * as firebase from "firebase";
import newUUID from "uuid/v4";
import { Input } from "theme-ui";

export interface Props {
  onUpload: (path: string) => any;
  folder: string;
  fileTypes?: string[];
}

export default (props: Props) => (
  <Input
    type="file"
    accept={(props.fileTypes || []).join(",")}
    onChange={async e => {
      if (e.target.files == null || e.target.files.length === 0) {
        return;
      }
      const file = e.target.files[0];
      const id = `${props.folder}/${newUUID()}`;
      await firebase
        .storage()
        .ref(id)
        .put(file, { contentType: file.type });
      props.onUpload(id);
    }}
  />
);
