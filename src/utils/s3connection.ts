import dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";

dotenv.config();
const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
});

export { s3Client };