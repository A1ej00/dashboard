{/* Hooks */ }
import { useEffect, useState } from 'react';

import IndicatorWeather from './components/IndicatorWeather';
import LocatorWeather from './components/LocatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import item from './interface/item';
import indicator from './interface/indicator';
import locator from './interface/locator';
import linea from './interface/linea';
import Grid from '@mui/material/Grid2' 
import './App.css'

function App() {

  {/* Variable de estado y función de actualización */}
  let [selected, setSelected] = useState(-1);
  let [indicators, setIndicators] = useState<indicator[]>([])
  let [location, setLocation] = useState<locator>({})
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

      let dataToLocator : locator = {name: "", altitude: "", latitude: "", longitude: "" };
      let dataToIndicators : indicator[] = [];
      let dataToItems : item[] = new Array<item>();
      let emptyLinea: linea = {hora: [], nubes: [], lluvia: [], humedad: [] };
      let hora : string[] = [];
      let nub : number[] = [];
      let llu : number[] = [];
      let hum : number[] = [];

      {/* 
          Análisis, extracción y almacenamiento del contenido del XML 
          en el arreglo de resultados
      */}

      let name = xml.getElementsByTagName("name")[0].innerHTML || ""
      dataToLocator.name = name

      let location = xml.getElementsByTagName("location")[1]

      let latitude = location.getAttribute("latitude") || ""
      dataToLocator.latitude = latitude

      let longitude = location.getAttribute("longitude") || ""
      dataToLocator.longitude = longitude 

      let altitude = location.getAttribute("altitude") || ""
      dataToLocator.altitude = altitude
      
      let precipitation = xml.getElementsByTagName("precipitation")[0]
      let probability = precipitation.getAttribute("probability") || ""
      dataToIndicators.push({"title": "Lluvia", "value": (parseFloat(probability) * 100).toString() + "%"})

      let humidity = xml.getElementsByTagName("humidity")[0]
      let value = humidity.getAttribute("value") || ""
      dataToIndicators.push({"title": "Humedad", "value": value})

      let clouds = xml.getElementsByTagName("clouds")[0]
      let all = clouds.getAttribute("all") || ""
      dataToIndicators.push({"title": "Nubes", "value": all})

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
      
      {/* Modificación de la variable de estado mediante la función de actualización */}
      setLocation( dataToLocator )
      setIndicators( dataToIndicators )
      setItems( dataToItems )
      setLinea( emptyLinea )
    }

    request();

  },[])

  let renderIndicators = () => {

    return indicators
      .map(
        (indicator, idx) => (
          <Grid key={idx} size={{md:4}}>
            <IndicatorWeather indicatorsIn={indicator} />
          </Grid>
        )
      )
  }


  {/* JSX */}
  return (
    <Grid container spacing={5}>

      <Grid size={{ xs: 12, xl:8 }}>
        <LocatorWeather locatorIn={ location } /> 
      </Grid>

      {renderIndicators()}

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
