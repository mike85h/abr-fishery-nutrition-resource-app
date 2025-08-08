import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RegionPage() {
  const { regionName } = useParams();
  const [fishList, setFishList] = useState([]);
  const [regionInfo, setRegionInfo] = useState({});

  	function extractText(raw) {
  		// 1) decode Unicode escapes (\u003C → '<', etc.)
  		const decoded = raw.replace(/\\u([\dA-F]{4})/gi, (_, hex) =>
    		String.fromCharCode(parseInt(hex, 16))
  		);
  
  		// 2) parse as HTML and grab textContent
  		const container = document.createElement('div');
  		container.innerHTML = decoded;
  		return container.textContent.trim();
	}

  useEffect(() => {

    fetch('http://localhost:5001/gofish?apikey=abrradiology')
      .then((res) => res.json())
      .then((data) => {
        const regionFish = data.filter((f) => f.NOAAFisheriesRegion === regionName);

        setFishList(regionFish);
		
        const calories = regionFish.map(f => f.Calories).filter(Boolean);
        const fat = regionFish.map(f => f.FatTotal).filter(Boolean);

		let avgCalories = (calories.reduce((a,b) => a + Number(b), 0)/calories.length).toFixed(2);

		let fatContentInGrams = (fat.map(massInGrams => parseFloat(massInGrams)));
		let avgFat = (fatContentInGrams.reduce((a,b) => a + Number(b))/fat.length).toFixed(2);
		
        setRegionInfo({
          name: regionName,
          avgCalories,
          avgFat
        });

		
      });

  }, [regionName]);

  return (
    <div>
      <h2>Region : {regionInfo.name}</h2>
      <p>Average Calories Per Serving: {regionInfo.avgCalories}</p>
      <p>Average Fat Per Serving: {regionInfo.avgFat}g</p>
      <ul>
        {fishList.map((fish) => (
          <li key={fish.SpeciesName}>
            <h4>{fish.SpeciesName}</h4>
            {fish.ImageGallery?.[0]?.src && <img src={fish.ImageGallery[0].src} alt={fish.ImageGallery[0].alt} width="150" />}
            <p>Calories Per Serving: {fish.Calories}</p>
            <p>Fat Per Serving: {fish.FatTotal}</p>
			<p>Description: {extractText(fish.Biology)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
