/* global dscc, Chart */

// Subscribe to data changes
dscc.subscribeToData(drawChart, { transform: dscc.objectTransform });

function drawChart(message) {
  const rows = message.tables.DEFAULT || [];
  if (!rows.length) {
    document.body.textContent = 'No data';
    return;
  }

  // First dimension (date) + second dimension (category) = label
  const labels = rows.map(r => `${r.dim0} – ${r.dim1}`);
  const values = rows.map(r => r.metric0);

  // Clear previous render
  document.body.innerHTML = '<canvas id="canvas"></canvas>';
  const canvas = document.getElementById('canvas');
  canvas.width  = dscc.getWidth();
  canvas.height = dscc.getHeight();

  new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: '#2196f3'
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      animation: false,
      responsive: false
    }
  });
}
