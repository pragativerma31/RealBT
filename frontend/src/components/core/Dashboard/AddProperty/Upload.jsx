import { useEffect, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = [],
  editData = [],
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewSources, setPreviewSources] = useState(
    viewData?.length ? viewData : editData?.length ? editData : []
  );

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setPreviewSources((prev) => [...prev, ...newFiles.map((f) => f.preview)]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video ? "video/*" : "image/*",
    onDrop,
    multiple: true, // Allow multiple file uploads
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      setValue(name, selectedFiles.map((f) => f.file));
    }
  }, [selectedFiles, setValue, name]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm " htmlFor={name}>
        {label} {!viewData?.length && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        <input {...getInputProps()} multiple /> 

        {previewSources && previewSources.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 p-4">
            {previewSources.map((src, index) => (
              <div key={index} className="relative">
                {!video ? (
                  <img src={src} alt={`Preview ${index}`} className="h-24 w-24 rounded-md object-cover" />
                ) : (
                  <Player aspectRatio="16:9" playsInline src={src} />
                )}
                {!viewData?.length && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewSources((prev) => prev.filter((_, i) => i !== index));
                      setSelectedFiles((prev) => prev ? prev.filter((_, i) => i !== index) : []);
                      if (selectedFiles && selectedFiles.length > 0) {
                        setValue(name, selectedFiles.map((f) => f.file));
                      }
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop {video ? "videos" : "images"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> files
            </p>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}


