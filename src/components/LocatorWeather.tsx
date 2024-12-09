import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import locator from '../interface/locator';
import { useEffect, useState } from 'react';

interface MyProp {
    locatorIn: locator;
  }

export default function IndicatorWeather(props: MyProp) {

    let [location, setLocation] = useState<locator>({
        name: "",
        altitude: "",
        latitude: "",
        longitude: ""
    })

    useEffect(() => {
        setLocation(props.locatorIn)
    }, [props])

    return (
        <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography component="p" variant="h4">
                {location.name}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {location.latitude}° S, {location.longitude}° W, {location.altitude} meters
            </Typography>
        </Paper> 
    )
}