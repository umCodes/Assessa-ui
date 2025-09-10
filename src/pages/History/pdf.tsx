import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { FIB, MCQ, Quiz, SAQ, TF } from '../../types/quiz';
import Logo from '../../assets/Assessa-Logo.png';

// Extend jsPDF type for autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => void;
  }
}

export const generateQuizPDF = (quiz: Quiz) => {
  const doc = new jsPDF();
  let yPosition = 15;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;

type Colors = {
    primary: [25, 50, 85],        // Deep navy blue
    secondary: [70, 130, 180],    // Steel blue
    accent: [220, 20, 60],        // Crimson
    text: [33, 37, 41],           // Dark gray
    lightText: [73, 80, 87],      // Medium gray
    success: [25, 135, 84],       // Forest green
    background: [248, 249, 250],  // Light gray
    answerBg: [232, 244, 235]     // Light green
  };

  // Academic color scheme
  const colors: Colors = {
    primary: [25, 50, 85],        // Deep navy blue
    secondary: [70, 130, 180],    // Steel blue
    accent: [220, 20, 60],        // Crimson
    text: [33, 37, 41],           // Dark gray
    lightText: [73, 80, 87],      // Medium gray
    success: [25, 135, 84],       // Forest green
    background: [248, 249, 250],  // Light gray
    answerBg: [232, 244, 235]     // Light green
  };

  // Helper function to calculate optimal title font size
  const calculateTitleFontSize = (text: string, maxWidth: number): number => {
    const maxFontSize = 20;
    const minFontSize = 12;
    
    // Start with maximum font size and work down
    for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize--) {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', 'bold');
      const textWidth = doc.getTextWidth(text);
      
      if (textWidth <= maxWidth) {
        return fontSize;
      }
    }
    
    return minFontSize;
  };

  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight: number): void => {
    if (yPosition + requiredHeight > pageHeight - 25) {
      doc.addPage();
      yPosition = 15;
      addHeader();
    }
  };

  // Header function for consistency across pages
  const addHeader = (): void => {
    // // Header line
    // doc.setDrawColor(...colors.primary);
    // doc.setLineWidth(0.8);
    // doc.line(margin, 12, doc.internal.pageSize.width - margin, 12);
    
    // Brand text
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.text);
    
    // Add logo
      doc.addImage(Logo, 'PNG', doc.internal.pageSize.width - 35, 5, 20, 20);
    yPosition += 20;
  };

  // Add initial header
  addHeader();

  // Main Title Section with dynamic sizing
  doc.setTextColor(...colors.primary);
  doc.setFont('helvetica', 'bold');
  
  const titleText = quiz.topic.toUpperCase();
  const availableWidth = doc.internal.pageSize.width - 2 * margin; // Available width for title
  const optimalFontSize = calculateTitleFontSize(titleText, availableWidth);
  
  doc.setFontSize(optimalFontSize);
  const titleWidth = doc.getTextWidth(titleText);
  const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
  
  // If title is still too long even at minimum size, split into multiple lines
  if (titleWidth > availableWidth) {
    const splitTitle = doc.splitTextToSize(titleText, availableWidth);
    const titleHeight = splitTitle.length * (optimalFontSize * 0.35); // Approximate line height
    const startY = yPosition;
    
    splitTitle.forEach((line: string, index: number) => {
      const lineWidth = doc.getTextWidth(line);
      const lineX = (doc.internal.pageSize.width - lineWidth) / 2;
      doc.text(line, lineX, startY + (index * optimalFontSize * 0.35));
    });
    
    yPosition += titleHeight + 8;
  } else {
    // Single line title
    doc.text(titleText, titleX, yPosition);
    yPosition += optimalFontSize * 0.5 + 8; // Adjust spacing based on font size
  }
  
  
  // Quiz metadata in academic format
  yPosition += 10;
  doc.setTextColor(...colors.lightText);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const metadata = [
    `Difficulty Level: ${quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}`,
    `Question Types: ${quiz.question_types.join(', ')}`,
    `Total Questions: ${quiz.questions.length}`
  ];
  
  metadata.forEach(item => {
    // const metaX = (doc.internal.pageSize.width - doc.getTextWidth(item)) / 2;
    doc.text(item, margin + 3, yPosition);
    yPosition += 6;
  });

  yPosition += 15;

  // Filter questions by type
  const TF = quiz.questions.filter((q): q is TF => q.type === "TF");
  const MCQ = quiz.questions.filter((q): q is MCQ => q.type === "MCQ");
  const SAQ = quiz.questions.filter((q): q is SAQ => q.type === "SAQ");
  const FIB = quiz.questions.filter((q): q is FIB => q.type === "FIB");

  // Function to render question sections with academic styling
  const renderSection = (
    questions: (MCQ | TF | SAQ | FIB)[], 
    title: string, 
    showOptions: boolean = false
  ): void => {
    if (questions.length === 0) return;

    checkPageBreak(25);
    
    // Academic section heading with Roman numerals for major sections
    const romanNumerals = ['I', 'II', 'III', 'IV'];
    const sectionIndex = [MCQ, TF, SAQ, FIB].findIndex(arr => arr === questions);
    const sectionNumber = sectionIndex >= 0 ? romanNumerals[sectionIndex] : '';
    
    doc.setTextColor(...colors.primary);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const sectionTitle = `${sectionNumber}. ${title.toUpperCase()}`;
    doc.text(sectionTitle, margin, yPosition);
    
    // Professional underline
    doc.setDrawColor(...colors.secondary);
    doc.setLineWidth(0.3);
    doc.line(margin, yPosition + 2, margin + doc.getTextWidth(sectionTitle), yPosition + 2);
    
    yPosition += 12;

    questions.forEach((q, index) => {
      const optionsCount = (q.type === 'MCQ' && showOptions) ? q.options.length : 0;
      const questionHeight = showOptions ? 20 + optionsCount * 6 : 15;
      checkPageBreak(questionHeight);

      // Question with academic numbering
      doc.setTextColor(...colors.text);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      
      const questionNum = `${index + 1}.`;
      doc.text(questionNum, margin + 3, yPosition);
      
      // Split long questions with proper academic spacing
      const questionText = q.question;
      const splitText = doc.splitTextToSize(questionText, doc.internal.pageSize.width - 45);
      doc.setFont('helvetica', 'normal');
      doc.text(splitText, margin + 15, yPosition);
      
      yPosition += splitText.length * 4.5 + 3;

      // Render options for MCQ with academic lettering
      if (showOptions && q.type === 'MCQ') {
        doc.setTextColor(...colors.lightText);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        q.options.forEach((opt, optIndex) => {
          const optionLetter = `(${String.fromCharCode(97 + optIndex)})`;
          doc.setFont('helvetica', 'bold');
          doc.text(optionLetter, margin + 20, yPosition);
          doc.setFont('helvetica', 'normal');
          
          const optionText = doc.splitTextToSize(opt.answer, doc.internal.pageSize.width - 65);
          doc.text(optionText, margin + 32, yPosition);
          yPosition += optionText.length * 4 + 2;
        });
        yPosition += 2;
      } else {
        yPosition += 6;
      }
    });

    yPosition += 8;
  };

  // Render all question sections
  renderSection(MCQ, 'Multiple Choice Questions', true);
  renderSection(TF, 'True or False Questions', false);
  renderSection(SAQ, 'Short Answer Questions', false);
  renderSection(FIB, 'Fill in the Blanks Questions', false);

  // Academic Answer Section
  checkPageBreak(35);
  
  // New page for answers if needed
  if (yPosition > pageHeight - 100) {
    doc.addPage();
    yPosition = 15;
    addHeader();
  }

  // Answer section header with academic styling
  // doc.setFillColor(...colors.background);
  // doc.rect(margin - 3, yPosition - 8, doc.internal.pageSize.width - 2 * margin + 6, 20, 'F');
  
  // Academic border
  // doc.setDrawColor(...colors.primary);
  // doc.setLineWidth(0.5);
  // doc.rect(margin - 3, yPosition - 8, doc.internal.pageSize.width - 2 * margin + 6, 20);
  
  doc.setTextColor(...colors.success);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const answerTitle = 'ANSWER KEY';
  const answerTitleX = (doc.internal.pageSize.width - doc.getTextWidth(answerTitle)) / 2;
  doc.text(answerTitle, answerTitleX, yPosition + 2);
  
  yPosition += 25;

  // Function to render answers with academic formatting
  const renderAnswers = (
    questions: (MCQ | TF | SAQ | FIB)[], 
    title: string
  ): void => {
    if (questions.length === 0) return;

    checkPageBreak(15);
    
    doc.setTextColor(...colors.primary);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPosition);
    
    // Subtle underline
    doc.setDrawColor(...colors.secondary);
    doc.setLineWidth(0.2);
    doc.line(margin, yPosition + 1, margin + doc.getTextWidth(title), yPosition + 1);
    
    yPosition += 10;

    questions.forEach((q, index) => {
      checkPageBreak(20);
      
      // Question reference
      doc.setTextColor(...colors.text);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      const questionNum = `${index + 1}.`;
      doc.text(questionNum, margin + 3, yPosition);
      
      // Truncated question for reference
      const questionRef = q.question.length > 60 
        ? q.question.substring(0, 60) + '...'
        : q.question;
      doc.setFont('helvetica', 'normal');
      doc.text(questionRef, margin + 12, yPosition);
      yPosition += 6;

      // Answer with academic styling
      doc.setTextColor(...colors.success);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      
      let answerText = '';
      
      if (q.type === 'MCQ') {
        const correctOption = q.options.find(opt => opt.correct);
        if (correctOption) {
          const correctIndex = q.options.findIndex(opt => opt.correct);
          answerText = `Answer: (${String.fromCharCode(97 + correctIndex)}) ${correctOption.answer}`;
        }
      } else if (q.type === 'TF') {
        const correctOption = q.options.find(opt => opt.correct);
        answerText = `Answer: ${correctOption?.answer ? 'True' : 'False'}`;
      } else if (q.type === 'SAQ' || q.type === 'FIB') {
        answerText = `Answer: ${q.answers}`;
      }
      
      // Academic answer box
      const answerLines = doc.splitTextToSize(answerText, doc.internal.pageSize.width - 60);
      // doc.setFillColor(...colors.answerBg);
      // doc.rect(margin + 10, yPosition - 3, doc.internal.pageSize.width - 2 * margin - 20, answerLines.length * 4 + 4, 'F');
      
      // // Subtle border for answer
      // doc.setDrawColor(...colors.success);
      // doc.setLineWidth(0.1);
      // doc.rect(margin + 10, yPosition - 3, doc.internal.pageSize.width - 2 * margin - 20, answerLines.length * 4 + 4);
      
      doc.text(answerLines, margin + 12, yPosition);
      yPosition += answerLines.length * 4 + 8;
    });

    yPosition += 6;
  };

  // Render all answer sections
  renderAnswers(MCQ, 'Multiple Choice Answers');
  renderAnswers(TF, 'True/False Answers');
  renderAnswers(SAQ, 'Short Answer Solutions');
  renderAnswers(FIB, 'Fill in the Blanks Solutions');

  // Academic footer for all pages
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer line
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.3);
    doc.line(margin, doc.internal.pageSize.height - 15, doc.internal.pageSize.width - margin, doc.internal.pageSize.height - 15);
    
    // Academic footer text
    doc.setTextColor(...colors.lightText);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Generated by Assessa',
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 8,
      { align: 'center' }
    );
    
    // Page numbering
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - margin,
      doc.internal.pageSize.height - 8,
      { align: 'right' }
    );
    
    // Date stamp
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(currentDate, margin, doc.internal.pageSize.height - 8);
  }

  doc.save(quiz.topic);
};