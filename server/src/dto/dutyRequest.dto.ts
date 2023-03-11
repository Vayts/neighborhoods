import { IsDate, IsNotEmpty, IsOptional, IsString, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { addDays, startOfDay } from 'date-fns';

export class DutyRequestDto {
	
	@IsString()
	@IsOptional()
	readonly recipient: string;
	
	@IsNotEmpty()
	@Transform( ({ value }) => new  Date(value))
	@IsDate()
	@MinDate(startOfDay(addDays(new Date(), 1)))
	readonly date: Date;
}
