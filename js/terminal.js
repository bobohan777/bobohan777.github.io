document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal-container');
    const terminalBody = document.getElementById('terminal-body');
    const inputField = document.getElementById('terminal-input');
    const outputArea = document.getElementById('terminal-output');
    const toggleBtn = document.getElementById('terminal-toggle');
    const closeBtn = document.getElementById('terminal-close');

    // Command History
    let history = [];
    let historyIndex = -1;

    // Commands
    const commands = {
        help: "Available commands: <br> - <span class='cmd'>whoami</span>: About Bo Bo Han<br> - <span class='cmd'>skills</span>: List technical skills<br> - <span class='cmd'>contact</span>: Contact information<br> - <span class='cmd'>socials</span>: Social media links<br> - <span class='cmd'>clear</span>: Clear terminal<br> - <span class='cmd'>date</span>: Show current date/time",
        whoami: "I am Bo Bo Han, a Cloud & System Engineer with 10+ years of experience in SRE, AWS, and Kubernetes. Currently building scalable platforms at Trivyst.",
        skills: "CORE: AWS, Kubernetes, Docker, Linux (RedHat/Ubuntu)<br>IaC: Terraform, Ansible<br>CI/CD: GitHub Actions, Jenkins<br>MONITORING: Prometheus, Grafana, CloudWatch",
        contact: "Email: bobohan1989@gmail.com<br>Phone: (+66) 981-537-287",
        socials: "<a href='https://www.linkedin.com/in/bbhan/' target='_blank'>LinkedIn</a> | <a href='https://github.com/bobohan777' target='_blank'>GitHub</a>",
        date: () => new Date().toLocaleString(),
        clear: () => {
            outputArea.innerHTML = '';
            return '';
        }
    };

    // Toggle Terminal (Minimize/Maximize)
    toggleBtn.addEventListener('click', () => {
        terminal.classList.toggle('minimized');
        if (!terminal.classList.contains('minimized')) {
            inputField.focus();
        }
    });

    // Close Terminal (Hide completely)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            terminal.style.display = 'none';
        });
    }

    // Handle Input
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = inputField.value.trim();
            if (input) {
                // Add to history
                history.push(input);
                historyIndex = history.length;

                // Create command line
                addToOutput(`<div class="input-line"><span class="prompt">guest@bobohan:~$</span> ${input}</div>`);

                // Process command
                processCommand(input.toLowerCase());
            }
            inputField.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                inputField.value = history[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                inputField.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                inputField.value = '';
            }
            e.preventDefault();
        }
    });

    function processCommand(cmd) {
        const response = commands[cmd];
        if (response) {
            if (typeof response === 'function') {
                const result = response();
                if (result) addToOutput(result);
            } else {
                addToOutput(response);
            }
        } else {
            addToOutput(`Command not found: ${cmd}. Type <span class='cmd'>help</span> for list.`);
        }
        // Auto scroll
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function addToOutput(html) {
        const div = document.createElement('div');
        div.className = 'output-line';
        div.innerHTML = html;
        outputArea.appendChild(div);
    }

    // Initial Greeting
    setTimeout(() => {
        addToOutput("Welcome to Bo Bo Han's Terminal v1.0.0");
        addToOutput("Type <span class='cmd'>help</span> to see available commands.");
    }, 500);
});
