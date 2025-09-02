import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, } from "class-validator";
import { Role } from "../../common/enums/role.enum";

export class ChooseRoleDto {
    @ApiProperty({ description: 'Role do usuário', example: Role.CORRETOR, enum: Role })
    @IsEnum(Role, { message: 'Role deve ser um valor válido' })
    @IsNotEmpty({ message: 'Role não pode estar vazia' })
    role!: Role
}

export class GoogleAuthDto {
    @ApiProperty({ description: 'Token do Google', example: 'ya29.a0AfH6SM...' })
    @IsString({ message: 'Token deve ser uma string' })
    @IsNotEmpty({ message: 'Token não pode estar vazio' })
    token!: string
}
