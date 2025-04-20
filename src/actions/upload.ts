'use server';

import { v2 as cloudinary, SignApiOptions } from 'cloudinary';

if (!process.env.CLOUDINARY_SECRET_KEY) {
  throw new Error('CLOUDINARY_SECRET_KEY is not defined');
}

export interface UploadResponse {
  signature: string;
  [key: string]: string;
}

export default async function getSignUploadRequest(
  formData: FormData
): Promise<UploadResponse> {
  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  const filename = formData.get('filename') as string;

  const optionsForSignature: SignApiOptions = {
    timestamp,
    public_id: filename,
    eager: 'br_42k',
  };

  const signature = cloudinary.utils.api_sign_request(
    optionsForSignature,
    process.env.CLOUDINARY_SECRET_KEY as string
  );

  return { signature, ...optionsForSignature };
}
