import { IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Min(1)
  size: number = 15;

  getOffset() {
    return this.size * (this.page - 1);
  }
}
