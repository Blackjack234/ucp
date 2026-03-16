import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { ApprovedReportDto, CreateReportDto } from './dto/report.dto';
import { User } from '../user/entities/user.entity';
import { GetEstimateDto } from './dto/report.estimate.dto';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private readonly reportRepo: Repository<Report>) { }

  async create(reportDto: CreateReportDto, user: User) {
    const report = this.reportRepo.create(reportDto)
    report.user = user;

    return await this.reportRepo.save(report);
  }

  async changeApproval(id: string, body: ApprovedReportDto) {
    const report = await this.reportRepo.findOne({ where: { id: parseInt(id) } })
    if (!report) {
      throw new NotFoundException('Report not found.')
    }

    report.approved = body.approved

    let result = await this.reportRepo.save(report)

    if (!result) {
      throw new NotFoundException('Something went wrong while saving the report.')
    }

    return {
      message: 'Report approval status updated successfully.',
      report: result
    }
  }

  async getEstimate(query: GetEstimateDto) {
    const { make, model, year, lng, lat, milage } = query

    const estimate = await this.reportRepo.createQueryBuilder()
      .select('AVG(price)',"price")
      .where("make = :make", { make })
      .andWhere("model = :model", { model })
      .andWhere("year - :year BETWEEN -3 AND 3", { year })
      .andWhere("lat - :lat BETWEEN -5 AND 5", { lat })
      .andWhere("lng - :lng BETWEEN -5 AND 5", { lng })
      .andWhere("approved IS TRUE")
      .orderBy("ABS(milage - :milage)", "DESC")
      .setParameters({ milage })
      .limit(3)
      .getRawOne()

    return estimate
  }
}
