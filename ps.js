document.addEventListener("DOMContentLoaded", function() {
    // Check if the correct password is already stored in session storage
    if (sessionStorage.getItem('authenticated') !== 'true') {
        // Create the modal dialog
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 9999;

        // Create the password input
        const input = document.createElement('input');
        input.type = 'password';
        input.placeholder = 'Enter password';
        input.style.padding = '10px';
        input.style.marginBottom = '10px';
        input.style.fontSize = '16px';
        input.style.border = 'none';
        input.style.borderRadius = '5px';

        // Create the submit button
        const button = document.createElement('button');
        button.textContent = 'Submit';
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = '#fff';

        // Add event listener to the button
        button.addEventListener('click', function() {
            const password = input.value;
            const correctPassword = '123'; // Set your password here

            if (password === correctPassword) {
                sessionStorage.setItem('authenticated', 'true');
                alert('Correct password, enjoy!');
                document.body.removeChild(modal);
            } else {
                alert('Incorrect password. You do not have access to this content.');
            }
        });

        // Append the input and button to the modal
        modal.appendChild(input);
        modal.appendChild(button);

        // Append the modal to the body
        document.body.appendChild(modal);
    }
});
