import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudTasksClient } from '@google-cloud/tasks';
import { google } from '@google-cloud/tasks/build/protos/protos';
import HttpMethod = google.cloud.tasks.v2.HttpMethod;

@Injectable()
export class GcpTaskQueueService {
  private readonly logger = new Logger(GcpTaskQueueService.name);

  private readonly projectId: string;
  private readonly location: string;
  private readonly queueName: string;
  private readonly client: CloudTasksClient;

  constructor(config: ConfigService) {
    this.projectId = config.getOrThrow<string>('GCP_PROJECT_ID');
    this.location = config.get<string>('GCP_LOCATION', 'europe-west6');
    this.queueName = config.get<string>('GCP_QUEUE_NAME', 'async-jobs');
    this.client = new CloudTasksClient();
    this.logger.debug(
      `CloudTasksClient created successfully [${this.client.queuePath(
        this.projectId,
        this.location,
        this.queueName,
      )}]`,
    );
  }

  async createTask(jobId: string, url: string) {
    const parent = this.client.queuePath(
      this.projectId,
      this.location,
      this.queueName,
    );

    const [response] = await this.client.createTask({
      parent,
      task: {
        httpRequest: {
          httpMethod: HttpMethod.POST,
          headers: {
            'Content-Type': 'text/plain',
          },
          body: Buffer.from(JSON.stringify({ jobId })).toString('base64'),
          url,
        },
      },
    });
    this.logger.debug(`Created task ${response.name}`);
  }
}
