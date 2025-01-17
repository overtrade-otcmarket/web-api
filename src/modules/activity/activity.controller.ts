import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';

@ApiTags('Activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
}
