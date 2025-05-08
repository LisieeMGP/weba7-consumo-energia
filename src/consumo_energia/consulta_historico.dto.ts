import { IsInt, IsString } from "class-validator";


export class ConsultaHistoricoDto {
  @IsInt()
  userId: number;

  @IsString()
  dataInicio: string; // Exemplo: "2025-05-01"

  @IsString()
  dataFim: string; // Exemplo: "2025-05-31"
}