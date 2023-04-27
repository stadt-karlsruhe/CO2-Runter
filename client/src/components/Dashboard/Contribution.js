import { Card, CardContent, Typography } from '@mui/material';

export default function Co2Card({ co2Footprint }) {
    // call a api to get the number of co2Footprint
    // const [co2Footprint, setCo2Footprint] = useState(0);
    // useEffect(() => {
    //     const fetchCo2Footprint = async () => {
    //         const response = await fetch("/co2Footprint");
    //         const data = await response.json();
    //         setCo2Footprint(data);
    //     };
    //     fetchCo2Footprint();
    // }, []);
    //
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" align="center">
          {co2Footprint}
        </Typography>
        <Typography variant="subtitle1" align="center">
          Abgegebene Co2 Fussabdrücke
        </Typography>
      </CardContent>
    </Card>
  );
}
