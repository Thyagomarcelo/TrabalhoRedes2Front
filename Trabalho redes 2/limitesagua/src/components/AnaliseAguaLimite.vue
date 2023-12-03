<template>
  <v-container>
    <v-card width="1000" class="card">
      <v-card-item>
        <v-card-title>Variação do dia</v-card-title>

        <v-card-subtitle>Variação do limite de água no dia</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-combobox
            v-model="LocalSelected"
            :items="locaisFilter"
            label="Local"
          ></v-combobox>
        <Bar :data="chartDataDia" />
      </v-card-text>
    </v-card>

    <v-divider class="divisor"></v-divider>

    <v-card width="1000" class="card">
        <v-card-item>
          <v-card-title>Variação da semana</v-card-title>

          <v-card-subtitle>Variação do maior limite de água na semana</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <v-combobox
              v-model="LocalSelectedSemana"
              :items="locaisSemanaFilter"
              label="Local"
            ></v-combobox>
          <Bar :data="chartDataSemana" /> 
        </v-card-text>
      </v-card>
  </v-container>

  
</template>

<script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { HubConnectionBuilder } from '@microsoft/signalr';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  export default {
    name: 'AnaçiseAguaLimite',
    components: { Bar },

    props: {
      LocalSelected: String,
      LocalSelectedSemana: String
    },
    
    data() {   
      return{
        
      }
    },

    computed: {
      
      chartDataDia() { 
        var dadoslimiteAgua = this.$store.state.dadosLimiteAgua.filter(f => f.local == this.LocalSelected)
        const datasLimiteAguaDia = []
        const alturaLimiteAguaDia = []

        for(var i = 0; i < dadoslimiteAgua.length; i++){
          datasLimiteAguaDia.push(dadoslimiteAgua[i].dataColeta)
          alturaLimiteAguaDia.push(dadoslimiteAgua[i].altura)
        }
        
        return {
          labels: datasLimiteAguaDia,
          datasets: [
            {
              label: 'Altura',
              backgroundColor: '#f87979',
              data: alturaLimiteAguaDia
            }
          ]
      }},

      chartDataSemana() { 
        var dadoslimiteAgua = this.$store.state.dadosLimiteAguaSemana.filter(f => f.local == this.LocalSelectedSemana)
        const datasLimiteAguaDia = []
        const alturaLimiteAguaDia = []

        for(var i = 0; i < dadoslimiteAgua.length; i++){
          datasLimiteAguaDia.push(dadoslimiteAgua[i].dataColeta)
          alturaLimiteAguaDia.push(dadoslimiteAgua[i].altura)
        }
        
        return {
          labels: datasLimiteAguaDia,
          datasets: [
            {
              label: 'Altura',
              backgroundColor: '#f87979',
              data: alturaLimiteAguaDia
            }
          ]
      }},

      locaisFilter(){
        var dadoslimiteAgua = this.$store.state.dadosLimiteAgua
        const locais = []
        for(var i = 0; i < dadoslimiteAgua.length; i++){
          locais.push(dadoslimiteAgua[i].local)
        }
        return locais
      },

      locaisSemanaFilter(){
        var dadoslimiteAgua = this.$store.state.dadosLimiteAguaSemana
        const locais = []
        for(var i = 0; i < dadoslimiteAgua.length; i++){
          locais.push(dadoslimiteAgua[i].local)
        }
        return locais
      },
    },

    async mounted(){
      await this.$store.dispatch("getDadosLimiteAguaDia"),
      await this.$store.dispatch("getDadosLimiteAguaSemana")

      this.setupSignalR();
    },

    methods: {
      setupSignalR() {
        const connection = new HubConnectionBuilder()
          .withUrl('https://localhost:7297/dbUpdateHub')
          .build();

        connection.start().then(() => {
          connection.on('ReceiveDbUpdate', (payload) => {
            this.$store.commit('RECEBER_ATUALIZACAO_BD', payload);
          });
        }).catch(err => console.error(err));
      },
    },

  }

  
</script>

<style>
  .card{
    margin-left: auto;
    margin-right: auto;
    width: 6em
  }

  .divisor{
    margin-top: 40px;
    margin-bottom: 40px;
  }
</style>