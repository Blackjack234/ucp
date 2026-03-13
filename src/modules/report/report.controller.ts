import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApprovedReportDto, CreateReportDto, ReportDto } from './dto/report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('report')
export class ReportController {

    constructor(private readonly reportService:ReportService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    async createReport(@Body() body:CreateReportDto,@CurrentUser() user:User){
     return await this.reportService.create(body,user)
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    async approveReport(@Param('id') id : string , @Body()  body: ApprovedReportDto){
      return await this.reportService.changeApproval(id,body)
    }

}
