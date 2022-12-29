import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as d3 from "d3";


export function PieChart(props) {
  const { data, id } = props;

  const ref = useRef()
  const width = 700;
  const height = 500;
  const margin = 50;
  const leftPadding = 0;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin

  // create 2 data_set
  // const data = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 }

  // set the color scale
  const color = d3.scaleOrdinal()
    .domain(Object.keys(data))
    .range(d3.schemeDark2);

  // A function that create / update the plot for a given variable:
  function update(data) {
    const mysvg = document.querySelector(`#mysvg`);
    if (mysvg && mysvg.getAttribute('data-id') === id) return;
    else if (mysvg && mysvg.getAttribute('data-id') !== id) mysvg.remove();

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("id", `mysvg`)
      .attr("data-id", id)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2 + leftPadding},${height / 2})`);

    // set the color scale
    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .sort(null) // Do not sort group by size
      .value(d => d[1])
    const data_ready = pie(Object.entries(data))

    // The arc generator
    const arc = d3.arc()
      .innerRadius(radius * 0.5)         // This is the size of the donut hole
      .outerRadius(radius * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('allSlices')
      .data(data_ready)
      .join('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[1]))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Add the polylines between chart and labels:
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .join('polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function (d) {
        const posA = arc.centroid(d) // line insertion in the slice
        const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
      })

    // Add the polylines between chart and labels:
    svg
      .selectAll('allLabels')
      .data(data_ready)
      .join('text')
      .text(d => `${d.data[0]} - ${d.data[1]}`)
      .attr('transform', function (d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style('text-anchor', function (d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
      })

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