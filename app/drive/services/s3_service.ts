import { S3Client, CreateBucketCommand, HeadBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import env from '#start/env'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import fs from 'fs'
import path from 'path'

export default class S3Service {
  #client: S3Client

  constructor() {
    this.#client = new S3Client({
      endpoint: env.get('S3_ENDPOINT'),
      region: env.get('S3_REGION'),
      credentials: {
        accessKeyId: env.get('S3_ACCESS_KEY'),
        secretAccessKey: env.get('S3_SECRET_KEY'),
      },
      forcePathStyle: true, // Needed for MinIO
    })
  }

  async createBucket(bucketName: string): Promise<void> {
    try {
      // Check if bucket exists
      await this.#client.send(new HeadBucketCommand({ Bucket: bucketName }))
    } catch (error) {
      if (error.name === 'NotFound') {
        // Bucket doesn't exist, create it
        await this.#client.send(new CreateBucketCommand({ Bucket: bucketName }))
      } else {
        // Some other error occurred
        throw error
      }
    }
  }

  async uploadFile(bucketName: string, file: MultipartFile, key: string): Promise<void> {
    const fileStream = fs.createReadStream(file.tmpPath!)
    
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
      ContentType: file.headers['content-type'],
    }

    try {
      await this.#client.send(new PutObjectCommand(uploadParams))
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`)
    }
  }

  async uploadFolder(bucketName: string, folderPath: string, s3FolderKey: string): Promise<void> {
    const files = this.getAllFiles(folderPath)

    for (const file of files) {
      const key = path.join(s3FolderKey, path.relative(folderPath, file))
      const fileStream = fs.createReadStream(file)

      const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: fileStream,
      }

      try {
        await this.#client.send(new PutObjectCommand(uploadParams))
      } catch (error) {
        throw new Error(`Error uploading file ${file}: ${error.message}`)
      }
    }
  }

  private getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath)

    files.forEach((file) => {
      const filePath = path.join(dirPath, file)
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = this.getAllFiles(filePath, arrayOfFiles)
      } else {
        arrayOfFiles.push(filePath)
      }
    })

    return arrayOfFiles
  }

}
