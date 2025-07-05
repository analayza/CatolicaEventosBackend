import puppeteer from 'puppeteer';

export async function generateCertificate(nameUser, nameActivity, workload, backgroundUrl, id_certificate, issued_date) {
  function formatDateBR(date) {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = meses[date.getMonth()];
    const ano = date.getFullYear();

    return `${dia} ${mes} de ${ano}`;
  }
const issuedDateFormatted = formatDateBR(new Date(issued_date));
  const htmlContent = `
    <html>
      <head>
        <style>
          @page { margin: 0; }
          body {
            margin: 0;
            width: 100%;
            height: 100vh;
            background-image: url('${backgroundUrl}');
            background-size: cover;
            background-position: center;
            font-family: Georgia, serif;
            text-align: center;
            position: relative;
          }
          .text-content {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            font-size: 24px;
            color: #000;
            font-weight: bold;
          }
          .code {
            position: absolute;
            top: 95%;
            left: 5%;
            font-size: 10px;
            color: #000;
            transform: translateY(-50%);
            writing-mode: horizontal-tb;
          }
        </style>
      </head>
      <body>
        <div class="code">
          Código de validação: ${id_certificate}
        </div>

        <div class="text-content" style="line-height: 1.6;">
            Certificamos que <strong>${nameUser}</strong>
            participou da atividade ${nameActivity},
            realizada no âmbito do evento, com carga horária de ${workload} horas.<br/><br/>
            Esta certificação é concedida como reconhecimento da participação e empenho demonstrados. Emitido em: <strong>${issuedDateFormatted}</strong>
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: 0, landscape: true });

  await browser.close();
  return pdfBuffer;
}