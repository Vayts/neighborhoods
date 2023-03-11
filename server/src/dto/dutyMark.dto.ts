import { IsDate, IsNotEmpty, MaxDate, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { startOfDay, subDays } from 'date-fns';

export class DutyMarkDto {
	
	@IsNotEmpty()
	@Transform( ({ value }) => new  Date(value))
	@IsDate()
	@MinDate(startOfDay(subDays(new Date(), 7)))
	@MaxDate(new Date())
	readonly date: Date;
}
