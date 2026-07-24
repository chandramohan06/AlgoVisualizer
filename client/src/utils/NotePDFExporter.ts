import { INote } from '@algovisualizer/shared';

export const printNote = (note: INote) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print/download notes as PDF.');
    return;
  }

  const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${note.title} - AlgoVisualizer Knowledge Base</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            color: #1a202c;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: #ffffff;
          }
          .header {
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 12px;
            margin-bottom: 24px;
          }
          .title {
            font-size: 26px;
            font-weight: 800;
            color: #1e1b4b;
            margin: 0 0 6px 0;
          }
          .meta {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .badge {
            display: inline-block;
            background: #e0e7ff;
            color: #3730a3;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            margin-right: 6px;
          }
          .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #312e81;
            border-left: 4px solid #4f46e5;
            padding-left: 10px;
            margin-bottom: 8px;
          }
          .content-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px;
            font-size: 13px;
          }
          pre {
            background: #0f172a;
            color: #f8fafc;
            padding: 14px;
            border-radius: 6px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 12px;
            overflow-x: auto;
            white-space: pre-wrap;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          th, td {
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            font-size: 12px;
            text-align: left;
          }
          th {
            background: #e2e8f0;
            font-weight: 700;
          }
          .footer {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">${note.title}</h1>
          <div class="meta">
            <span class="badge">${note.category}</span>
            <span class="badge">Difficulty: ${note.difficulty}</span>
            <span>Est. Read: ${note.estimatedReadTime} mins</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">1. Definition & Overview</div>
          <div class="content-box">
            <p><strong>Definition:</strong> ${note.definition}</p>
            ${note.introduction ? `<p><strong>Introduction:</strong> ${note.introduction}</p>` : ''}
            ${note.whyUsed ? `<p><strong>Why It Is Used:</strong> ${note.whyUsed}</p>` : ''}
          </div>
        </div>

        <div class="section">
          <div class="section-title">2. Working Principle & Algorithm</div>
          <div class="content-box">
            <p><strong>Working Principle:</strong> ${note.working}</p>
            <p><strong>Step-by-Step Algorithm:</strong></p>
            <pre>${note.algorithm}</pre>
            <p><strong>Flow Explanation:</strong> ${note.flow}</p>
            <p><strong>Dry Run:</strong> ${note.dryRun}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">3. Complexity Analysis</div>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Best</th>
                <th>Average / Aux</th>
                <th>Worst</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Time Complexity</strong></td>
                <td>${note.timeComplexity?.best || 'O(1)'}</td>
                <td>${note.timeComplexity?.average || 'O(N)'}</td>
                <td>${note.timeComplexity?.worst || 'O(N)'}</td>
              </tr>
              <tr>
                <td><strong>Space Complexity</strong></td>
                <td>O(1)</td>
                <td>${note.spaceComplexity?.auxiliary || 'O(1)'}</td>
                <td>${note.spaceComplexity?.worst || 'O(N)'}</td>
              </tr>
            </tbody>
          </table>
          ${note.timeComplexity?.description ? `<p style="font-size:12px; color:#475569; margin-top:6px;">${note.timeComplexity.description}</p>` : ''}
        </div>

        ${
          note.javaCode
            ? `
        <div class="section">
          <div class="section-title">4. Implementation (Java)</div>
          <pre>${note.javaCode}</pre>
        </div>`
            : ''
        }

        ${
          note.pythonCode
            ? `
        <div class="section">
          <div class="section-title">5. Implementation (Python)</div>
          <pre>${note.pythonCode}</pre>
        </div>`
            : ''
        }

        <div class="section">
          <div class="section-title">6. Example & Output</div>
          <div class="content-box">
            <p><strong>Example Input/Setup:</strong> ${note.example}</p>
            <p><strong>Expected Output:</strong> ${note.output}</p>
          </div>
        </div>

        ${
          note.interviewQuestions && note.interviewQuestions.length > 0
            ? `
        <div class="section">
          <div class="section-title">7. Interview Questions</div>
          <div class="content-box">
            ${note.interviewQuestions
              .map(
                (q, idx) => `
              <div style="margin-bottom:10px;">
                <p style="font-weight:700; margin:0 0 2px 0;">Q${idx + 1}: ${q.question}</p>
                <p style="color:#334155; margin:0;">A: ${q.answer}</p>
              </div>
            `
              )
              .join('')}
          </div>
        </div>`
            : ''
        }

        ${
          note.revisionNotes
            ? `
        <div class="section">
          <div class="section-title">8. Revision Notes & Cheat Sheet</div>
          <div class="content-box">
            <p>${note.revisionNotes}</p>
            ${note.cheatSheet ? `<pre>${note.cheatSheet}</pre>` : ''}
          </div>
        </div>`
            : ''
        }

        <div class="footer">
          Generated from AlgoVisualizer Dynamic DSA Knowledge Base • ${new Date().toLocaleDateString()}
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(printContent);
  printWindow.document.close();
};

export const downloadPDF = (note: INote) => {
  printNote(note);
};
