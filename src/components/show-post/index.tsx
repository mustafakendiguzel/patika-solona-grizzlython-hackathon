import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import path from "path";
import fs from "fs/promises";
import { getCurrentUser } from "components/login-register/login";

export const ShowPostList: FC = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="flex w-2/5 h-52 justify-center bg-[#000]">
      <div>ADAS</div>
    </div>
  );
};
