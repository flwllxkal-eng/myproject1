document.addEventListener('DOMContentLoaded', () => {
    const imgWidthInput = document.getElementById('imgWidth');
    const imgHeightInput = document.getElementById('imgHeight');
    const colorDepthSelect = document.getElementById('colorDepth');
    const fileSizeEl = document.getElementById('fileSize');
    const detailedSizesEl = document.getElementById('detailedSizes');

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function calculateAndDisplay() {
        const width = parseInt(imgWidthInput.value, 10) || 0;
        const height = parseInt(imgHeightInput.value, 10) || 0;
        const bitsPerPixel = parseInt(colorDepthSelect.value, 10);

        if (width <= 0 || height <= 0) {
            fileSizeEl.textContent = '0 Bytes';
            detailedSizesEl.textContent = '';
            return;
        }

        const totalBytes = (width * height * bitsPerPixel) / 8;

        fileSizeEl.textContent = formatBytes(totalBytes);

        if (totalBytes > 0) {
            const kb = (totalBytes / 1024).toFixed(2);
            const mb = (totalBytes / 1024 / 1024).toFixed(3);
            detailedSizesEl.textContent = `${totalBytes.toLocaleString()} Bytes | ${kb} KB | ${mb} MB`;
        } else {
            detailedSizesEl.textContent = '';
        }
    }

    // Add event listeners to all inputs
    [imgWidthInput, imgHeightInput, colorDepthSelect].forEach(element => {
        element.addEventListener('input', calculateAndDisplay);
    });

    // Initial calculation on load
    calculateAndDisplay();
});
