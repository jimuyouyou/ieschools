import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as d3 from "d3";


export function BubbleChart(props) {
  const { data, id } = props;

  const ref = useRef()
  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 0, bottom: 0, left: 0 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    const transitionTime = 3000;

  // A function that create / update the plot for a given variable:
  function update(data) {
    const mysvg = document.querySelector(`#mysvg`);
    // console.log('dfd', [mysvg, data])
    if (mysvg && mysvg.getAttribute('data-id') === id) return;
    else if (mysvg && mysvg.getAttribute('data-id') !== id) mysvg.remove();

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("id", `mysvg`)
      .attr('data-id', id)
      .attr("viewBox", [-margin.left, -margin.top, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("fill", "currentColor")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

    // Compute the values.
    const data_ready = [];
    Object.keys(data).forEach((key) => { data_ready.push({ id: key, value: data[key] }) });
    const label = d => `${d.id} - ${d.value}`;
    const value = d => d.value;
    const group = d => d.id;
    const title = d => d.id;
    const link = d => `https://github.com/prefuse/Flare/blob/master/flare/src/${d?.id}.as`;
    const linkTarget = "_blank";
    const stroke = 'steelblue'; // a static stroke around the bubbles
    const strokeWidth = 2; // the stroke width around the bubbles, if any
    const strokeOpacity = 0.5;
    const fill = 'green';
    const fillOpacity = 0.8;

    const D = d3.map(data_ready, d => d);
    const V = d3.map(data_ready, value);
    const G = group == null ? null : d3.map(data_ready, group);
    const I = d3.range(V.length).filter(i => V[i] > 0);

    // Unique the groups.
    let groups;
    if (G && groups === undefined) groups = I.map(i => G[i]);
    groups = G && new d3.InternSet(groups);

    // Construct scales.
    const colors = d3.schemeTableau10;// an array of colors (for groups)
    const color = G && d3.scaleOrdinal(groups, colors);

    // Compute labels and titles.
    const L = label == null ? null : d3.map(data_ready, label);
    const T = title === undefined ? L : title == null ? null : d3.map(data_ready, title);

    // Compute layout: create a 1-deep hierarchy, and pack it.
    const padding = 3;
    const root = d3.pack()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
      .padding(padding)
      (d3.hierarchy({ children: I })
        .sum(i => V[i]));

    const leaf = svg.selectAll("a")
      .data(root.leaves())
      .join("a")
      .attr("xlink:href", link == null ? null : (d, i) => link(D[d.data], i, data_ready))
      .attr("target", link == null ? null : linkTarget)
      .attr("transform", d => `translate(${d.x},${d.y})`);

    leaf.append("circle")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-opacity", strokeOpacity)
      .attr("fill", G ? d => color(G[d.data]) : fill == null ? "none" : fill)
      .attr("fill-opacity", fillOpacity)
      .attr("r", d => 0.5)
      .transition()
      .duration(transitionTime)
      .attr("r", d => d.r || 3);

    if (T) leaf.append("title")
      .text(d => T[d.data]);

    if (L) {
      // A unique identifier for clip paths (to avoid conflicts).
      const uid = `O-${Math.random().toString(16).slice(2)}`;

      leaf.append("clipPath")
        .attr("id", d => `${uid}-clip-${d.data}`)
        .append("circle")
        .attr("r", d => d.r || 3);

      leaf.append("text")
        .attr("clip-path", d => `${d.data}`)
        .selectAll("tspan")
        .data(d => `${L[d.data]}`.split(/\n/g))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
        .attr("fill-opacity", (d, i, D) => i === D.length - 1 ? 0.7 : null)
        .text(d => d);
    }
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
