var aparelhos = [
  { aparelho: "Geladeira", consumo: 42, horas: 720 },
  { aparelho: "Televisão", consumo: 18, horas: 120 },
  { aparelho: "Ar-condicionado", consumo: 95, horas: 180 },
  { aparelho: "Computador", consumo: 32, horas: 160 },
  { aparelho: "Chuveiro", consumo: 75, horas: 45 },
  { aparelho: "Micro-ondas", consumo: 12, horas: 30 }
];

var svg = d3.select("#grafico");

// Eixo X
svg.append("line")
  .attr("x1", 100).attr("y1", 550)
  .attr("x2", 780).attr("y2", 550)
  .attr("stroke", "#999");

// Eixo Y
svg.append("line")
  .attr("x1", 100).attr("y1", 40)
  .attr("x2", 100).attr("y2", 550)
  .attr("stroke", "#999");

svg.append("text")
  .attr("x", 50)
  .attr("y", 30)
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .attr("fill", "#333")
  .text("Horas de uso");

svg.append("text")
  .attr("x", 780)
  .attr("y", 580)
  .attr("text-anchor", "end")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .attr("fill", "#333")
  .text("Consumo (kWh)");

var xLimite = 100 + (50 * 6);
svg.append("line")
  .attr("x1", xLimite)
  .attr("y1", 40)
  .attr("x2", xLimite)
  .attr("y2", 560)
  .attr("stroke", "#999")
  .attr("stroke-dasharray", "4,4");

svg.append("text")
  .attr("x", xLimite + 5)
  .attr("y", 50)
  .attr("font-size", "11px")
  .attr("fill", "#666")
  .text("Limite: 50 kWh");

var yLimite = 550 - (100 * 0.6);
svg.append("line")
  .attr("x1", 50)
  .attr("y1", yLimite)
  .attr("x2", 780)
  .attr("y2", yLimite)
  .attr("stroke", "#999")
  .attr("stroke-dasharray", "4,4");

svg.append("text")
  .attr("x", 680)
  .attr("y", yLimite - 5)
  .attr("font-size", "11px")
  .attr("fill", "#666")
  .text("Limite: 100 horas");

for (var i = 0; i < aparelhos.length; i++) {
  var d = aparelhos[i];
  
  var posX = 100 + (d.consumo * 6);
  var posY = 550 - (d.horas * 0.6);
  var raio = d.consumo / 3 + 4;
  
  var cor = "#2ca02c";
  if (d.consumo > 50) {
    cor = "#d62728";
  }

  svg.append("circle")
    .attr("cx", posX)
    .attr("cy", posY)
    .attr("r", raio)
    .attr("fill", cor)
    .attr("stroke", "#333")
    .attr("opacity", 0.8);

  svg.append("text")
    .attr("x", posX + raio + 5)
    .attr("y", posY + 4)
    .attr("font-size", "11px")
    .attr("fill", "#333")
    .text(d.aparelho);
}
