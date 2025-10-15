const contratos = [];
const valorParcelaInput = document.getElementById("valorParcela");
const taxaMensalInput = document.getElementById("taxaMensal");
const qtdParcelasInput = document.getElementById("qtdParcelas");
const contratosContainer = document.getElementById("contratos");

const totalMensalEl = document.getElementById("totalMensal");
const taxaTotalEl = document.getElementById("taxaTotal");
const totalParcelasEl = document.getElementById("totalParcelas");
const valorTotalPagoEl = document.getElementById("valorTotalPago");

document.getElementById("adicionarContrato").addEventListener("click", () => {
  const valor = parseFloat(valorParcelaInput.value);
  const taxa = parseFloat(taxaMensalInput.value);
  const parcelas = parseInt(qtdParcelasInput.value);

  if (isNaN(valor) || isNaN(taxa) || isNaN(parcelas) || valor <= 0 || parcelas <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const contrato = { valor, taxa, parcelas };
  contratos.push(contrato);
  atualizarInterface();
  limparCampos();
});

function atualizarInterface() {
  contratosContainer.innerHTML = "";

  contratos.forEach((c, index) => {
    const card = document.createElement("div");
    card.classList.add("contrato-card");

    card.innerHTML = `
      <div class="contrato-info">
        <span><strong>Valor:</strong> R$ ${formatarMoeda(c.valor)}</span>
        <span><strong>Taxa:</strong> ${c.taxa.toFixed(2)}%</span>
        <span><strong>Parcelas:</strong> ${c.parcelas}</span>
      </div>
      <button class="remove-btn" onclick="removerContrato(${index})">✕</button>
    `;

    contratosContainer.appendChild(card);
  });

  calcularTotais();
}

function removerContrato(index) {
  contratos.splice(index, 1);
  atualizarInterface();
}

function calcularTotais() {
  let totalMensal = 0;
  let taxaTotal = 0;
  let totalParcelas = 0;
  let valorTotalPago = 0;

  contratos.forEach(c => {
    totalMensal += c.valor;
    taxaTotal += c.taxa;
    totalParcelas += c.parcelas;
    valorTotalPago += c.valor * c.parcelas;
  });

  totalMensalEl.textContent = `R$ ${formatarMoeda(totalMensal)}`;
  taxaTotalEl.textContent = `${taxaTotal.toFixed(2)}%`;
  totalParcelasEl.textContent = formatarNumero(totalParcelas);
  valorTotalPagoEl.textContent = `R$ ${formatarMoeda(valorTotalPago)}`;
}

function limparCampos() {
  valorParcelaInput.value = "";
  taxaMensalInput.value = "";
  qtdParcelasInput.value = "";
}

// 🔸 Funções de formatação com separador de milhar e vírgula decimal
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatarNumero(num) {
  return num.toLocaleString("pt-BR");
}
