import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1886)
    @Max(2023)
    year: number;



    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @Min(-180)
    @Max(180)
    @IsLongitude()
    lng: number;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @Min(-90)
    @Max(90)
    @IsLatitude()
    lat: number;

    /**
     * Accept both `milage` (existing DTO field) and `mileage` (common spelling) from query params.
     */
    @Transform(({ value, obj }) => parseInt(obj.mileage ?? value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    milage: number;
}