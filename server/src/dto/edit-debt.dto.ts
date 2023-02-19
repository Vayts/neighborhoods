import { IsDate, IsNotEmpty, IsOptional, IsString, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditDebtDto {
	@IsString()
	@IsNotEmpty()
	title: string;
	
	@IsString()
	description: string;
	
	@IsOptional()
	@Transform( ({ value }) => value ? new Date(value) : null)
	@IsDate()
	@MinDate(new Date())
	readonly expDate: Date;
}
