var vendas = [
  ["2013-01-01",14236.90],
  ["2013-02-01",4519.89],
  ["2013-03-01",55691.01],
  ["2013-04-01",28295.35],
  ["2013-05-01",23648.29],
  ["2013-06-01",34595.13],
  ["2013-07-01",33946.39],
  ["2013-08-01",27909.47],
  ["2013-09-01",81777.35],
  ["2013-10-01",31453.39],
  ["2013-11-01",78628.72],
  ["2013-12-01",69545.62],
  ["2014-01-01",18174.08],
  ["2014-02-01",11951.41],
  ["2014-03-01",38726.25],
  ["2014-04-01",34195.21],
  ["2014-05-01",30131.69],
  ["2014-06-01",24797.29],
  ["2014-07-01",28765.33],
  ["2014-08-01",36898.33],
  ["2014-09-01",64595.92],
  ["2014-10-01",31404.92],
  ["2014-11-01",75972.56],
  ["2014-12-01",74919.52],
  ["2015-01-01",18542.49],
  ["2015-02-01",22867.71],
  ["2015-03-01",51186.22],
  ["2015-04-01",39248.59],
  ["2015-05-01",56691.08],
  ["2015-06-01",39430.44],
  ["2015-07-01",38440.76],
  ["2015-08-01",33265.56],
  ["2015-09-01",72908.11],
  ["2015-10-01",56463.13],
  ["2015-11-01",82192.32],
  ["2015-12-01",97237.42],
  ["2016-01-01",44703.14],
  ["2016-02-01",20301.13],
  ["2016-03-01",58872.35],
  ["2016-04-01",36521.54],
  ["2016-05-01",44261.11],
  ["2016-06-01",52981.73],
  ["2016-07-01",45264.42],
  ["2016-08-01",63120.89],
  ["2016-09-01",87866.65],
  ["2016-10-01",77776.92],
  ["2016-11-01",118447.83],
  ["2016-12-01",83829.32]
];

var meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
var coresMeses = ["#8dd3c7", "#ffed6f", "#bebada", "#80b1d3", "#fdb462", "#b3de69",
                  "#fccde5", "#bc80bd", "#ccebc5", "#d9d9d9", "#e5c494", "#a65628"];
var corMenor = "#d62728";
var corMaior = "#006d2c";
var corMedia = "#08306b";

var svg = d3.select("#grafico");

function posY(valor) {
  return 440 - valor * 400 / 120000;
}

function posX(i) {
  return 80 + i * 20;
}

// Menor e maior venda
var indiceMenor = 0;
var indiceMaior = 0;
for (var i = 1; i < vendas.length; i++) {
  if (vendas[i][1] < vendas[indiceMenor][1]) indiceMenor = i;
  if (vendas[i][1] > vendas[indiceMaior][1]) indiceMaior = i;
}

// Media de cada ano
var anos = [];
for (var i = 0; i < vendas.length; i++) {
  var ano = vendas[i][0].substring(0, 4);
  if (anos.indexOf(ano) == -1) anos.push(ano);
}

var medias = [];
for (var a = 0; a < anos.length; a++) {
  var vendasAno = vendas.filter(function(d) { return d[0].substring(0, 4) == anos[a]; });
  var soma = 0;
  for (var j = 0; j < vendasAno.length; j++) {
    soma += vendasAno[j][1];
  }
  medias.push({"ano": anos[a], "media": soma / vendasAno.length, "pos": a});
}

for (var v = 0; v <= 120000; v += 20000) {
  svg.append("line")
    .attr("x1", 80).attr("y1", posY(v))
    .attr("x2", 1040).attr("y2", posY(v))
    .attr("stroke", "#eee");

  svg.append("text")
    .attr("x", 72)
    .attr("y", posY(v) + 4)
    .attr("text-anchor", "end")
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text(v);
}

for (var k = 1; k < anos.length; k++) {
  svg.append("line")
    .attr("x1", posX(k * 12)).attr("y1", 40)
    .attr("x2", posX(k * 12)).attr("y2", 480)
    .attr("stroke", "#bbb")
    .attr("stroke-dasharray", "4,4");
}

svg.selectAll(".barra")
  .data(vendas)
  .enter()
  .append("rect")
  .attr("class", "barra")
  .attr("x", function(d, i) { return posX(i) + 2; })
  .attr("y", function(d) { return posY(d[1]); })
  .attr("width", 16)
  .attr("height", function(d) { return 440 - posY(d[1]); })
  .attr("fill", function(d, i) {
    if (i == indiceMenor) return corMenor;
    if (i == indiceMaior) return corMaior;
    var mes = parseInt(d[0].substring(5, 7));
    return coresMeses[mes - 1];
  })
  .attr("stroke", function(d, i) {
    if (i == indiceMenor || i == indiceMaior) return "#000";
    return "none";
  })
  .attr("stroke-width", 2);

var destaques = [indiceMenor, indiceMaior];
svg.selectAll(".destaque")
  .data(destaques)
  .enter()
  .append("text")
  .attr("class", "destaque")
  .attr("x", function(d) { return posX(d) + 10; })
  .attr("y", function(d) { return posY(vendas[d][1]) - 6; })
  .attr("text-anchor", "middle")
  .attr("font-size", "10px")
  .attr("font-weight", "bold")
  .attr("fill", function(d, i) {
    if (i == 0) return corMenor;
    return corMaior;
  })
  .text(function(d) { return vendas[d][1].toFixed(2); });

svg.append("line")
  .attr("x1", 80).attr("y1", 440)
  .attr("x2", 1040).attr("y2", 440)
  .attr("stroke", "#999");

svg.append("line")
  .attr("x1", 80).attr("y1", 30)
  .attr("x2", 80).attr("y2", 440)
  .attr("stroke", "#999");

svg.append("text")
  .attr("x", 20).attr("y", 22)
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .attr("fill", "#333")
  .text("Vendas");

svg.selectAll(".letraMes")
  .data(vendas)
  .enter()
  .append("text")
  .attr("class", "letraMes")
  .attr("x", function(d, i) { return posX(i) + 10; })
  .attr("y", 454)
  .attr("text-anchor", "middle")
  .attr("font-size", "9px")
  .attr("fill", "#666")
  .text(function(d) {
    var mes = parseInt(d[0].substring(5, 7));
    return meses[mes - 1].charAt(0);
  });

svg.selectAll(".textoAno")
  .data(anos)
  .enter()
  .append("text")
  .attr("class", "textoAno")
  .attr("x", function(d, i) { return posX(i * 12 + 6); })
  .attr("y", 472)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .text(function(d) { return d; });

var curva = d3.line().curve(d3.curveCardinal)
  .x(function(d) { return posX(d.pos * 12 + 6); })
  .y(function(d) { return posY(d.media); });

svg.append("path")
  .attr("d", curva(medias))
  .attr("stroke", corMedia)
  .attr("stroke-width", 3)
  .attr("fill", "none");

svg.selectAll(".pontoMedia")
  .data(medias)
  .enter()
  .append("circle")
  .attr("class", "pontoMedia")
  .attr("cx", function(d) { return posX(d.pos * 12 + 6); })
  .attr("cy", function(d) { return posY(d.media); })
  .attr("r", 5)
  .attr("fill", corMedia);

svg.selectAll(".textoMedia")
  .data(medias)
  .enter()
  .append("text")
  .attr("class", "textoMedia")
  .attr("x", function(d) { return posX(d.pos * 12 + 6); })
  .attr("y", function(d) { return posY(d.media) - 12; })
  .attr("text-anchor", "middle")
  .attr("font-size", "11px")
  .attr("font-weight", "bold")
  .attr("fill", corMedia)
  .text(function(d) { return "Média: " + d.media.toFixed(2); });

var legendaMeses = svg.selectAll(".legendaMes")
  .data(meses)
  .enter()
  .append("g")
  .attr("class", "legendaMes")
  .attr("transform", function(d, i) { return "translate(" + (80 + i * 70) + ", 492)"; });

legendaMeses.append("rect")
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", function(d, i) { return coresMeses[i]; });

legendaMeses.append("text")
  .attr("x", 17)
  .attr("y", 10)
  .attr("font-size", "11px")
  .text(function(d) { return d; });

var outros = [
  {"texto": "Menor venda (" + vendas[indiceMenor][0].substring(0, 7) + ")", "cor": corMenor},
  {"texto": "Maior venda (" + vendas[indiceMaior][0].substring(0, 7) + ")", "cor": corMaior},
  {"texto": "Média anual", "cor": corMedia}
];

var legendaOutros = svg.selectAll(".legendaOutro")
  .data(outros)
  .enter()
  .append("g")
  .attr("class", "legendaOutro")
  .attr("transform", function(d, i) { return "translate(" + (80 + i * 210) + ", 515)"; });

legendaOutros.append("rect")
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", function(d) { return d.cor; })
  .attr("stroke", function(d, i) {
    if (i < 2) return "#000";
    return "none";
  });

legendaOutros.append("text")
  .attr("x", 17)
  .attr("y", 10)
  .attr("font-size", "11px")
  .text(function(d) { return d.texto; });
