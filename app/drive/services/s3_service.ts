import { S3Client, CreateBucketCommand, HeadBucketCommand } from '@aws-sdk/client-s3'
import env from '#start/env'

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
}
