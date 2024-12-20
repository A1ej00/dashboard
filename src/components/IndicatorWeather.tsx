import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import indicator from '../interface/indicator';
import { useEffect, useState } from 'react';

interface MyProp {
    indicatorsIn: indicator;
  }

export default function IndicatorWeather(props: MyProp) {

    let [indi, setIndi] = useState<indicator>({
        title : "",
        value : "" 
    })

    useEffect(() => {
        setIndi(props.indicatorsIn)
    }, [props])

    return (
        <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {indi.title} 
            </Typography>
            <Typography component="p" variant="h4">
                {indi.value}
            </Typography>
        </Paper> 
    )
}