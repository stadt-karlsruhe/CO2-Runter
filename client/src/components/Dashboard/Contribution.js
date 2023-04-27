import Contribution_Total from './Contribution_total';
import Contribution_per_district from './Contribution_per_district';

export default function Co2Card() {  
   
  return (
    <div>
        <Contribution_Total />
        <Contribution_per_district />
    </div>
  );
}
