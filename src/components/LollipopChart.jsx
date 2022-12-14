import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as d3 from "d3";


export function LollipopChart(props) {
  const { data, id } = props;

  const ref = useRef()
  // set the dimensions and margins of the graph
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
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
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeDark2);

    // Initialize the X axis
    const x = d3.scaleBand()
      .range([0, width])
      .padding(1);
    const xAxis = svg.append("g")
      .attr("transform", `translate(0, ${height})`)

    // Initialize the Y axis
    const y = d3.scaleLinear()
      .range([height, 0]);
    const yAxis = svg.append("g")
      .attr("class", "myYaxis")

    // X axis
    x.domain(Object.keys(data))
    xAxis.transition().duration(transitionTime).call(d3.axisBottom(x));
    xAxis.attr('opacity', 0.8);
    // xAxis.style({ 'stroke': 'black', 'fill': 'green', 'stroke-width': '10px'});


    // Add Y axis
    y.domain([0, d3.max(Object.values(data))]);
    yAxis.transition().duration(transitionTime).call(d3.axisLeft(y));
    yAxis.attr('opacity', 0.8);
    
    // variable u: map data to existing circle
    const j = svg.selectAll(".myLine")
      .data(data_ready)
    // update lines
    j
      .join("line")
      .attr("class", "myLine")
      .transition()
      .duration(transitionTime)
      .attr("x1", function (d) { return x(d[0]); })
      .attr("x2", function (d) { return x(d[0]); })
      .attr("y1", y(0))
      .attr("y2", function (d) { return y(d[1]); })
      .attr("stroke", "grey")


    // variable u: map data to existing circle
    const u = svg.selectAll("circle")
      .data(data_ready)
    // update bars
    u
      .join("circle")
      .transition()
      .duration(transitionTime)
      .attr("cx", function (d) { return x(d[0]); })
      .attr("cy", function (d) { return y(d[1]); })
      .attr("r", d => d[1]/2)
      // .attr("fill", "#69b3a2");
      .attr('fill', d => color(d[1]))
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