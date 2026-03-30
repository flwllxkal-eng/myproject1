document.addEventListener('DOMContentLoaded', () => {
    // --- Advertise Modal Logic --- //
    const advertiseButton = document.getElementById('advertise-button');

    if (advertiseButton) {
        advertiseButton.addEventListener('click', () => {
            createAndShowModal();
        });
    }

    function createAndShowModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-container';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close-btn">&times;</button>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const modalStyle = document.createElement('style');
        modalStyle.innerHTML = `
            .modal-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
            .modal-content { background: white; border-radius: 12px; padding: 30px; width: 90%; max-width: 650px; position: relative; transform: scale(0.9); transition: transform 0.3s ease; }
            .modal-close-btn { position: absolute; top: 15px; right: 15px; background: #f1f1f1; color: #555; border: none; border-radius: 50%; width: 30px; height: 30px; font-size: 1.5rem; line-height: 30px; text-align: center; cursor: pointer; transition: background 0.2s, color 0.2s; }
            .modal-close-btn:hover { background: #e0e0e0; color: #000; }
        `;
        document.head.appendChild(modalStyle);

        // The advertise.html is assumed to be in the same directory
        fetch('advertise.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('advertise.html not found');
                }
                return response.text();
            })
            .then(html => { 
                modal.querySelector('.modal-body').innerHTML = html; 
            })
            .catch(error => {
                console.error('Error fetching advertise.html:', error);
                modal.querySelector('.modal-body').innerHTML = '<p>Error loading content. Please try again later.</p>';
            });

        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);

        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            setTimeout(() => { modal.remove(); modalStyle.remove(); }, 300);
        };

        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }
});
