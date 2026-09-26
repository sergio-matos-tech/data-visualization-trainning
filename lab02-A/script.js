var dados = [
  {"nome": "Ana", "idade": 10, "peso": 34, "alt": 1.40, "nota": 7.8, "ano": 1},
  {"nome": "Ana", "idade": 11, "peso": 36, "alt": 1.45, "nota": 8.0, "ano": 2},
  {"nome": "Ana", "idade": 12, "peso": 39, "alt": 1.50, "nota": 8.4, "ano": 3},
  {"nome": "Ana", "idade": 13, "peso": 42, "alt": 1.55, "nota": 8.1, "ano": 4},
  {"nome": "Ana", "idade": 14, "peso": 45, "alt": 1.60, "nota": 8.7, "ano": 5},

  {"nome": "Bruno", "idade": 10, "peso": 38, "alt": 1.42, "nota": 6.2, "ano": 1},
  {"nome": "Bruno", "idade": 11, "peso": 41, "alt": 1.47, "nota": 6.8, "ano": 2},
  {"nome": "Bruno", "idade": 12, "peso": 44, "alt": 1.53, "nota": 7.1, "ano": 3},
  {"nome": "Bruno", "idade": 13, "peso": 48, "alt": 1.59, "nota": 6.9, "ano": 4},
  {"nome": "Bruno", "idade": 14, "peso": 52, "alt": 1.66, "nota": 7.4, "ano": 5},

  {"nome": "Carla", "idade": 10, "peso": 32, "alt": 1.38, "nota": 9.0, "ano": 1},
  {"nome": "Carla", "idade": 11, "peso": 34, "alt": 1.43, "nota": 9.2, "ano": 2},
  {"nome": "Carla", "idade": 12, "peso": 37, "alt": 1.49, "nota": 9.1, "ano": 3},
  {"nome": "Carla", "idade": 13, "peso": 40, "alt": 1.54, "nota": 9.4, "ano": 4},
  {"nome": "Carla", "idade": 14, "peso": 43, "alt": 1.58, "nota": 9.5, "ano": 5},

  {"nome": "Diego", "idade": 10, "peso": 36, "alt": 1.41, "nota": 5.8, "ano": 1},
  {"nome": "Diego", "idade": 11, "peso": 39, "alt": 1.46, "nota": 6.0, "ano": 2},
  {"nome": "Diego", "idade": 12, "peso": 42, "alt": 1.51, "nota": 6.3, "ano": 3},
  {"nome": "Diego", "idade": 13, "peso": 46, "alt": 1.57, "nota": 6.5, "ano": 4},
  {"nome": "Diego", "idade": 14, "peso": 50, "alt": 1.63, "nota": 6.7, "ano": 5},

  {"nome": "Eduarda", "idade": 10, "peso": 35, "alt": 1.39, "nota": 7.1, "ano": 1},
  {"nome": "Eduarda", "idade": 11, "peso": 37, "alt": 1.44, "nota": 7.5, "ano": 2},
  {"nome": "Eduarda", "idade": 12, "peso": 40, "alt": 1.49, "nota": 7.8, "ano": 3},
  {"nome": "Eduarda", "idade": 13, "peso": 43, "alt": 1.55, "nota": 8.0, "ano": 4},
  {"nome": "Eduarda", "idade": 14, "peso": 46, "alt": 1.60, "nota": 8.3, "ano": 5},

  {"nome": "Felipe", "idade": 10, "peso": 40, "alt": 1.43, "nota": 8.2, "ano": 1},
  {"nome": "Felipe", "idade": 11, "peso": 43, "alt": 1.48, "nota": 8.0, "ano": 2},
  {"nome": "Felipe", "idade": 12, "peso": 46, "alt": 1.54, "nota": 8.5, "ano": 3},
  {"nome": "Felipe", "idade": 13, "peso": 50, "alt": 1.61, "nota": 8.6, "ano": 4},
  {"nome": "Felipe", "idade": 14, "peso": 54, "alt": 1.68, "nota": 8.9, "ano": 5}
];

var alunos = ["Ana", "Bruno", "Carla", "Diego", "Eduarda", "Felipe"];
var cores = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"];
var svg1 = d3.select("#grafico1");

svg1.append("line")
  .attr("x1", 50).attr("y1", 200)
  .attr("x2", 480).attr("y2", 200)
  .attr("stroke", "#ccc");

svg1.append("line")
  .attr("x1", 50).attr("y1", 30)
  .attr("x2", 50).attr("y2", 200)
  .attr("stroke", "#ccc");

svg1.append("text")
  .attr("x", 15).attr("y", 40)
  .attr("font-size", "11px")
  .text("Notas");

for (var n = 5; n <= 10; n++) {
  var yPos = 200 - (n - 5) * 30;
  svg1.append("text")
    .attr("x", 45)
    .attr("y", yPos + 4)
    .attr("text-anchor", "end")
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text(n);
}

for (var a = 1; a <= 5; a++) {
  svg1.append("text")
    .attr("x", 50 + (a - 1) * 90)
    .attr("y", 220)
    .attr("font-size", "11px")
    .attr("text-anchor", "middle")
    .text("Ano " + a);
}

var linha = d3.line()
  .x(function(d) { return 50 + (d.ano - 1) * 90; })
  .y(function(d) { return 200 - (d.nota - 5) * 30; });

for (var i = 0; i < alunos.length; i++) {
  var dadosAluno = dados.filter(function(d) { return d.nome === alunos[i]; });

  svg1.append("path")
    .attr("d", linha(dadosAluno))
    .attr("stroke", cores[i])
    .attr("stroke-width", 2)
    .attr("fill", "none");

  for (var j = 0; j < dadosAluno.length; j++) {
    svg1.append("circle")
      .attr("cx", 50 + (dadosAluno[j].ano - 1) * 90)
      .attr("cy", 200 - (dadosAluno[j].nota - 5) * 30)
      .attr("r", 3)
      .attr("fill", cores[i]);
  }

  svg1.append("rect")
    .attr("x", 490)
    .attr("y", 28 + i * 18)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", cores[i]);

  svg1.append("text")
    .attr("x", 505)
    .attr("y", 37 + i * 18)
    .attr("font-size", "10px")
    .attr("fill", cores[i])
    .text(alunos[i]);
}

var svg2 = d3.select("#grafico2");
var dadosAno5 = dados.filter(function(d) { return d.ano === 5; });
dadosAno5.sort(function(a, b) { return b.peso - a.peso; });

for (var k = 0; k < dadosAno5.length; k++) {
  var g = svg2.append("g")
    .attr("transform", "translate(60, " + (20 + k * 35) + ")");

  g.append("text")
    .attr("x", -10)
    .attr("y", 15)
    .attr("text-anchor", "end")
    .attr("font-size", "11px")
    .text(dadosAno5[k].nome);

  g.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", dadosAno5[k].peso * 6)
    .attr("height", 20)
    .attr("fill", cores[alunos.indexOf(dadosAno5[k].nome)]);

  g.append("text")
    .attr("x", (dadosAno5[k].peso * 6) + 5)
    .attr("y", 14)
    .attr("font-size", "11px")
    .text(dadosAno5[k].peso + " kg");
}

var svg3 = d3.select("#grafico3");

svg3.append("line")
  .attr("x1", 50).attr("y1", 220)
  .attr("x2", 500).attr("y2", 220)
  .attr("stroke", "#999");

svg3.append("text")
  .attr("x", 500).attr("y", 240)
  .attr("text-anchor", "end")
  .attr("font-size", "10px")
  .text("Peso (kg)");

svg3.append("line")
  .attr("x1", 50).attr("y1", 20)
  .attr("x2", 50).attr("y2", 220)
  .attr("stroke", "#999");

svg3.append("text")
  .attr("x", 55).attr("y", 30)
  .attr("font-size", "10px")
  .text("Altura (m)");

for (var px = 40; px <= 55; px += 5) {
  var xTick = 80 + (px - 40) * 20;
  svg3.append("text")
    .attr("x", xTick)
    .attr("y", 235)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text(px);
}

var alturas = [1.55, 1.60, 1.65, 1.70];
for (var ai = 0; ai < alturas.length; ai++) {
  var yTick = 200 - (alturas[ai] - 1.55) * 900;
  svg3.append("text")
    .attr("x", 45)
    .attr("y", yTick + 4)
    .attr("text-anchor", "end")
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text(alturas[ai].toFixed(2));
}

svg3.append("text")
  .attr("x", 500).attr("y", 260)
  .attr("text-anchor", "end")
  .attr("font-size", "9px")
  .attr("fill", "#999")
  .text("* tamanho do circulo = nota");

for (var m = 0; m < dadosAno5.length; m++) {
  var d = dadosAno5[m];
  var x = 80 + (d.peso - 40) * 20;
  var y = 200 - (d.alt - 1.55) * 900;
  var r = (d.nota - 5) * 3;

  svg3.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", r)
    .attr("fill", cores[alunos.indexOf(d.nome)])
    .attr("opacity", 0.7);

  var yTexto = y + 4;
  if (d.nome === "Ana") 
    yTexto = y + r + 14;

  svg3.append("text")
    .attr("x", x + r + 4)
    .attr("y", yTexto)
    .attr("font-size", "11px")
    .text(d.nome);
}