function inputLoadInputs() {
    const n = parseInt(document.getElementById('n').value);
    const container = document.getElementById('loadInputs');
    container.innerHTML = '';
  
    for (let i = 0; i < n; i++) {
      container.innerHTML += `
        <div>
          <h3>Load ${i + 1}</h3>
          <label>Real Power (kW):</label>
          <input type="number" id="power${i}" step="0.01" required />
  
          <label>Power Factor:</label>
          <input type="number" id="pf${i}" step="0.01" min="0.1" max="1" required />
        </div>
      `;
    }
  }
  
  function calculate() {
    const V = parseFloat(document.getElementById('voltage').value);
    const n = parseInt(document.getElementById('n').value);
    const requiredPF = parseFloat(document.getElementById('requiredPF').value);
  
    let totalP = 0; 
    let totalQ = 0; 
  
    for (let i = 0; i < n; i++) {
      const P = parseFloat(document.getElementById(`power${i}`).value);
      const pf = parseFloat(document.getElementById(`pf${i}`).value);
      const theta = Math.acos(pf);
  
      totalP += P;
      totalQ += P * Math.tan(theta);
    }
  
    const currentPF = totalP / Math.sqrt(totalP ** 2 + totalQ ** 2);
    const thetaNew = Math.acos(requiredPF);
    const Qnew = totalP * Math.tan(thetaNew);
  
    const Qc = totalQ - Qnew; 
  
    // Here We Are Converting kVAR to VAR for calculation
    const Qc_var = Qc * 1000;
  
    // Assumption :: f = 50 Hz
    const f = 50;
    const C = Qc_var / (2 * Math.PI * f * V * V); // Capacitance in Farads
  
    const results = `
      <p><strong>Total Real Power (kW):</strong> ${totalP.toFixed(2)}</p>
      <p><strong>Existing Power Factor:</strong> ${currentPF.toFixed(3)}</p>
      <p><strong>Required Reactive Power (kVAR):</strong> ${Qc.toFixed(2)}</p>
      <p><strong>Capacitance Required (μF):</strong> ${(C * 1e6).toFixed(2)} μF</p>
    `;
  
    document.getElementById('results').innerHTML = results;
  }
  