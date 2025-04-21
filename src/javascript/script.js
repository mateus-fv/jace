document.addEventListener('DOMContentLoaded', () => {
  console.log('📑 sorting script carregado!');

  const tabela = document.getElementById('tabela-personagens');
  if (!tabela) return;

  let direcao = 1, colunaAtiva = null;

  // apenas ths com a classe "ordenavel"
  const thsOrdenaveis = tabela.querySelectorAll('th.ordenavel');

  thsOrdenaveis.forEach(th => {
    th.style.cursor = 'pointer';
    
    th.addEventListener('click', () => {
      const index = Array.from(th.parentNode.children).indexOf(th);
      const linhas = Array.from(tabela.tBodies[0].rows);
      const isNumero = /confiança/i.test(th.textContent);

      linhas.sort((a, b) => {
        let va = a.cells[index].textContent.trim();
        let vb = b.cells[index].textContent.trim();

        if (isNumero) {
          va = parseFloat(va.replace('%','').replace(',', '.')) || 0;
          vb = parseFloat(vb.replace('%','').replace(',', '.')) || 0;
        }

        if (va < vb) return -1 * direcao;
        if (va > vb) return  1 * direcao;
        return 0;
      });

      // inverte ou reseta a direção
      direcao = colunaAtiva === index ? -direcao : 1;
      colunaAtiva = index;

    
      // reanexa as linhas ordenadas
      linhas.forEach(l => tabela.tBodies[0].appendChild(l));
    });
  });
});
