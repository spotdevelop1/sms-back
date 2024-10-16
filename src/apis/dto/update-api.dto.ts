import { PartialType } from '@nestjs/mapped-types';
import { SendMessageToSingleNumberDto } from './create-api.dto';

export class UpdateApiDto extends PartialType(SendMessageToSingleNumberDto) {}
