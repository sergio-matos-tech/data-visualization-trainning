const acessos = [ {dia: "Segunda", hora: "08h", valor: 35}, {dia: "Segunda", hora: "12h", valor: 52}, {dia: "Segunda", hora: "18h", valor: 78}, {dia: "Segunda", hora: "22h", valor: 61}, {dia: "Terça", hora: "08h", valor: 42}, {dia: "Terça", hora: "12h", valor: 48}, {dia: "Terça", hora: "18h", valor: 85}, {dia: "Terça", hora: "22h", valor: 67}, {dia: "Quarta", hora: "08h", valor: 38}, {dia: "Quarta", hora: "12h", valor: 55}, {dia: "Quarta", hora: "18h", valor: 91}, {dia: "Quarta", hora: "22h", valor: 73}, {dia: "Quinta", hora: "08h", valor: 45}, {dia: "Quinta", hora: "12h", valor: 50}, {dia: "Quinta", hora: "18h", valor: 88}, {dia: "Quinta", hora: "22h", valor: 70}, {dia: "Sexta", hora: "08h", valor: 51}, {dia: "Sexta", hora: "12h", valor: 63}, {dia: "Sexta", hora: "18h", valor: 95}, {dia: "Sexta", hora: "22h", valor: 82}, {dia: "Sábado", hora: "08h", valor: 58}, {dia: "Sábado", hora: "12h", valor: 76}, {dia: "Sábado", hora: "18h", valor: 89}, {dia: "Sábado", hora: "22h", valor: 93}, {dia: "Domingo", hora: "08h", valor: 47}, {dia: "Domingo", hora: "12h", valor: 69}, {dia: "Domingo", hora: "18h", valor: 84}, {dia: "Domingo", hora: "22h", valor: 87} ];

var svg = d3.select("#heatmap");

var larguraCelula = 90;
var alturaCelula = 70;
var limiteDestaque = 85;

var dias = [];
var horas = [];
for (var i = 0; i < acessos.length; i++) {
  if (dias.indexOf(acessos[i].dia) == -1) dias.push(acessos[i].dia);
  if (horas.indexOf(acessos[i].hora) == -1) horas.push(acessos[i].hora);
}

var menor = acessos[0].valor;
var maior = acessos[0].valor;
for (var i = 1; i < acessos.length; i++) {
  if (acessos[i].valor < menor) menor = acessos[i].valor;
  if (acessos[i].valor > maior) maior = acessos[i].valor;
}

function cor(valor) {
  var t = (valor - menor) / (maior - menor);
  var r = Math.round(255 + t * (189 - 255));
  var g = Math.round(255 + t * (0 - 255));
  var b = Math.round(204 + t * (38 - 204));
  return "rgb(" + r + "," + g + "," + b + ")";
}

function posX(d) {
  return 100 + dias.indexOf(d.dia) * larguraCelula;
}

function posY(d) {
  return 60 + horas.indexOf(d.hora) * alturaCelula;
}

// células do heatmap
svg.selectAll(".celula")
  .data(acessos)
  .enter()
  .append("rect")
  .attr("class", "celula")
  .attr("x", function(d) { return posX(d); })
  .attr("y", function(d) { return posY(d); })
  .attr("width", larguraCelula)
  .attr("height", alturaCelula)
  .attr("fill", function(d) { return cor(d.valor); })
  .attr("stroke", "#fff")
  .attr("stroke-width", 2);

svg.selectAll(".destaque")
  .data(acessos.filter(function(d) { return d.valor >= limiteDestaque; }))
  .enter()
  .append("rect")
  .attr("class", "destaque")
  .attr("x", function(d) { return posX(d) + 3; })
  .attr("y", function(d) { return posY(d) + 3; })
  .attr("width", larguraCelula - 6)
  .attr("height", alturaCelula - 6)
  .attr("fill", "none")
  .attr("stroke", "#000")
  .attr("stroke-width", 3);

svg.selectAll(".valor")
  .data(acessos)
  .enter()
  .append("text")
  .attr("class", "valor")
  .attr("x", function(d) { return posX(d) + larguraCelula / 2; })
  .attr("y", function(d) { return posY(d) + alturaCelula / 2 + 5; })
  .attr("text-anchor", "middle")
  .attr("font-size", function(d) {
    if (d.valor >= limiteDestaque) return "16px";
    return "13px";
  })
  .attr("font-weight", function(d) {
    if (d.valor >= limiteDestaque) return "bold";
    return "normal";
  })
  .attr("fill", function(d) {
    if ((d.valor - menor) / (maior - menor) > 0.5) return "#fff";
    return "#333";
  })
  .text(function(d) { return d.valor; });

svg.selectAll(".textoDia")
  .data(dias)
  .enter()
  .append("text")
  .attr("class", "textoDia")
  .attr("x", function(d, i) { return 100 + i * larguraCelula + larguraCelula / 2; })
  .attr("y", 50)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .text(function(d) { return d; });

svg.selectAll(".textoHora")
  .data(horas)
  .enter()
  .append("text")
  .attr("class", "textoHora")
  .attr("x", 90)
  .attr("y", function(d, i) { return 60 + i * alturaCelula + alturaCelula / 2 + 4; })
  .attr("text-anchor", "end")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .text(function(d) { return d; });

svg.append("text")
  .attr("x", 100 + dias.length * larguraCelula / 2)
  .attr("y", 25)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("fill", "#666")
  .text("Dia da semana");

svg.append("text")
  .attr("x", 30)
  .attr("y", 60 + horas.length * alturaCelula / 2)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("fill", "#666")
  .attr("transform", "rotate(-90, 30, " + (60 + horas.length * alturaCelula / 2) + ")")
  .text("Horário");

var passos = [];
for (var p = 0; p < 10; p++) {
  passos.push(maior - p * (maior - menor) / 9);
}

var alturaPasso = (horas.length * alturaCelula) / passos.length;

svg.selectAll(".legendaCor")
  .data(passos)
  .enter()
  .append("rect")
  .attr("class", "legendaCor")
  .attr("x", 770)
  .attr("y", function(d, i) { return 60 + i * alturaPasso; })
  .attr("width", 20)
  .attr("height", alturaPasso)
  .attr("fill", function(d) { return cor(d); });

svg.append("text")
  .attr("x", 795).attr("y", 70)
  .attr("font-size", "11px")
  .text(maior + " acessos");

svg.append("text")
  .attr("x", 795).attr("y", 60 + horas.length * alturaCelula)
  .attr("font-size", "11px")
  .text(menor + " acessos");

svg.append("text")
  .attr("x", 770).attr("y", 50)
  .attr("font-size", "11px")
  .attr("font-weight", "bold")
  .text("Acessos");

svg.append("rect")
  .attr("x", 100).attr("y", 362)
  .attr("width", 20).attr("height", 20)
  .attr("fill", cor(maior))
  .attr("stroke", "#000")
  .attr("stroke-width", 3);

svg.append("text")
  .attr("x", 128).attr("y", 376)
  .attr("font-size", "12px")
  .text("Períodos com maior quantidade de acessos (" + limiteDestaque + " ou mais)");
