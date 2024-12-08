{/* Hooks */ }
import { useEffect, useState } from 'react';

import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import item from './interface/item';
import linea from './interface/linea';
import Grid from '@mui/material/Grid2' 
import './App.css'

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {

  {/* Variable de estado y función de actualización */}
  const [selected, setSelected] = useState(-1);
  let [indicators, setIndicators] = useState<Indicator[]>([])
  let [items, setItems] = useState<item[]>([])
  let [linea, setLinea] = useState<linea>({hora: [], nubes: [], lluvia: [], humedad: [] });

  useEffect(()=>{

    {/* Hook: useEffect */}
    let request = async () => {

      {/* Request */}
      let API_KEY = "643483bd59ac48b73e7af3e5bd372305"
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      let savedTextXML = await response.text();

      {/* XML Parser */}
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      {/* Arreglo para agregar los resultados */}

      let dataToIndicators : Indicator[] = new Array<Indicator>();

      {/* 
          Análisis, extracción y almacenamiento del contenido del XML 
          en el arreglo de resultados
      */}

      let name = xml.getElementsByTagName("name")[0].innerHTML || ""
      dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

      let location = xml.getElementsByTagName("location")[1]

      let latitude = location.getAttribute("latitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

      let longitude = location.getAttribute("longitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

      let altitude = location.getAttribute("altitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

      {/* Modificación de la variable de estado mediante la función de actualización */}
      setIndicators( dataToIndicators )

      let dataToItems : item[] = new Array<item>();
      let emptyLinea: linea = {hora: [], nubes: [], lluvia: [], humedad: [] };
      let hora : string[] = [];
      let nub : number[] = [];
      let llu : number[] = [];
      let hum : number[] = [];

      for (var i = 0; i < 7; i++) {
        let time = xml.getElementsByTagName("time")[i]
        let from = time.getAttribute("from")?.slice(11, 19) || ""
        let to = time.getAttribute("to")?.slice(11, 19) || ""

        let precipitation = xml.getElementsByTagName("precipitation")[i]
        let probability = precipitation.getAttribute("probability") || ""

        let humidity = xml.getElementsByTagName("humidity")[i]
        let value = humidity.getAttribute("value") || ""

        let clouds = xml.getElementsByTagName("clouds")[i]
        let all = clouds.getAttribute("all") || ""

        dataToItems.push({"dateStart": from, "dateEnd": to, "precipitation": probability, "humidity": value, "clouds": all})
        hora.push(time.getAttribute("from")?.slice(11, 19) || "");
        nub.push(parseInt(all, 10));
        llu.push(parseFloat(probability) * 100);
        hum.push(parseInt(value, 10));
      }
      emptyLinea.hora = hora;
      emptyLinea.nubes = nub;
      emptyLinea.lluvia = llu;
      emptyLinea.humedad = hum;
      console.log( emptyLinea )
      
      setItems( dataToItems )
      setLinea( emptyLinea )
    }

    request();

  },[])

  let renderIndicators = () => {

    return indicators
      .map(
        (indicator, idx) => (
          <Grid key={idx} size={{ xs: 12, xl: 3 }}>
            <IndicatorWeather 
              title={indicator["title"]} 
              subtitle={indicator["subtitle"]} 
              value={indicator["value"]} 
            />
          </Grid>
        )
      )
  }

  const [] = useState(0)

  {/* JSX */}
  return (
    <Grid container spacing={5}>

      {renderIndicators()}

      {/* Indicadores */}
      <Grid size={{ xs: 12, xl: 3 }}>
        <IndicatorWeather title={'Indicator 1'} subtitle={'Unidad 1'} value={"1.23"} /> 
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }}>
        <IndicatorWeather title={'Indicator 2'} subtitle={'Unidad 2'} value={"3.12"} />
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }}>
        <IndicatorWeather title={'Indicator 3'} subtitle={'Unidad 3'} value={"2.31"} />
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }}>
        <IndicatorWeather title={'Indicator 4'} subtitle={'Unidad 4'} value={"3.21"} />
      </Grid>


      {/* Gráfico */}
      <Grid size={{ xs: 12, xl: 4 }}>
        {/* Grid Anidado */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 3 }}>
            <ControlWeather selected={selected} setSelected={setSelected}/>
            <LineChartWeather selected={selected} lineaIn={linea} />
          </Grid>
        </Grid>
      </Grid>
      
      {/* Tabla */}
      <Grid size={{ xs: 12, xl: 8 }}>
        <TableWeather itemsIn={ items } />
      </Grid>

    </Grid>
  )
}

export default App
