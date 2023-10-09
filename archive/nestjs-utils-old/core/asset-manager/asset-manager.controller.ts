import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AssetManagerService } from './asset-manager.service';
import { AssetAccess, NewAssetFile } from '../../asset-manager';
import { CurrentUser } from '../../common';

@Controller()
export class AssetManagerController {
  constructor(
    private readonly configService: ConfigService,
    private readonly assetService: AssetManagerService,
  ) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      // limits: {
      //   files: 1,
      //   fileSize: 1024 * 1024,
      // },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: string,
    @Body('access') access: AssetAccess,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user?: any,
  ) {
    if (!user) {
      throw new BadRequestException('Unable to determine asset owner.');
    }
    if (!access) {
      throw new BadRequestException(
        `Mandatory 'access' property is missing please set access to '${AssetAccess.public}' or '${AssetAccess.private}'`,
      );
    }

    const createdAsset = await this.assetService.uploadAsset(
      new NewAssetFile({
        buffer: file.buffer,
        name: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      }),
      'gcloud',
      access,
      user,
    );

    res.json(createdAsset);
  }

  @Get('download/:assetId')
  async download(
    @Param('assetId') assetId: string,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: any,
  ) {
    const ownerId = user.getTenantId();
    const asset = await this.assetService.download(assetId, ownerId);
    res.set({
      'Content-Disposition': `inline; filename="${asset.name}"`,
      'Content-Type': asset.mimeType,
      'Content-Length': asset.size,
    });
    return new StreamableFile(asset.buffer);
  }
}
