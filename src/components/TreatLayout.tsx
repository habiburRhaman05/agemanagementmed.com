import React from 'react';
import { WeightLossMaleLayout } from './sections/custom/templates-custom/WeightLossMaleLayout';

const TreatLayout = ({ treatment }: { treatment: { slug: string } }) => {
//   switch (treatment?.slug) {
//     case "weight-loss-men":
//       return <WeightLossMaleLayout treatment={treatment} />;
//     default:
//       return null;
//   }
console.log(treatment);

return <div>{treatment.slug}</div>
};

export default TreatLayout;
