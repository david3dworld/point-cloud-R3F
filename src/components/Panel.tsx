import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { RootState } from "../store/store";
import { setPointCloudFile } from "../store/sceneSlice";

export default function Panel() {
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      dispatch(setPointCloudFile(acceptedFiles[0]));
    },
    [dispatch, setPointCloudFile]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        background: "lightgrey",
        padding: "2rem",
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <p>Click or Drop File</p>
      </div>
    </div>
  );
}
