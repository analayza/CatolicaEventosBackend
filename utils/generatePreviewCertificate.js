import puppeteer from 'puppeteer';

export async function generatePreviewCertificate(backgroundUrl) {
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
            font-family: Arial, sans-serif;
            text-align: center;
            position: relative;
          }
          .text-content {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            font-size: 24px;
            color: #000;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="text-content" style="line-height: 1.6;">
            Certificamos que <strong>Nome do Participante Aqui</strong><br/>
            participou da atividade <strong>Atividade de Teste</strong>,<br/>
            realizada no âmbito do evento, com carga horária de <strong>XX horas</strong>.<br/><br/>
            Esta certificação é concedida como reconhecimento da participação e empenho demonstrados.
        </div>
      </body>
    </html>
  `;

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: 0, landscape: true });

    await browser.close();
    return pdfBuffer;
}
