import jsPDF from 'jspdf';
import { TestResult } from './testTypes';
import { questions } from './questions';

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

function drawBar(doc: jsPDF, x: number, y: number, width: number, percent: number, color: string) {
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

export function generatePDF(result: TestResult) {
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

    cursorY += 25;
    setFillColor(doc, COLORS.surface);
    doc.roundedRect(margin + 30, cursorY, contentW - 60, 40, 5, 5, 'F');
    setDrawColor(doc, COLORS.primary);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin + 30, cursorY, contentW - 60, 40, 5, 5, 'S');

    const boxCenterY = cursorY + 20;
    // We'll just manually place text inside relative to box top
    let boxTextY = cursorY + 12;

    doc.setFontSize(10);
    setColor(doc, COLORS.primary);
    doc.setFont('helvetica', 'normal');
    doc.text('SEU PERFIL DOMINANTE', pageW / 2, boxTextY, { align: 'center' });

    boxTextY += 10;
    setColor(doc, COLORS.textBright);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    // Emojis might not render well in standard fonts — consider stripping or using specific font.
    // Standard helvetica usually ignores emoji or shows weird chars.
    // For now, we try showing it. If it fails, we might need to remove it.
    doc.text(result.profile.label, pageW / 2, boxTextY, { align: 'center' });

    cursorY += 40 + 30; // box height + spacing
    setColor(doc, COLORS.text);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const dateStr = new Date(result.timestamp).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
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
        drawBar(doc, margin, cursorY, contentW, value, AREA_COLORS[key] || COLORS.primary);
        cursorY += 14;
    }

    // Explanatory text for independent percentages
    cursorY -= 5;
    setColor(doc, COLORS.text);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.text('* As porcentagens são independentes e medem sua afinidade com cada área isoladamente. Não somam 100%.', margin, cursorY);
    cursorY += 10;

    cursorY += 5;
    checkPageBreak(50);
    setColor(doc, COLORS.primary);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('PERFIL COMPORTAMENTAL', margin, cursorY);
    cursorY += 10;

    const behavioral = result.scores.behavioralPercent;
    for (const [key, value] of Object.entries(behavioral) as [string, number][]) {
        checkPageBreak(15);
        setColor(doc, COLORS.text);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(BEHAVIORAL_LABELS[key] || key, margin, cursorY);

        setColor(doc, COLORS.primary);
        doc.setFont('helvetica', 'bold');
        doc.text(`${value}%`, pageW - margin, cursorY, { align: 'right' });

        cursorY += 3;
        drawBar(doc, margin, cursorY, contentW, value, COLORS.primary);
        cursorY += 14;
    }

    // Description
    cursorY += 5;
    setColor(doc, COLORS.text);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    // Split text
    const descLines = doc.splitTextToSize(result.profile.description, contentW);
    const descHeight = descLines.length * 4.5; // Approx height

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
    cursorY += descHeight + 8;

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

    // Recommendation
    cursorY += 8;
    doc.setFontSize(8);
    const recLines = doc.splitTextToSize(result.profile.recommendation, contentW - 10);
    // Box height must accommodate text + padding
    const recTextHeight = recLines.length * 4;
    const boxHeight = Math.max(30, recTextHeight + 20);

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

    cursorY = recStartY + boxHeight + 10;

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

        // Calculate heights
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        const titleLines = doc.splitTextToSize(question.title, contentW);
        const titleHeight = titleLines.length * 4.5; // slightly more line height

        let ansHeight = 0;
        let ansLines: string | string[] = [];

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        if (answer.selectedOptionId && question.options) {
            const opt = question.options.find((o) => o.id === answer.selectedOptionId);
            if (opt) {
                ansLines = doc.splitTextToSize(opt.text, contentW - 8);
                ansHeight = ansLines.length * 4;
            }
        } else if (answer.orderedStepIds && question.steps) {
            ansHeight = answer.orderedStepIds.length * 5;
        }

        const blockHeight = titleHeight + ansHeight + 15; // padding

        checkPageBreak(blockHeight);

        // Title
        setColor(doc, COLORS.textBright);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(titleLines, margin, cursorY);
        cursorY += titleHeight;

        // Content
        setColor(doc, COLORS.text);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        if (answer.selectedOptionId) {
            setColor(doc, COLORS.primary);
            doc.text('>', margin, cursorY);
            setColor(doc, COLORS.text);
            doc.text(ansLines, margin + 6, cursorY);
            cursorY += ansHeight;
        } else if (answer.orderedStepIds && question.steps) {
            answer.orderedStepIds.forEach((stepId, idx) => {
                const step = question.steps!.find((s) => s.id === stepId);
                if (step) {
                    setColor(doc, COLORS.primary);
                    doc.text(`${idx + 1}.`, margin, cursorY);
                    setColor(doc, COLORS.text);
                    doc.text(step.text, margin + 8, cursorY);
                    cursorY += 5;
                }
            });
        }

        cursorY += 5;
        setDrawColor(doc, COLORS.border);
        doc.setLineWidth(0.1);
        doc.line(margin, cursorY, pageW - margin, cursorY);
        cursorY += 6;
    }

    drawFooter();

    const fileName = `relatorio-aptidao-${result.userName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    doc.save(fileName);
}
