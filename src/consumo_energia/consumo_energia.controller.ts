import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { ConsumoEnergiaDto } from './consumo_energia.dto';
import { ConsultaHistoricoDto } from './consulta_historico.dto';

@Controller('consumo-energia')
export class ConsumoEnergiaController {
    constructor(private readonly consumoService: ConsumoEnergiaService){}

    @Post()
    registraConsumo(@Body() consumoEnergiaDto: ConsumoEnergiaDto){
        return this.consumoService.registraConsumo(consumoEnergiaDto);
    }

    @Get('historico')
    consultaHistoricoConsumo(@Query() consulta: ConsultaHistoricoDto    ){      
        return this.consumoService.consultaHistoricoConsumo(consulta);
        
    }

    @Get('alertas')
        verificarAletas(@Query('userId') userId: number, @Query('data') data: string) {
        return this.consumoService.checkAlert(userId, data);
  }
}
