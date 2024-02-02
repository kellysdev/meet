import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = genres.map(genre => {
      const filteredEvents = events.filter(event => event.summary.includes(genre));
      return {
        name: genre,
        value: filteredEvents.length
      };
    })
    return data;
  };

  return (
    <ResponsiveContainer style={{ width: "99%", height: 300 }}>
      <PieChart>
        <Pie 
        dataKey="value" 
        data={data} 
        fill="#8884d8" 
        label
        labelLine={false}
        outerRadius={130} 
      />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;