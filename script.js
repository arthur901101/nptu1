// script.js
/**
 * Triggers the html2pdf library to convert the #pdf-content div exactly as it looks natively,
 * into a downloadable PDF document.
 */
function downloadPDF() {
    const element = document.getElementById('pdf-content');
    const button = document.getElementById('downloadPdfBtn');
    
    // Provide immediate visual feedback
    const originalText = button.innerText;
    button.innerText = '正在產生 PDF...';
    button.disabled = true;

    // Define PDF export options
    const opt = {
        margin:       0,
        filename:     '多媒體基礎建置與應用_文獻.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF:        { unit: 'px', format: [element.offsetWidth, element.offsetHeight], orientation: 'portrait' }
    };

    // Note: We use dynamic pixel formatting based on the offsetWidth and offsetHeight of the element
    // so it looks perfectly identical to the webpage display block.

    // Generate and Download
    html2pdf().set(opt).from(element).save().then(() => {
        button.innerText = '下載成功！';
        setTimeout(() => {
            button.innerText = originalText;
            button.disabled = false;
        }, 2000);
    }).catch(error => {
        console.error('PDF Generation failed:', error);
        button.innerText = '產生失敗，請重試。';
        setTimeout(() => {
            button.innerText = originalText;
            button.disabled = false;
        }, 3000);
    });
}
