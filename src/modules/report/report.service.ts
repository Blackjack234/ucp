import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { ApprovedReportDto, CreateReportDto } from './dto/report.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private readonly reportRepo : Repository<Report>){}

    async create(reportDto : CreateReportDto,user:User){
       const report = this.reportRepo.create(reportDto)
       report.user = user;

       return await this.reportRepo.save(report);
    }

    async changeApproval(id:string , body:ApprovedReportDto){
      const report  = await this.reportRepo.findOne({where:{id:parseInt(id)}})
      if(!report ){
          throw new NotFoundException('Report not found.')
      }

      report.approved = body.approved

      let result  = await this.reportRepo.save(report)

      if(!result){
           throw new NotFoundException('Something went wrong while saving the report.')
      }

      return {
        message:'Report approval status updated successfully.',
        report:result
      }
    }
}
