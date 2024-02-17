// Import stylesheets
import * as d3 from 'd3';

//Gráfico de columnas. Mi 1º gráfico, datos ingresados
d3.json(
  'https://raw.githubusercontent.com/andru-brahian/7_D3_javascript_html_googlesheet_powerBI/main/base_datos_diagrama_velas.json'
).then(function (data) {
  var visualization = d3plus
    .viz()
    .container('#viz1')
    .data(data)
    .type('bar')
    .id('new_date')
    .x('new_date')
    .y('Volume_AAPL')
    .draw();
});

d3.json(
  'https://raw.githubusercontent.com/andru-brahian/7_D3_javascript_html_googlesheet_powerBI/main/base_datos_diagrama_velas.json'
)
  .then(function (data) {
    var visualization = d3plus
      .viz()
      .container('#viz2')
      .data(data)
      .type('line')
      .id('new_date')
      .x('new_date')
      .y('Close_AAPL')
      .axes({ ticks: { display: false } })
      .draw();
  })
  .catch(function (error) {
    console.log('Error al cargar los datos:', error);
    alert(error);  // alert genera una ventana de error en caso de que se tenga un error y ayuda a identificar, de donde es el error
  });


//Datos del diagrama de caja y bigotes
// Cargar datos desde el enlace JSON
d3.json(
  'https://raw.githubusercontent.com/andru-brahian/7_D3_javascript_html_googlesheet_powerBI/main/base_datos_diagrama_velas.json'
).then(function (data) {
  // Mapeo de datos para el diagrama de caja y bigotes
  var boxData = data.map((item) => {
    return {
      new_date: item.new_date, // Asegúrate de tener la propiedad correcta para new_date en tu conjunto de datos
      Close_AAPL: item.Close_AAPL, // Puedes ajustar esta línea según la propiedad específica que deseas para el valor
      Open_AAPL: item.Open_AAPL,
      High_AAPL: item.High_AAPL,
      Low_AAPL: item.Low_AAPL,
    };
  });

  // Usar los datos mapeados para el diagrama de caja y bigotes
  var visualization = d3plus
    .viz()
    .container('#viz3')
    .type('box')
    .data(boxData)
    .id('new_date')
    .y('Close_AAPL')
    .x('new_date')
    .axes({ ticks: false })
    .size('value')
    .draw();
});

// SOLUCIÓN 8: Gráfico combinado con deslizamiento
// SOLUCIÓN 8: Gráfico combinado con deslizamiento
// Función principal asíncrona
export const main = async () => {
  // Función para cargar datos desde el enlace JSON
  async function fetchData(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }

  // Obtener datos del enlace : usar el raw.

  // este no funciona https://github.com/andru-brahian/7_D3_javascript_html_googlesheet_powerBI/blob/main/base_datos_diagrama_velas.json
  //https://raw.githubusercontent.com/andru-brahian/7_D3_javascript_html_googlesheet_powerBI/main/base_datos_diagrama_velas.json
  const jsonDataLink =
    'https://raw.githubusercontent.com/andru-brahian/7_D3_javascript_html_googlesheet_powerBI/main/base_datos_diagrama_velas.json'; // Al principio tarda un poco en cargar cuando el repositorio es el mismo del link, y recien se cargó el repositorio, es cuestion de cargar varias veces o esperar

  const jsonData = await fetchData(jsonDataLink);

  // Mapeo de datos para la serie de velas
  const candleSeries = jsonData.map((item) => {
    const timestamp = new Date(item.new_date).getTime();
    return {
      x: timestamp,
      y: [item.Open_AAPL, item.High_AAPL, item.Low_AAPL, item.Close_AAPL],
    };
  });

  // Mapeo de datos para la serie de barras
  const barSeries = jsonData.map((item) => {
    const timestamp = new Date(item.new_date).getTime();
    return { x: timestamp, y: item.Volume_AAPL };
  });

  // Configuración del gráfico combinado de velas y barras con deslizamiento
  var options = {
    series: [
      { name: 'candle', type: 'candlestick', data: candleSeries },
      { name: 'volume', type: 'bar', data: barSeries },
    ],
    chart: {
      height: 450,
      type: 'line',
      stacked: false,
      toolbar: {
        autoSelected: 'pan',
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: [
      {
        seriesName: 'candle',
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FF5733',
        },
        labels: {
          style: {
            colors: '#FF5733',
          },
        },
        title: {
          text: 'Candlesticks',
          style: {
            color: '#FF5733',
          },
        },
      },
      {
        seriesName: 'volume',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#4CAF50',
        },
        labels: {
          style: {
            colors: '#4CAF50',
          },
        },
        title: {
          text: 'Volume',
          style: {
            color: '#4CAF50',
          },
        },
      },
    ],
    colors: ['#FF5733', '#4CAF50'],
  };

  // Crear el gráfico combinado de velas y barras
  var chart = new ApexCharts(document.querySelector('#viz4'), options);
  chart.render();
}