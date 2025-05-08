import { Injectable } from '@nestjs/common';
import { ConsumoEnergiaDto } from './consumo_energia.dto';
import { ConsumoEnergiaModel } from './consumo_energia.model';
import { ConsultaHistoricoDto } from './consulta_historico.dto';

@Injectable() 
export class ConsumoEnergiaService {
   

    private readonly consumos: ConsumoEnergiaModel[] = [];

    registraConsumo(consumoUsuario: ConsumoEnergiaDto){

        const consumo: ConsumoEnergiaModel = {
            id: this.consumos.length + 1,
            ...consumoUsuario
        }

        this.consumos.push(consumo);

        return `Consumo nr ${consumo.id } de energia do usuário ${consumo.userId} - ${consumo.data} - ${consumo.consumo}kWh registrado com sucesso`;       
       
    }

    getAll(): ConsumoEnergiaModel[] {
        return this.consumos; // Retorna todos os dados
      }



    consultaHistoricoConsumo(consulta: ConsultaHistoricoDto){

        const { userId, dataInicio, dataFim } = consulta;

        return this.consumos.filter((entry) => {                   
            return (
              entry.userId == userId    &&
              new Date(entry.data) >= new Date(dataInicio) &&
              new Date(entry.data) <= new Date(dataFim)        
            );
          });        
    }

    checkAlert(userId: number, data: string): string {
       
        const currentMonthData = this.consultaHistoricoConsumo({
          userId,
          dataInicio: new Date().toISOString(),
          dataFim: new Date().toISOString(),
        });
    
        const lastMonthData = this.consultaHistoricoConsumo({
          userId,
          dataInicio: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
          dataFim: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        });
       
    
        if (currentMonthData.length && lastMonthData.length) {
          const currentTotal = currentMonthData.reduce((acc, record) => acc + record.consumo, 0);
          const lastTotal = lastMonthData.reduce((acc, record) => acc + record.consumo, 0);
    
          if (currentTotal > lastTotal) {
            return 'ALERTA: CONSUMO DE ENERGIA AUMENTOU EM RELAÇÃO AO MÊS PASSADO.';
          }
        }
        return 'Consumo em situação de normalidade.';
      }

  
    
}

