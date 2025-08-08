import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/gofish?apikey=abrradiology')
      .then((res) => res.json())
      .then((data) => {
        const grouped = Object.groupBy(data, (fish) => fish.NOAAFisheriesRegion);

        const regionSummaries = Object.entries(grouped).map(([region, fishList]) => {
          const calories = fishList.map((f) => f.Calories).filter(Boolean);
          const fat = fishList.map((f) => f.TotalFat).filter(Boolean);
          const avgCalories = (calories.reduce((a, b) => a + b, 0) / calories.length).toFixed(2);
          const avgFat = (fat.reduce((a, b) => a + b, 0) / fat.length).toFixed(2);
          return { region, avgCalories, avgFat };
        });

        setRegions(regionSummaries);
      });

  }, []);

  return (
    <div>
      <h2>NOAA Fishery Regions</h2>
      <ul>
        {regions.map(({ region }) => (
          <li key={region}>
            <Link to={`/region/${encodeURIComponent(region)}`}>{region}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
