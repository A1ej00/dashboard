import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

import { useEffect, useState } from 'react';
import linea from '../interface/linea';

interface MyProp {
    selected: number
    lineaIn: linea
}

export default function LineChartWeather(props: MyProp) {
    let [dummy, setDummy] = useState<linea>({hora: [],
        nubes: [],
        lluvia: [],
        humedad: [] 
    })

    useEffect(() => {
        setDummy(props.lineaIn)
    }, [props])

    // Map selected value to the correct series
    let seriesData = [];
    if (props.selected === -1) {
        // If no variable is selected, include all lines
        seriesData = [
            { data: dummy?.nubes, label: 'Nubosidad' },
            { data: dummy?.lluvia, label: 'Precipitación (%)' },
            { data: dummy?.humedad, label: 'Humedad (%)' }
        ];
    } else if (props.selected === 0) {
        seriesData = [{ data: dummy?.lluvia, label: 'Precipitación (%)' }];
    } else if (props.selected === 1) {
        seriesData = [{ data: dummy?.humedad, label: 'Humedad (%)' }];
    } else if (props.selected === 2) {
        seriesData = [{ data: dummy?.nubes, label: 'Nubosidad' }];
    }

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={1200}
                height={400}
                series={seriesData}
                xAxis={[{scaleType: 'point', data: dummy?.hora}]}
            />
        </Paper>
    );
}