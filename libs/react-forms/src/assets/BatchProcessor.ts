/**
 * Processes batches of data at specified intervals. This class fetches data using a provided asynchronous function,
 * processes each item with another asynchronous function, and handles batches of a specified size at regular intervals.
 */
export class BatchProcessor<T> extends EventTarget {
  private processInterval: NodeJS.Timeout | undefined;
  private nextData: () => Promise<T[]>;
  private processData: (datainfo: T) => Promise<void>;
  private interval: number;
  private batchLimit: number;

  constructor(
    nextData: () => Promise<T[]>,
    processData: (info: T) => Promise<void>,
    interval: number,
    batchLimit: number,
  ) {
    super();
    this.processData = processData;
    this.nextData = nextData;
    this.interval = interval;
    this.batchLimit = batchLimit;
  }

  setInterval(interval: number) {
    this.interval = interval;
  }

  setBatchLimit(batchLimit: number) {
    this.batchLimit = batchLimit;
  }

  async saveInBatches(batchLimit: number) {
    const data = await this.nextData();
    if (data.length === 0) {
      return;
    }

    const active: Promise<void>[] = [];
    for (const item of data) {
      active.push(this.processData(item));
      if (active.length >= batchLimit) {
        await Promise.race(active);
      }
    }

    await Promise.all(active);
  }

  isProcessing() {
    return Boolean(this.processInterval);
  }

  startProcessing() {
    if (!this.isProcessing()) {
      this.processInterval = setInterval(async () => {
        await this.saveInBatches(this.batchLimit);
      }, this.interval);
      this.dispatchEvent(new CustomEvent('processingStart'));
    }
  }

  stopProcessing() {
    if (this.isProcessing()) {
      clearInterval(this.processInterval);
      this.processInterval = undefined;
      this.dispatchEvent(new CustomEvent('processingStop'));
    }
  }
}
