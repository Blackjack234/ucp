import { Expose, Transform } from 'class-transformer';
import {
    IsString,
    IsNumber,
    Max,
    Min,
    IsLongitude,
    IsLatitude,
    IsBoolean
} from 'class-validator';


export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1886)
    @Max(2023)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    @IsLongitude()
    lng: number;

    @IsNumber()
    @Min(-90)
    @Max(90)
    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    milage: number;
}


export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    make: string;

    @Expose()
    approved: boolean;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    price: number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    milage: number;


    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number
}


export class ApprovedReportDto {
    @IsBoolean()
    approved: boolean;
}