import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

import { useEffect, useState } from 'react';
import linea from '../interface/linea';

const xLabels = [
    'Page 1',
    'Page 2',
    'Page 3',
    'Page 4',
    'Page 5',
    'page 6',
    'page 7'
];

interface MyProp {
    lineaIn: linea
}

export default function LineChartWeather(props: MyProp) {
    let [dummy, setDummy] = useState<linea>({hora: [], nubes: [], lluvia: [], humedad: [] })

    useEffect(() => {
        setDummy(props.lineaIn)
    }, [props])

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
                series={[
                    { data: dummy?.nubes, label: 'nubosidad' },
                    { data: dummy?.humedad, label: 'humedad (%)' },
                    { data: dummy?.lluvia, label: 'precipitacion (%)' }
                ]}
                xAxis={[{scaleType: 'point', data: dummy?.hora}]}
            />
        </Paper>
    );
}