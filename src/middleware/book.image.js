import { S3 } from '@aws-sdk/client-s3';
// AWS.config.update({region: 'ap-northeast-2'})
import multer from 'multer';
import multerS3 from 'multer-s3';

import { createUUID } from './uuid.js';

import path from 'path';
import dotenv from 'dotenv';

import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';

dotenv.config();    // .env 파일 사용

const s3 = new S3({
  region: process.env.AWS_S3_REGION,
  credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY
  }
});

// 확장자 검사 목록
const allowedExtensions =  ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

export const imageUploader = multer({
    storage: multerS3({
        s3: s3,   // S3 객체
        bucket: process.env.AWS_S3_BUCKET_NAME,   // Bucket 이름
        contentType: multerS3.AUTO_CONTENT_TYPE,  // Content-type, 자동으로 찾도록 설정
        key: (req, file, callback) => {           // 파일명
            const uploadDirectory = 'books';  // 디렉토리 path 설정을 위해서
            const extension = path.extname(file.originalname);  // 파일 이름 얻어오기
            console.log("file.originalname : " + file.originalname);
            const uuid = createUUID();                          // UUID 생성
            // extension 확인을 위한 코드 (확장자 검사용)
            if(!allowedExtensions.includes(extension)){
                return callback(new BaseError(status.WRONG_EXTENSION))
            }
            callback(null, `${uploadDirectory}/${uuid}_${file.originalname}`)
        },
        acl: 'public-read-write'  // 파일 액세스 권한
    }),
    // 이미지 용량 제한 (50MB)
    limits: { fileSize: 50 * 1024 * 1024},
});

// S3에서 이미지 삭제
export const deleteImage = (fileKey) => {
    s3.deleteObject(
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      },
      (err, data) => {
        if (err) {
          throw err;
        } else {
          console.log('Image Deleted');
        }
      }
    );
  };