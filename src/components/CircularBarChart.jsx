import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as d3 from "d3";


export function CircularBarChart(props) {
  const { data, id } = props;

  const ref = useRef()
  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 0, bottom: 0, left: 0 },
    width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border
  const transitionTime = 3000;

  // A function that create / update the plot for a given variable:
  function update(data) {
    const mysvg = document.querySelector(`#mysvg`);
    // console.log('dfd', [mysvg, data])
    if (mysvg && mysvg.getAttribute('data-id') === id) return;
    else if (mysvg && mysvg.getAttribute('data-id') !== id) mysvg.remove();

    const data_ready = Object.entries(data)
    const svg = d3.select(ref.current)
      .append("svg")
      .attr("id", `mysvg`)
      .attr('data-id', id)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeDark2);

    // Scales
    const x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(Object.keys(data)); // The domain of the X axis is the list of states.
    const y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, Math.max(...Object.values(data)) * 5]); // Domain of Y is from 0 to the max seen in the data

    // Add the bars
    const arc0 = d3.arc()     // imagine your doing a part of a donut plot
      .innerRadius(Math.random() / 10)
      .outerRadius(d => Math.random() + 0.5)
      .startAngle(d => x(d[0]))
      .endAngle(d => x(d[0]) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius);

    svg.append("g")
      .selectAll("path")
      .data(data_ready)
      .join("path")
      // .attr("fill", "#69b3a2")
      .attr('fill', d => color(d[1]))
      .attr("d", arc0)
      .transition()
      .duration(transitionTime)
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius(innerRadius)
        .outerRadius(d => y(d[1]))
        .startAngle(d => x(d[0]))
        .endAngle(d => x(d[0]) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius))

    // Add the labels
    svg.append("g")
      .selectAll("g")
      .data(data_ready)
      .join("g")
      .attr("text-anchor", function (d) { return (x(d[0]) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
      .attr("transform", function (d) { return "rotate(" + ((x(d[0]) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d[1]) + 10) + ",0)"; })
      .append("text")
      .text(function (d) { return (`${d[0]} - ${d[1]}`) })
      .attr("transform", function (d) { return (x(d[0]) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
      .style("font-size", "11px")
      .attr("alignment-baseline", "middle")
  }

  useEffect(() => {
    update(data)
  }, [id])

  return (
    <div
      ref={ref}
    />
  )
}