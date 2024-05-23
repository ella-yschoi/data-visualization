import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface CalorieData {
  day: string;
  value: number;
}

const ChartComponent: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    // 데이터와 SVG 도메인 설정
    const data: CalorieData[] = [
      { day: "2024/03/19", value: 300 },
      { day: "2024/03/20", value: 100 },
      { day: "2024/03/21", value: 700 },
      { day: "2024/03/22", value: 400 },
      { day: "2024/03/23", value: 300 },
      { day: "2024/03/24", value: 600 },
      { day: "2024/03/25", value: 1500 },
      { day: "2024/03/26", value: 2000 },
      { day: "2024/03/27", value: 500 },
      { day: "2024/03/28", value: 800 },
    ];
    const width = 380;
    const height = 280;

    // SVG 요소를 선택하고, 만약 없다면 추가
    const svg = d3.select(ref.current)
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height);

    // xScale 설정
    const xExtent = d3.extent(data, d => new Date(d.day)) as [Date, Date];
    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([0, width]);

    // yScale 설정
    const yMax = d3.max(data, d => d.value) as number;
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);

    // 라인 생성기 설정
    const line = d3.line<CalorieData>()
      .x(d => xScale(new Date(d.day)))
      .y(d => yScale(d.value))
      .curve(d3.curveBasis);

    // 영역 생성기 설정
    const area = d3.area<CalorieData>()
      .x(d => xScale(new Date(d.day)))
      .y0(height)
      .y1(d => yScale(d.value))
      .curve(d3.curveBasis);

    // 영역 그리기
    svg.append("path")
      .datum(data)
      .attr("fill", "#02A0FC")
      .attr("d", area);

    // 라인 그리기
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#02A0FC")
      .attr("stroke-width", 4)
      .attr("d", line);

  }, []);

  return <div ref={ref} />;
};

export default ChartComponent;
