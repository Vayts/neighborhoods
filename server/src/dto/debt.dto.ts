import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class DebtDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;
	
	@IsString()
	@IsOptional()
	readonly description: string;
	
	@IsNotEmpty()
	@Transform((value) => Number(Number(value.value).toFixed(2)))
	@IsInt()
	@Min(0.1)
	@Max(20000)
	readonly value: number;
	
	@IsString()
	@IsNotEmpty()
	readonly debtor: string;
	
	@IsOptional()
	@Transform( ({ value }) => value ? new Date(value) : null)
	@IsDate()
	@MinDate(new Date())
	readonly expDate: Date;
}
