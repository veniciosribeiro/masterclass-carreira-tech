import { jsPDF } from 'jspdf';
import {
  TestResult,
  Question,
  QuestionOption,
  OrderingStep,
  Answer,
} from '../common/testTypes.js';
import { questions } from '../common/questions.js';

// ─── COLOR PALETTE (matching landing page) ─────────────
const COLORS = {
  bg: '#0D1117',
  surface: '#161B22',
  border: '#30363D',
  primary: '#19e65e',
  primaryDark: '#12a843',
  text: '#C9D1D9',
  textBright: '#FFFFFF',
  purple: '#7c3aed',
  blue: '#3b82f6',
  red: '#ef4444',
};

const AREA_COLORS: Record<string, string> = {
  frontend: COLORS.primary,
  backend: COLORS.blue,
  dataAI: COLORS.purple,
};

const AREA_LABELS: Record<string, string> = {
  frontend: 'Front-End',
  backend: 'Back-End',
  dataAI: 'Dados & IA',
};

const BEHAVIORAL_LABELS: Record<string, string> = {
  resilience: 'Resiliência',
  logic: 'Lógica',
  proactivity: 'Proatividade',
};

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function setColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setTextColor(r, g, b);
}

function setDrawColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setDrawColor(r, g, b);
}

function setFillColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setFillColor(r, g, b);
}

function drawBackground(doc: jsPDF) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  setFillColor(doc, COLORS.bg);
  doc.rect(0, 0, w, h, 'F');
}

function drawBar(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  percent: number,
  color: string
) {
  // Background bar
  setFillColor(doc, COLORS.surface);
  doc.roundedRect(x, y, width, 6, 3, 3, 'F');
  // Fill bar
  if (percent > 0) {
    setFillColor(doc, color);
    const fillWidth = Math.max((width * percent) / 100, 6);
    doc.roundedRect(x, y, fillWidth, 6, 3, 3, 'F');
  }
}

// ... existing imports ...

// ─── NEW STYLING CONSTANTS ───
const CATEGORY_COLORS: Record<string, string> = {
  logic: '#7c3aed', // Purple
  behavioral: '#ef4444', // Red (or maybe blue based on preference, using Red for behavior/emotion)
  affinity: '#3b82f6', // Blue
};

const CATEGORY_LABELS: Record<string, string> = {
  logic: 'RACIOCÍNIO LÓGICO',
  behavioral: 'PERFIL COMPORTAMENTAL',
  affinity: 'AFINIDADE DE ÁREA',
};

// ... existing code ...

function drawQuestionCard(
  doc: jsPDF,
  question: Question,
  answer: Answer,
  startY: number,
  pageW: number,
  pageH: number,
  margin: number,
  checkPageBreak: (h: number) => boolean
): number {
  const contentW = pageW - margin * 2;
  let cursorY = startY;

  // 1. Calculate height needed
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(question.title, contentW);
  const titleHeight = titleLines.length * 6;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(question.description || '', contentW);
  const descHeight = descLines.length * 4;

  // Options height calculation
  let optionsHeight = 0;
  const options = question.options || [];
  const renderedOptions: {
    lines: string | string[];
    height: number;
    id: string;
  }[] = [];

  if (options.length > 0) {
    options.forEach((opt: QuestionOption) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      // 30px for letter box, 10px padding
      const textWidth = contentW - 50;
      const lines = doc.splitTextToSize(opt.text, textWidth);
      const h = Math.max(12, lines.length * 4 + 8); // Min height 12mm
      renderedOptions.push({ lines, height: h, id: opt.id });
      optionsHeight += h + 4; // 4mm gap
    });
  } else if (question.steps) {
    // Ordering steps
    question.steps.forEach(() => {
      optionsHeight += 12; // Fixed height approx
    });
  }

  const totalHeight =
    15 + titleHeight + 5 + descHeight + 10 + optionsHeight + 10;

  // 2. Check Page Break
  if (checkPageBreak(totalHeight)) {
    cursorY = 20; // Reset to top margin if new page
  }

  // 3. Draw Content

  // Category Pill
  const catColor = CATEGORY_COLORS[question.category] || COLORS.text;
  const catLabel =
    CATEGORY_LABELS[question.category] || question.category.toUpperCase();

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  const badgeW = doc.getTextWidth(catLabel) + 6;

  setFillColor(doc, catColor);
  doc.roundedRect(margin, cursorY, badgeW, 6, 3, 3, 'F');

  setColor(doc, '#FFFFFF');
  doc.text(catLabel, margin + 3, cursorY + 4.2);

  cursorY += 10;

  // Title
  setColor(doc, COLORS.textBright);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(titleLines, margin, cursorY);
  cursorY += titleHeight + 2;

  // Description
  setColor(doc, COLORS.text);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(descLines, margin, cursorY);
  cursorY += descHeight + 8;

  // Options
  if (options.length > 0) {
    renderedOptions.forEach((opt, idx) => {
      const isSelected = answer.selectedOptionId === opt.id;
      const letter = String.fromCharCode(65 + idx); // A, B, C...

      // Card Background
      if (isSelected) {
        setDrawColor(doc, COLORS.primary);
        doc.setLineWidth(0.5);
        setFillColor(doc, COLORS.surface); // Keep dark background
      } else {
        setDrawColor(doc, COLORS.border);
        doc.setLineWidth(0.2);
        setFillColor(doc, COLORS.surface);
      }

      // Draw box
      doc.roundedRect(margin, cursorY, contentW, opt.height, 2, 2, 'FD');

      // Letter Box
      const letterBoxSize = 8;
      const letterBoxX = margin + 4;
      const letterBoxY = cursorY + (opt.height - letterBoxSize) / 2;

      if (isSelected) {
        setFillColor(doc, COLORS.primary);
        doc.roundedRect(
          letterBoxX,
          letterBoxY,
          letterBoxSize,
          letterBoxSize,
          1,
          1,
          'F'
        );
        setColor(doc, '#000000'); // Black text on green
        doc.setFont('helvetica', 'bold');
      } else {
        setFillColor(doc, '#30363D'); // Dark grey
        doc.roundedRect(
          letterBoxX,
          letterBoxY,
          letterBoxSize,
          letterBoxSize,
          1,
          1,
          'F'
        );
        setColor(doc, COLORS.text);
        doc.setFont('helvetica', 'normal');
      }

      doc.setFontSize(9);
      doc.text(letter, letterBoxX + 2.5, letterBoxY + 5.5);

      // Text
      if (isSelected) {
        setColor(doc, COLORS.textBright);
      } else {
        setColor(doc, COLORS.text);
      }
      doc.setFontSize(10);
      doc.text(opt.lines, margin + 18, cursorY + 5); // Align text

      cursorY += opt.height + 4;
    });
  } else if (question.steps && answer.orderedStepIds) {
    // Ordering Logic (Simplified for now, just list them)
    answer.orderedStepIds.forEach((stepId: string, idx: number) => {
      const step = question.steps!.find((s: OrderingStep) => s.id === stepId);
      if (!step) return;

      // const isCorrect = step.correctPosition === idx; // Simplification

      setDrawColor(doc, COLORS.border);
      doc.setLineWidth(0.2);
      setFillColor(doc, COLORS.surface);

      const h = 10;
      doc.roundedRect(margin, cursorY, contentW, h, 2, 2, 'FD');

      // Number
      setFillColor(doc, COLORS.primary);
      // Logic for ordering is complex visually, let's keep it simple: List with numbers
      // Maybe highlighted if correct? The prompt didn't specify ordering details, assuming like multiple choice

      setColor(doc, COLORS.text);
      doc.setFontSize(10);
      doc.text(`${idx + 1}. ${step.text}`, margin + 5, cursorY + 6.5);

      cursorY += h + 3;
    });
  }

  return cursorY + 5; // Return next Y with padding
}

export function generatePDFBuffer(result: TestResult): Buffer {
  // ...
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pageW - margin * 2;
  const footerH = 20;

  let cursorY = 20;

  // Helper to check for page break
  function checkPageBreak(heightNeeded: number) {
    if (cursorY + heightNeeded > pageH - margin - footerH) {
      drawFooter();
      doc.addPage();
      drawBackground(doc);
      // Re-draw top accent
      setFillColor(doc, COLORS.primary);
      doc.rect(0, 0, pageW, 3, 'F');
      cursorY = 20;
      return true;
    }
    return false;
  }

  function drawFooter() {
    setColor(doc, COLORS.text);
    doc.setFontSize(7);
    doc.text(
      'Masterclass Test-Drive Da Carreira Tech — Venicios Ribeiro',
      pageW / 2,
      pageH - 10,
      { align: 'center' }
    );
  }

  // ═══════ PAGE 1: COVER ═══════
  drawBackground(doc);
  setFillColor(doc, COLORS.primary);
  doc.rect(0, 0, pageW, 3, 'F');

  cursorY = 50;
  setColor(doc, COLORS.primary);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PROTOCOLO DE APTIDÃO', pageW / 2, cursorY, { align: 'center' });

  cursorY += 15;
  setColor(doc, COLORS.textBright);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório de', pageW / 2, cursorY, { align: 'center' });
  cursorY += 12;
  doc.text('Aptidão Tech', pageW / 2, cursorY, { align: 'center' });

  cursorY += 15;
  setDrawColor(doc, COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(margin + 40, cursorY, pageW - margin - 40, cursorY);

  cursorY += 15;
  setColor(doc, COLORS.text);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  // Ensure text is sanitized for PDF
  doc.text(result.userName, pageW / 2, cursorY, { align: 'center' });
  cursorY += 7;
  doc.setFontSize(9);
  doc.text(result.userEmail, pageW / 2, cursorY, { align: 'center' });
  cursorY += 5;
  setColor(doc, COLORS.text);
  doc.setFontSize(7);
  doc.text(`ID: ${result.id}`, pageW / 2, cursorY, { align: 'center' });

  cursorY += 20;

  // Profile Box
  const profileBoxHeight = 40;
  setFillColor(doc, COLORS.surface);
  doc.roundedRect(
    margin + 30,
    cursorY,
    contentW - 60,
    profileBoxHeight,
    5,
    5,
    'F'
  );
  setDrawColor(doc, COLORS.primary);
  doc.setLineWidth(0.5);
  doc.roundedRect(
    margin + 30,
    cursorY,
    contentW - 60,
    profileBoxHeight,
    5,
    5,
    'S'
  );

  let boxTextY = cursorY + 12;

  doc.setFontSize(10);
  setColor(doc, COLORS.primary);
  doc.setFont('helvetica', 'normal');
  doc.text('SEU PERFIL DOMINANTE', pageW / 2, boxTextY, { align: 'center' });

  boxTextY += 10;
  setColor(doc, COLORS.textBright);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(result.profile.label, pageW / 2, boxTextY, { align: 'center' });

  cursorY += profileBoxHeight + 15;

  // ─── INSERTED SECTIONS FROM PAGE 2 ───

  // Description (Analysis)
  setColor(doc, COLORS.text);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(result.profile.description, contentW);
  const descHeight = descLines.length * 4.5;

  checkPageBreak(30 + descHeight);

  setColor(doc, COLORS.primary);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('ANÁLISE DO PERFIL', margin, cursorY);
  cursorY += 8;

  setColor(doc, COLORS.text);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(descLines, margin, cursorY);
  cursorY += descHeight + 10;

  // Recommendation
  doc.setFontSize(8);
  const recLines = doc.splitTextToSize(
    result.profile.recommendation,
    contentW - 10
  );
  const recTextHeight = recLines.length * 4;
  const boxHeight = Math.max(25, recTextHeight + 15);

  checkPageBreak(boxHeight + 10);

  setFillColor(doc, COLORS.surface);
  doc.roundedRect(margin, cursorY, contentW, boxHeight, 3, 3, 'F');
  setDrawColor(doc, COLORS.primary);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, cursorY, contentW, boxHeight, 3, 3, 'S');

  const recStartY = cursorY;
  cursorY += 8;
  setColor(doc, COLORS.primary);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('PRÓXIMOS PASSOS RECOMENDADOS', margin + 5, cursorY);

  cursorY += 6;
  setColor(doc, COLORS.text);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(recLines, margin + 5, cursorY);

  cursorY = recStartY + boxHeight + 15;

  // ─────────────────────────────────────

  setColor(doc, COLORS.text);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const dateStr = new Date(result.timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Position date at bottom of page if possible, else after content
  const bottomDateY = pageH - 30;
  if (cursorY < bottomDateY) {
    cursorY = bottomDateY;
  } else {
    checkPageBreak(10);
  }

  doc.text(`Gerado em ${dateStr}`, pageW / 2, cursorY, { align: 'center' });

  drawFooter();

  // ═══════ PAGE 2: ANALYSIS ═══════
  doc.addPage();
  drawBackground(doc);
  setFillColor(doc, COLORS.primary);
  doc.rect(0, 0, pageW, 3, 'F');
  cursorY = 20;

  // Scores
  checkPageBreak(50);
  setColor(doc, COLORS.primary);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('AFINIDADE POR ÁREA', margin, cursorY);
  cursorY += 10;

  const areas = result.scores.areasPercent;
  for (const [key, value] of Object.entries(areas) as [string, number][]) {
    checkPageBreak(15);
    setColor(doc, COLORS.text);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(AREA_LABELS[key] || key, margin, cursorY);

    setColor(doc, AREA_COLORS[key] || COLORS.primary);
    doc.setFont('helvetica', 'bold');
    doc.text(`${value}%`, pageW - margin, cursorY, { align: 'right' });

    cursorY += 3;
    drawBar(
      doc,
      margin,
      cursorY,
      contentW,
      value,
      AREA_COLORS[key] || COLORS.primary
    );
    cursorY += 10;

    // Explanation text
    if (result.profile.areaExplanations) {
      const explanation =
        result.profile.areaExplanations[
          key as keyof typeof result.profile.areaExplanations
        ];
      if (explanation) {
        setColor(doc, COLORS.text);
        doc.setFontSize(8); // Slightly larger for readability
        doc.setFont('helvetica', 'italic');

        const expLines = doc.splitTextToSize(explanation, contentW);
        // Check if explanation fits, otherwise push whole block to next page?
        // Actually the bar is already drawn. We should check BEFORE drawing bar if we wanted perfect block cohesion.
        // But let's check just for the text now.
        checkPageBreak(expLines.length * 4 + 5);

        doc.text(expLines, margin, cursorY);
        cursorY += expLines.length * 4 + 8; // spacing after text
      }
    } else {
      cursorY += 8;
    }
  }

  // Explanatory text for independent percentages
  // ... (rest of function) ...

  // Section: Behavioral
  cursorY += 5;
  checkPageBreak(50);
  setColor(doc, COLORS.primary);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PERFIL COMPORTAMENTAL', margin, cursorY);

  cursorY += 10;
  const behavioral = result.scores.behavioralPercent;
  for (const [key, value] of Object.entries(behavioral) as [string, number][]) {
    // Estimate height: header + bar + explanation
    // We need to look ahead to see if the whole block fits
    let explanationHeight = 0;
    let expLines: string[] = [];

    if (result.profile.behavioralExplanations) {
      const explanation =
        result.profile.behavioralExplanations[
          key as keyof typeof result.profile.behavioralExplanations
        ];
      if (explanation) {
        doc.setFontSize(8);
        expLines = doc.splitTextToSize(explanation, contentW);
        explanationHeight = expLines.length * 4;
      }
    }

    const totalBlockHeight = 25 + explanationHeight;
    checkPageBreak(totalBlockHeight);

    setColor(doc, COLORS.text);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(BEHAVIORAL_LABELS[key] || key, margin, cursorY);

    setColor(doc, COLORS.primary);
    doc.setFont('helvetica', 'bold');
    doc.text(`${value}%`, pageW - margin, cursorY, { align: 'right' });

    cursorY += 3;
    drawBar(doc, margin, cursorY, contentW, value, COLORS.primary);
    cursorY += 10;

    if (expLines.length > 0) {
      setColor(doc, COLORS.text);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text(expLines, margin, cursorY);
      cursorY += explanationHeight + 8;
    } else {
      cursorY += 8;
    }
  }

  // Strengths
  const strengthHeight = result.profile.strengths.length * 6;
  checkPageBreak(20 + strengthHeight);

  setColor(doc, COLORS.primary);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PONTOS FORTES', margin, cursorY);
  cursorY += 8;

  setColor(doc, COLORS.text);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  result.profile.strengths.forEach((s) => {
    doc.text(`✓  ${s}`, margin + 2, cursorY);
    cursorY += 6;
  });

  cursorY += 10;

  drawFooter();

  // ═══════ PAGE 3: ANSWERS ═══════
  doc.addPage();
  drawBackground(doc);
  setFillColor(doc, COLORS.primary);
  doc.rect(0, 0, pageW, 3, 'F');
  cursorY = 20;

  checkPageBreak(20);
  setColor(doc, COLORS.primary);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('DETALHAMENTO DAS RESPOSTAS', margin, cursorY);
  cursorY += 10;

  for (const answer of result.answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    cursorY = drawQuestionCard(
      doc,
      question,
      answer,
      cursorY,
      pageW,
      pageH,
      margin,
      checkPageBreak
    );
  }

  drawFooter();

  // Return buffer instead of saving file
  return Buffer.from(doc.output('arraybuffer'));
}
