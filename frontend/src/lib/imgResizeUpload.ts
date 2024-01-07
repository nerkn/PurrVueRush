import { Product } from "./types";

export async function imgResizeUpload(
  img: HTMLImageElement,
  apiEndPoint: string,
  maxDimention = 3200
): Promise<Product> {
  let ratio = 1;
  let width = maxDimention;
  let height = maxDimention;
  if (img.naturalWidth > img.naturalHeight) {
    ratio = maxDimention / img.naturalWidth;
    height = Math.round(ratio * img.naturalHeight);
  } else {
    ratio = maxDimention / img.naturalHeight;
    width = Math.round(ratio * img.naturalWidth);
  }
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  if (!ctx) {
    console.log("context failed");
    return new Promise((_resolve, reject) => {
      reject();
    });
  }
  ctx.drawImage(img, 0, 0, width, height);
  return await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        let fd = new FormData();
        if (!blob) return reject();
        fd.append("img", blob, "img.webp");
        return fetch(apiEndPoint, {
          method: "post",
          body: fd,
          headers: { enctype: "multipart/form-data" },
        })
          .then((r) => r.json())
          .then((r) => resolve(r))
          .catch((e) => reject(e));
      },
      "image/webp",
      0.9
    );
  });
}
