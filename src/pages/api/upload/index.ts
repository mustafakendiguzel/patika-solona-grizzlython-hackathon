// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
("");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
  } catch (error) {
    const file = await fs.mkdir(
      path.join(process.cwd() + "/public", "/images")
    );
    console.log(file);
  }
  fs;
  const file = await readFile(req, true);
  res.json({ fileUrl: file.files.myImage.newFilename });
}
