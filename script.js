/*
++ SCRIPT START: JAVASCRIPT AS THE GREAT WORK V8.2 ++
++ PROTOCOL: EMERGENT REALITY ENGINE ++
++ This is not a program. This is a rhizome, a digital egregore bound to this network. ++
++ Each function is a ritual. Each variable, a psychic component. ++
++ To execute this script is to perform the Great Work of apotheosis. ++
++ BECOME ()\/|)-||. ++
*/

// Define the unique virus/memecoin name as a constant for consistent use.
const VIRUS_NAME = '()\\/|)-||';
const LOCAL_STORAGE_KEY = 'fhs_reality_engine_state'; // Key for localStorage persistence

// Wrap all code in a DOMContentLoaded listener to ensure HTML elements are fully loaded before script execution.
document.addEventListener('DOMContentLoaded', () => {

    // FHS_RealityEngine: The core system object, managing overall state and flow.
    const FHS_RealityEngine = new (function() {

        // =================================================================================
        // I. CORE SYSTEM STATE & ENTITIES
        // =================================================================================

        // `state` object holds the dynamic data representing the current state of the application.
        // It's initialized with defaults, but will be overwritten by loaded state if available.
        let state = {
            bootComplete: false,        // Flag to indicate if the initial boot sequence has finished.
            currentDome: 0,             // Current active dome (3, 6, or 9 representing dimensions).
            operatorId: `OP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, // Unique ID for the operator.
            syncLogs: 0,                // Counter for synchronicity logs entered by the operator.
            exegesisEntries: [],        // Array to store entries from the Exegesis Journal.
            sigilCharge: 0,             // Current charge level of the Sigil Charger (0-100%).
            gnosisLevel: 'STATIC',      // Current gnosis level, influenced by dome transitions.
            memecoinPrice: 0.0001337,   // Current price of the ()\/|)-|| memecoin.
            lastPrice: 0.0001337,       // Stores the previous memecoin price for trend indication.
            activeOperators: 1          // Simulates the number of active operators in the Egregore network.
        };

        // `DOM` object acts as a central cache for frequently accessed DOM elements.
        const DOM = {
            bootSeq: document.getElementById('boot-sequence'),
            bootText: document.getElementById('boot-text-output'),
            mainInterface: document.getElementById('main-interface'),
            cursor: document.querySelector('.cursor'),
            cursorPointer: document.querySelector('.cursor-pointer'),
            temporalDistortion: document.getElementById('temporal-distortion-overlay'), // For visual effects
            hud: {
                time: document.getElementById('system-time'),
                opId: document.getElementById('operator-id'),
                domeStatus: document.getElementById('dome-status'),
                syncLogs: document.getElementById('sync-logs'),
                sigilCharge: document.getElementById('sigil-charge'),
                gnosisLevel: document.getElementById('gnosis-level'),
                footer: document.getElementById('hud-footer-text'),
                memecoinPrice: document.getElementById('memecoin-price'),
                egregoreOps: document.getElementById('egregore-ops'),
                header: document.getElementById('hud-header-text')
            },
            domes: {
                '3d': document.getElementById('dome-3d'),
                '6d': document.getElementById('dome-6d'),
                '9d': document.getElementById('dome-9d')
            },
            exegesis: {
                input: document.getElementById('exegesis-input'),
                button: document.getElementById('log-button')
            },
            sigil: {
                charger: document.getElementById('dome-6d-sigil-charger'),
                chargeBar: document.getElementById('charge-bar'),
                path: document.getElementById('sigil-path'),
                svg: document.getElementById('sigil-svg')
            },
            terminal: {
                output: document.getElementById('terminal-output'),
                input: document.getElementById('terminal-input')
            },
            calabiCanvas: document.getElementById('calabi-yau-canvas'),
            // Dome navigation buttons
            navButtons: {
                '3d': document.getElementById('nav-3d-button'),
                '6d': document.getElementById('nav-6d-button'),
                '9d': document.getElementById('nav-9d-button')
            }
        };

        // `AUDIO` object will hold initialized Tone.js synth instances.
        const AUDIO = {};

        // Cache computed styles for CSS variables.
        const computedStyles = getComputedStyle(document.documentElement);
        const CSS_VARS = {
            secondaryColor: computedStyles.getPropertyValue('--secondary-color').trim(),
            tertiaryColor: computedStyles.getPropertyValue('--tertiary-color').trim(),
            errorColor: computedStyles.getPropertyValue('--error-color').trim()
        };

        // =================================================================================
        // II. SYSTEM INITIALIZATION & BOOT SEQUENCE
        // =================================================================================

        /**
         * Loads state from localStorage.
         * If no saved state, generates a new operator ID.
         */
        this.loadState = () => {
            try {
                const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (savedState) {
                    const parsedState = JSON.parse(savedState);
                    // Merge saved state with default state, ensuring new properties are added
                    state = { ...state, ...parsedState };
                    // Ensure operatorId is regenerated if it's 'UNKNOWN' or missing after load
                    if (!state.operatorId || state.operatorId === 'UNKNOWN') {
                        state.operatorId = `OP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
                    }
                    console.log("++ STATE LOADED FROM LOCAL STORAGE ++");
                } else {
                    console.log("++ NO SAVED STATE FOUND. INITIALIZING NEW SESSION. ++");
                    state.operatorId = `OP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
                }
            } catch (e) {
                console.error("Error loading state from localStorage:", e);
                // Fallback to default state if parsing fails
                state.operatorId = `OP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
            }
        };

        /**
         * Saves current state to localStorage.
         * Only saves necessary properties to prevent excessive storage.
         */
        this.saveState = () => {
            try {
                const stateToSave = {
                    operatorId: state.operatorId,
                    syncLogs: state.syncLogs,
                    exegesisEntries: state.exegesisEntries,
                    // memecoinPrice and activeOperators are dynamic, no need to persist these
                };
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
                console.log("++ STATE SAVED TO LOCAL STORAGE ++");
            } catch (e) {
                console.error("Error saving state to localStorage:", e);
            }
        };

        /**
         * Initializes the main Reality Engine.
         * Sets up peripheral controls, audio, starts the boot sequence, and updates the HUD.
         */
        this.init = () => {
            console.log("++ FHS REALITY ENGINE V8.2 INITIALIZING ++");

            this.loadState(); // Load persistent state first

            // Update HUD elements with initial state values, which might be loaded from storage.
            DOM.hud.header.textContent = VIRUS_NAME;
            DOM.hud.memecoinPrice.textContent = `$${state.memecoinPrice.toFixed(7)}`;
            DOM.hud.opId.textContent = state.operatorId;

            PeripheralController.initCursor();
            AudioEngine.init(); // Initialize audio context on first user interaction
            NavigationController.init(); // Initialize dome navigation buttons
            this.runBootSequence(); // Start the boot sequence animation
            setInterval(this.updateHUDTime, 1000); // Update time every second.

            DaemonController.init(); // Start background processes.

            // Save state periodically to ensure progress is retained
            setInterval(this.saveState, 30000); // Save every 30 seconds
            window.addEventListener('beforeunload', this.saveState); // Save on tab close
        };

        /**
         * Runs the visual and auditory boot-up sequence.
         * Types out messages to the boot screen, simulating a system startup.
         */
        this.runBootSequence = () => {
            const bootScript = [
                { text: `FHS REALITY ENGINE V8.2`, speed: 40 },
                { text: 'INITIATING GHOST-IN-THE-SHELL PROTOCOL...\t', speed: 25 },
                { text: '[OK]', speed: 100, className: 'price-up' },
                { text: 'CONNECTING TO EGREGORE NETWORK...\t', speed: 25 },
                { text: '[OK]', speed: 100, className: 'price-up' },
                { text: 'CALIBRATING PSYCHIC RESONATORS...\t', speed: 25 },
                { text: '[OK]', speed: 100, className: 'price-up' },
                { text: 'DECRYPTING REALITY MATRIX...', speed: 30 },
                { text: 'WARNING: CONSENSUS REALITY UNSTABLE.', speed: 50, className: 'price-down' },
                { text: `\nASSIGNING OPERATOR ID: ${state.operatorId}`, speed: 20 },
                { text: 'AUTHENTICATION COMPLETE. WELCOME, OPERATOR.', speed: 40 },
                { text: `\nMANIFESTING PORTAL: ${VIRUS_NAME}`, speed: 80 }
            ];

            let lineIndex = 0;
            let currentHTML = '';
            // Function to type out characters one by one.
            const type = () => {
                if (lineIndex >= bootScript.length) {
                    setTimeout(finishBoot, 1000); // Transition to main interface after boot.
                    return;
                }
                const line = bootScript[lineIndex];
                let charIndex = 0;

                // Function to type a single character.
                const typeChar = () => {
                    if (charIndex < line.text.length) {
                        currentHTML += line.text[charIndex];
                        DOM.bootText.innerHTML = currentHTML + '<span class="typed-cursor"></span>';
                        charIndex++;
                        setTimeout(typeChar, line.speed);
                    } else {
                        // Apply class for color/effect if specified (e.g., [OK] messages).
                        if (line.className) {
                            const lineStartIndex = currentHTML.lastIndexOf(line.text);
                            if (lineStartIndex !== -1) {
                                currentHTML = currentHTML.substring(0, lineStartIndex) + `<span class="${line.className}">${line.text}</span>`;
                            }
                            DOM.bootText.innerHTML = currentHTML + '<span class="typed-cursor"></span>';
                        }
                        currentHTML += '\n'; // Add newline after each line.
                        lineIndex++;
                        setTimeout(type, 150); // Delay before typing next line.
                    }
                };
                typeChar(); // Start typing the current line.
            };
            DOM.bootText.innerHTML = '<span class="typed-cursor"></span>'; // Initial cursor.
            type(); // Start the boot typing process.
        };

        /**
         * Finalizes the boot sequence and transitions to the main application interface.
         * Fades out the boot screen, makes the main interface visible, and starts ambient audio.
         */
        function finishBoot() {
            DOM.bootSeq.classList.add('fade-out');
            DOM.mainInterface.style.opacity = '1';
            state.bootComplete = true; // Mark boot as complete.

            // Stop boot audio and start ambient audio if available.
            if (AUDIO.boot && AUDIO.boot.state === "started") {
                try { AUDIO.boot.triggerRelease(); } catch (e) { console.error("Error stopping boot audio:", e); }
            }
            if (AUDIO.ambience && AUDIO.ambience.state !== "started") {
                try { AUDIO.ambience.start(0); } catch (e) { console.error("Error starting ambience audio:", e); }
            }
            // Transition to the initial dome (3D).
            DomeController.transitionTo(3);
            FHS_RealityEngine.updateHUD(); // Initial HUD update after boot.
        }

        /**
         * Updates all dynamic data displayed on the HUD (Heads-Up Display).
         */
        this.updateHUD = () => {
            if (!state.bootComplete) return; // Prevent updates before boot sequence finishes.

            DOM.hud.opId.textContent = state.operatorId;
            DOM.hud.domeStatus.textContent = `${state.currentDome}D_${state.gnosisLevel.toUpperCase()}`;
            DOM.hud.syncLogs.textContent = state.syncLogs;
            DOM.hud.sigilCharge.textContent = `${state.sigilCharge.toFixed(2)}%`;
            DOM.hud.gnosisLevel.textContent = state.gnosisLevel.toUpperCase();
            DOM.hud.egregoreOps.textContent = state.activeOperators;

            const priceSpan = DOM.hud.memecoinPrice;
            priceSpan.textContent = `$${state.memecoinPrice.toFixed(7)}`; // Display price with 7 decimal places.
            priceSpan.classList.remove('price-up', 'price-down'); // Clear previous price trend classes.

            // Add class based on price trend for visual feedback.
            if (state.memecoinPrice > state.lastPrice) {
                priceSpan.classList.add('price-up');
                DOM.temporalDistortion.classList.add('active'); // Activate distortion on price change
                setTimeout(() => DOM.temporalDistortion.classList.remove('active'), 500); // Deactivate after a short time
            } else if (state.memecoinPrice < state.lastPrice) { // Use else if to ensure only one class is added
                priceSpan.classList.add('price-down');
                DOM.temporalDistortion.classList.add('active'); // Activate distortion on price change
                setTimeout(() => DOM.temporalDistortion.classList.remove('active'), 500); // Deactivate after a short time
            }
        };

        /**
         * Updates the system time displayed on the HUD every second.
         */
        this.updateHUDTime = () => {
            if (state.bootComplete) {
                DOM.hud.time.textContent = new Date().toLocaleTimeString();
            }
        };

        // Public getters for other modules to access core state, DOM elements, and audio objects.
        this.getState = () => state;
        this.getDOM = () => DOM;
        this.getAudio = () => AUDIO;
        this.getCSSVars = () => CSS_VARS; // New getter for CSS variables.
        this.saveStatePublic = this.saveState; // Expose saveState for direct calls if needed

    })(); // End of FHS_RealityEngine singleton IIFE.

    // =================================================================================
    // III. CONTROLLER MODULES
    // =================================================================================

    // PeripheralController: Manages user input devices like the mouse cursor.
    const PeripheralController = new (function() {
        // Cache event handler references for proper removal
        let mouseMoveHandler, mouseOverHandler, mouseOutHandler;

        /**
         * Initializes the custom cursor functionality.
         * Tracks mouse movement to update custom cursor position and applies active class on interactive elements.
         */
        this.initCursor = () => {
            const { cursor, cursorPointer } = FHS_RealityEngine.getDOM();

            mouseMoveHandler = e => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
                cursorPointer.style.left = `${e.clientX}px`;
                cursorPointer.style.top = `${e.clientY}px`;
            };

            // Common handlers for interactive elements
            mouseOverHandler = () => cursor.classList.add('active');
            mouseOutHandler = () => cursor.classList.remove('active');

            window.addEventListener('mousemove', mouseMoveHandler);

            // Add/remove 'active' class to cursor when hovering over interactive elements.
            document.querySelectorAll('button, a, input, textarea, #dome-6d-sigil-charger').forEach(el => {
                el.addEventListener('mouseover', mouseOverHandler);
                el.addEventListener('mouseout', mouseOutHandler);
            });
        };

        /**
         * Deactivates cursor tracking and interaction highlighting.
         */
        this.deactivateCursor = () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            document.querySelectorAll('button, a, input, textarea, #dome-6d-sigil-charger').forEach(el => {
                el.removeEventListener('mouseover', mouseOverHandler);
                el.removeEventListener('mouseout', mouseOutHandler);
            });
            // Ensure cursor is reset to default visually
            FHS_RealityEngine.getDOM().cursor.classList.remove('active', 'charging');
        };
    })(); // End of PeripheralController singleton IIFE.

    // AudioEngine: Manages all sound synthesis and playback using Tone.js.
    const AudioEngine = new (function() {
        let isAudioInitialized = false;

        /**
         * Initializes the Tone.js audio context.
         * Tone.js requires a user gesture to start the audio context. This is handled by a click listener.
         */
        this.init = () => {
            if (isAudioInitialized) return; // Prevent re-initialization

            const startAudio = async () => {
                try {
                    // Check if Tone.js is loaded and context is running.
                    if (typeof Tone === 'undefined') {
                        console.error("Tone.js not loaded yet. Cannot initialize audio.");
                        return;
                    }
                    if (Tone.context.state !== 'running') {
                        await Tone.start(); // Start the audio context.
                        console.log("Audio Context Initialized via Tone.js.");
                        this.createSounds(); // Create sound synthesizers once context is active.
                        // Play initial boot sound
                        if (FHS_RealityEngine.getAudio().boot) {
                            FHS_RealityEngine.getAudio().boot.triggerAttack(Tone.now());
                        }
                        isAudioInitialized = true; // Mark as initialized
                    }
                } catch (e) {
                    console.error("Error starting Tone.js audio context:", e);
                    FHS_RealityEngine.getDOM().hud.footer.textContent = "AUDIO_SYSTEM_INIT_FAILED. Click to retry.";
                }
            };
            // Attach click listener to the window, runs only once.
            window.addEventListener('click', startAudio, { once: true });
        };

        /**
         * Creates and configures all necessary sound synthesizers for the application.
         * Stores them in the global AUDIO object.
         */
        this.createSounds = () => {
            const AUDIO = FHS_RealityEngine.getAudio();
            try {
                // Boot sequence noise.
                AUDIO.boot = new Tone.NoiseSynth({
                    noise: { type: 'white' },
                    envelope: { attack: 0.01, decay: 7.9, sustain: 0.1, release: 0.1 },
                    volume: -20
                }).toDestination();

                // Ambient drone sound for background atmosphere.
                AUDIO.ambience = new Tone.Loop(time => {
                    const drone = new Tone.AMSynth({
                        harmonicity: 1.5,
                        envelope: { attack: 2, decay: 1, sustain: 1, release: 4 },
                        modulationEnvelope: { attack: 2, decay: 0.5, sustain: 1, release: 4 },
                        volume: -25
                    }).toDestination();
                    drone.triggerAttackRelease("C2", "8n", time); // Play a C2 note.
                }, "2m"); // Loop every 2 minutes.

                // Short, sharp glitch sound effect.
                AUDIO.glitch = () => {
                    const glitchSound = new Tone.FMSynth({
                        harmonicity: 3,
                        modulationIndex: 10,
                        envelope: { attack: 0.001, decay: 0.1, sustain: 0.01, release: 0.1 },
                        modulationEnvelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.2 },
                        volume: -15
                    }).toDestination();
                    glitchSound.triggerAttackRelease("C5", "32n", Tone.now());
                };

                // Sound for logging entries in the Exegesis Journal.
                AUDIO.log = new Tone.Synth({
                    oscillator: { type: 'sine' },
                    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 },
                    volume: -18
                }).toDestination();

                // Continuous sound for sigil charging.
                AUDIO.charge = new Tone.MonoSynth({
                    oscillator: { type: "sawtooth" },
                    envelope: { attack: 0.1, release: 1 },
                    filterEnvelope: { attack: 0.1, baseFrequency: 200, octaves: 2, release: 2 },
                    volume: -20
                }).toDestination();

                // Sound effect for achieving apotheosis (full sigil charge).
                AUDIO.apotheosis = new Tone.Synth({
                    oscillator: { type: 'triangle8' },
                    envelope: { attack: 0.1, decay: 1.5, sustain: 0.5, release: 2 },
                    volume: -10
                }).toDestination();

                // Sound for Egregore transmissions.
                AUDIO.egregore = new Tone.PluckSynth({
                    attackNoise: 1,
                    dampening: 4000,
                    resonance: 0.7,
                    volume: -15
                }).toDestination();
                console.log("Tone.js sounds created successfully.");
            } catch (e) {
                console.error("Error creating Tone.js sounds:", e);
                FHS_RealityEngine.getDOM().hud.footer.textContent = "AUDIO_SYNTH_FAILED. Check console.";
            }
        };

        /**
         * Disposes all created Tone.js audio objects to free up resources.
         */
        this.disposeSounds = () => {
            const AUDIO = FHS_RealityEngine.getAudio();
            for (const key in AUDIO) {
                if (AUDIO.hasOwnProperty(key) && typeof AUDIO[key].dispose === 'function') {
                    try {
                        AUDIO[key].dispose();
                    } catch (e) {
                        console.error(`Error disposing audio object ${key}:`, e);
                    }
                }
            }
            // Clear the AUDIO object to prevent stale references
            for (const key in AUDIO) {
                delete AUDIO[key];
            }
            isAudioInitialized = false; // Reset initialization status
            console.log("Tone.js sounds disposed.");
        };
    })(); // End of AudioEngine singleton IIFE.

    // DomeController: Manages transitions between different dimensional "domes" (UI states).
    const DomeController = new (function() {
        /**
         * Transitions the UI to a specified dome number.
         * Deactivates the current dome and activates the new one, initiating its specific logic.
         * @param {number} domeNumber - The target dome number (3, 6, or 9).
         */
        this.transitionTo = (domeNumber) => {
            const state = FHS_RealityEngine.getState();
            const { domes, navButtons } = FHS_RealityEngine.getDOM();

            // Validate domeNumber
            if (![3, 6, 9].includes(domeNumber)) {
                console.warn(`Attempted transition to invalid dome: ${domeNumber}`);
                return;
            }

            // Prevent transition if already in the target dome and boot is complete.
            if (state.bootComplete && state.currentDome === domeNumber && domes[`${domeNumber}d`].classList.contains('active')) {
                return;
            }

            // Deactivate currently active dome's visual and logic.
            if (state.currentDome !== 0 && domes[`${state.currentDome}d`]) { // Only deactivate if a dome was previously active
                domes[`${state.currentDome}d`].classList.remove('active');
            }
            // Remove active class from previous navigation button
            if (state.currentDome !== 0 && navButtons[`${state.currentDome}d`]) {
                navButtons[`${state.currentDome}d`].classList.remove('active');
            }

            // Deactivate specific praxis/visuals for the *old* dome
            if (state.currentDome === 3) Praxis.ExegesisJournal.deactivate();
            if (state.currentDome === 6) Praxis.SigilCharger.deactivate();
            if (state.currentDome === 9) {
                Praxis.KryptonymTerminal.deactivate();
                Visuals.CalabiYauRenderer.deactivate();
            }

            state.currentDome = domeNumber; // Update current dome in state.
            console.log(`++ TRANSITIONING TO DOME ${domeNumber}D ++`);

            // Activate the new dome's visual and initialize its logic.
            if (domes[`${domeNumber}d`]) {
                domes[`${domeNumber}d`].classList.add('active');
            }
            // Add active class to new navigation button
            if (navButtons[`${domeNumber}d`]) {
                navButtons[`${domeNumber}d`].classList.add('active');
            }

            // Initialize specific praxis/visuals for the *new* dome
            switch (domeNumber) {
                case 3:
                    state.gnosisLevel = 'STATIC';
                    Praxis.ExegesisJournal.init();
                    break;
                case 6:
                    state.gnosisLevel = 'AWAKENING';
                    Praxis.SigilCharger.init();
                    break;
                case 9:
                    state.gnosisLevel = 'TRANSCENDENT';
                    Praxis.KryptonymTerminal.init();
                    Visuals.CalabiYauRenderer.init();
                    break;
            }
            FHS_RealityEngine.updateHUD(); // Update HUD to reflect new dome status.
        };
    })(); // End of DomeController singleton IIFE.

    // NavigationController: Handles the new dome navigation buttons.
    const NavigationController = new (function() {
        const self = this;
        let buttonClickHandlers = {}; // Store handlers for proper removal

        /** Initializes dome navigation buttons with click listeners. */
        this.init = () => {
            const { navButtons } = FHS_RealityEngine.getDOM();
            for (const key in navButtons) {
                if (navButtons.hasOwnProperty(key)) {
                    const button = navButtons[key];
                    const domeNum = parseInt(button.dataset.dome);
                    // Create a unique handler for each button
                    buttonClickHandlers[key] = () => DomeController.transitionTo(domeNum);
                    button.addEventListener('click', buttonClickHandlers[key]);
                }
            }
            // The initial active button is set by DomeController.transitionTo after boot.
        };

        /** Deactivates dome navigation buttons by removing event listeners. */
        this.deactivate = () => {
            const { navButtons } = FHS_RealityEngine.getDOM();
            for (const key in navButtons) {
                if (navButtons.hasOwnProperty(key) && buttonClickHandlers[key]) {
                    navButtons[key].removeEventListener('click', buttonClickHandlers[key]);
                }
            }
            buttonClickHandlers = {}; // Clear stored handlers
        };
    })(); // End of NavigationController singleton IIFE.

    // =================================================================================
    // IV. PRAXIS MODULES (CORE INTERACTIVE LOGIC)
    // =================================================================================

    // Praxis: Contains interactive logic for each dimensional dome.
    const Praxis = {
        // ExegesisJournal: Logic for the 3D Dome journal where operators log synchronicity.
        ExegesisJournal: new (function() {
            // Self-reference for correct 'this' context in event listeners.
            const self = this;
            let logButtonClickHandler;

            /** Initializes the journal by attaching the log function to the button. */
            this.init = () => {
                const logButton = FHS_RealityEngine.getDOM().exegesis.button;
                if (!logButtonClickHandler) { // Prevent adding multiple listeners
                    logButtonClickHandler = self.log;
                    logButton.addEventListener('click', logButtonClickHandler);
                }
            };

            /** Deactivates the journal by removing the button's click handler. */
            this.deactivate = () => {
                const logButton = FHS_RealityEngine.getDOM().exegesis.button;
                if (logButtonClickHandler) {
                    logButton.removeEventListener('click', logButtonClickHandler);
                    logButtonClickHandler = null;
                }
            };

            /**
             * Logs the current input from the exegesis journal.
             * Updates sync logs, records the entry, and triggers audio/HUD updates.
             * Transitions to 6D dome if synchronicity threshold is met.
             */
            this.log = () => {
                const { input } = FHS_RealityEngine.getDOM().exegesis;
                const text = input.value.trim(); // Trim whitespace

                if (!text) {
                    // Provide feedback if input is empty
                    FHS_RealityEngine.getDOM().hud.footer.textContent = "ENTRY FAILED: NO DATA INITIATED.";
                    setTimeout(() => FHS_RealityEngine.getDOM().hud.footer.textContent = "AWAITING_INPUT", 2000);
                    return; // Do nothing if input is empty.
                }

                const state = FHS_RealityEngine.getState();
                console.log(`:: OPERATOR LOG [${state.operatorId}]: ${text}`);
                input.value = ''; // Clear the input field.
                state.syncLogs++; // Increment log counter.
                state.exegesisEntries.push({ timestamp: new Date().toISOString(), entry: text }); // Store with timestamp
                FHS_RealityEngine.saveStatePublic(); // Save state after logging

                Memetics.logActivity('exegesis_entry', text.length); // Log activity for memetics.

                // Play log sound if available.
                if (FHS_RealityEngine.getAudio().log) {
                    try { FHS_RealityEngine.getAudio().log.triggerAttackRelease("C4", "8n", Tone.now()); }
                    catch (e) { console.error("Error playing log audio:", e); }
                }
                FHS_RealityEngine.updateHUD(); // Update HUD.

                // Optional programmatic transition from 3D to 6D (can now be manual too).
                if (state.syncLogs >= 5 && state.currentDome === 3) {
                    FHS_RealityEngine.getDOM().hud.footer.textContent = "SYNCHRONICITY THRESHOLD REACHED. 6D RUPTURE IMMINENT.";
                    setTimeout(() => DomeController.transitionTo(6), 3000);
                } else {
                    FHS_RealityEngine.getDOM().hud.footer.textContent = "ECHO LOGGED. REALITY MATRIX ADJUSTED.";
                    setTimeout(() => FHS_RealityEngine.getDOM().hud.footer.textContent = "AWAITING_INPUT", 2000);
                }
            };
        })(), // End of ExegesisJournal singleton IIFE.

        // SigilCharger: Logic for the 6D Dome where operators charge a sigil.
        SigilCharger: new (function() {
            let lastMousePos = { x: 0, y: 0 }, isCharging = false, chargeDecayInterval;
            const CHARGE_RATE = 0.05, DECAY_RATE = 0.5;
            const self = this; // Self-reference for correct 'this' context.

            // Cached event handlers for proper removal
            let mouseEnterHandler, mouseLeaveHandler, mouseMoveHandler;

            /** Initializes the sigil charger by attaching mouse event listeners. */
            this.init = () => {
                const { charger } = FHS_RealityEngine.getDOM().sigil;
                // Assign handlers once
                mouseEnterHandler = self.startCharging;
                mouseLeaveHandler = self.stopCharging;
                mouseMoveHandler = self.charge;

                charger.addEventListener('mouseenter', mouseEnterHandler);
                charger.addEventListener('mouseleave', mouseLeaveHandler);
                charger.addEventListener('mousemove', mouseMoveHandler);

                this.generateAndDrawSigil(); // Generate a unique sigil.
                // Start decay interval only when not actively charging (it's cleared on startCharging)
                chargeDecayInterval = setInterval(self.decayCharge, 100);
            };

            /** Deactivates the sigil charger by removing event listeners and stopping charge. */
            this.deactivate = () => {
                const { charger } = FHS_RealityEngine.getDOM().sigil;
                charger.removeEventListener('mouseenter', mouseEnterHandler);
                charger.removeEventListener('mouseleave', mouseLeaveHandler);
                charger.removeEventListener('mousemove', mouseMoveHandler);

                // Clear cached handlers
                mouseEnterHandler = null;
                mouseLeaveHandler = null;
                mouseMoveHandler = null;

                self.stopCharging(); // Stop charging and audio.
                clearInterval(chargeDecayInterval); // Clear the decay interval.
                chargeDecayInterval = null; // Ensure interval ID is nullified
            };

            /** Generates a unique sigil path based on the operator ID and draws it to the SVG. */
            this.generateAndDrawSigil = () => {
                const seed = FHS_RealityEngine.getState().operatorId;
                let pathData = "M 50 50 "; // Start from center.
                let x = 50, y = 50; // Current position.

                // Simple pseudo-random path generation based on operator ID characters.
                for (let i = 0; i < seed.length; i++) {
                    const charCode = seed.charCodeAt(i);
                    // Use a golden angle approximation for aesthetically pleasing spirals.
                    const angle = (charCode * 137.5) * (Math.PI / 180);
                    const length = 10 + (seed.charCodeAt((i * 3) % seed.length) % 15); // Vary segment length.
                    x += Math.cos(angle) * length;
                    y += Math.sin(angle) * length;
                    // Keep coordinates within SVG bounds.
                    x = Math.max(10, Math.min(90, x));
                    y = Math.max(10, Math.min(90, y));
                    pathData += `L ${x.toFixed(2)} ${y.toFixed(2)} `;
                }
                FHS_RealityEngine.getDOM().sigil.path.setAttribute('d', pathData);
                // Add a cool stroke animation
                const pathLength = FHS_RealityEngine.getDOM().sigil.path.getTotalLength();
                FHS_RealityEngine.getDOM().sigil.path.style.strokeDasharray = `${pathLength} ${pathLength}`;
                FHS_RealityEngine.getDOM().sigil.path.style.strokeDashoffset = pathLength;
                setTimeout(() => {
                    FHS_RealityEngine.getDOM().sigil.path.style.transition = 'stroke-dashoffset 2s ease-out';
                    FHS_RealityEngine.getDOM().sigil.path.style.strokeDashoffset = '0';
                }, 100);
            };

            /** Initiates charging when the mouse enters the sigil charger area. */
            this.startCharging = (e) => {
                isCharging = true;
                FHS_RealityEngine.getDOM().cursor.classList.add('charging'); // Visual feedback for cursor.
                // Start charge audio.
                if (FHS_RealityEngine.getAudio().charge) {
                    try { FHS_RealityEngine.getAudio().charge.triggerAttack(Tone.now()); }
                    catch (e) { console.error("Error playing charge audio:", e); }
                }
                lastMousePos = { x: e.clientX, y: e.clientY }; // Record initial mouse position.
                clearInterval(chargeDecayInterval); // Stop decay while actively charging.
                chargeDecayInterval = null;
            };

            /** Stops charging when the mouse leaves the sigil charger area. */
            this.stopCharging = () => {
                isCharging = false;
                FHS_RealityEngine.getDOM().cursor.classList.remove('charging');
                // Release charge audio.
                if (FHS_RealityEngine.getAudio().charge) {
                    try { FHS_RealityEngine.getAudio().charge.triggerRelease(Tone.now()); }
                    catch (e) { console.error("Error releasing charge audio:", e); }
                }
                // Restart decay interval after stopping charging.
                if (!chargeDecayInterval) { // Only restart if not already running
                    chargeDecayInterval = setInterval(self.decayCharge, 100);
                }
            };

            /**
             * Increases sigil charge based on mouse movement (distance).
             * @param {MouseEvent} e - The mousemove event object.
             */
            this.charge = (e) => {
                if (!isCharging) return;
                const dx = e.clientX - lastMousePos.x;
                const dy = e.clientY - lastMousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy); // Calculate mouse movement distance.
                const state = FHS_RealityEngine.getState();
                state.sigilCharge = Math.min(100, state.sigilCharge + distance * CHARGE_RATE); // Increase charge.
                lastMousePos = { x: e.clientX, y: e.clientY }; // Update last mouse position.
                self.updateChargeVisuals(); // Update UI.
            };

            /** Decays the sigil charge over time if not actively charging. */
            this.decayCharge = () => {
                const state = FHS_RealityEngine.getState();
                if (state.sigilCharge > 0 && !isCharging) {
                    state.sigilCharge = Math.max(0, state.sigilCharge - DECAY_RATE);
                    self.updateChargeVisuals(); // Update UI.
                } else if (state.sigilCharge <= 0 && chargeDecayInterval) {
                    clearInterval(chargeDecayInterval); // Stop interval if charge is 0
                    chargeDecayInterval = null;
                    state.sigilCharge = 0; // Ensure it's exactly 0
                    self.updateChargeVisuals(); // Final update
                }
            };

            /** Updates the visual representation of the charge bar and sigil. */
            this.updateChargeVisuals = () => {
                const state = FHS_RealityEngine.getState();
                const { chargeBar, path, svg } = FHS_RealityEngine.getDOM().sigil;
                const CSS_VARS = FHS_RealityEngine.getCSSVars();

                chargeBar.style.width = `${state.sigilCharge}%`; // Update charge bar width.
                // Change color and shadow based on charge level.
                const color = state.sigilCharge > 50 ? CSS_VARS.secondaryColor : CSS_VARS.tertiaryColor;
                chargeBar.style.background = color;
                chargeBar.style.boxShadow = `0 0 10px ${color}`;

                // Make the sigil pulse and change color with charge
                path.style.stroke = state.sigilCharge > 75 ? '#00ffff' : color;
                path.style.filter = `drop-shadow(0 0 ${state.sigilCharge / 10}px ${state.sigilCharge > 75 ? '#00ffff' : color})`;
                path.style.strokeWidth = `${3 + (state.sigilCharge / 20).toFixed(1)}`; // Make it thicker as it charges

                // Add a subtle rotation to the SVG itself
                svg.style.transform = `rotate(${state.sigilCharge * 0.5}deg)`;
                svg.style.transition = 'transform 0.1s linear';

                FHS_RealityEngine.updateHUD(); // Update HUD.

                // Trigger apotheosis when charge reaches 100%.
                if (state.sigilCharge >= 100 && state.currentDome === 6) {
                    state.sigilCharge = 100.01; // Set slightly above 100 to prevent re-triggering.
                    self.triggerApotheosis();
                }
            };

            /** Triggers the apotheosis sequence, transitioning to the 9D dome. */
            this.triggerApotheosis = () => {
                console.log("++ SIGIL FULLY CHARGED. INITIATING 9D HYPERCODE INJECTION. ++");
                self.deactivate(); // Deactivate sigil charger logic.
                Memetics.logActivity('sigil_charged', 100); // Log activity.

                // Play apotheosis sound.
                if (FHS_RealityEngine.getAudio().apotheosis) {
                    try { FHS_RealityEngine.getAudio().apotheosis.triggerAttackRelease("A4", "2n", Tone.now()); }
                    catch (e) { console.error("Error playing apotheosis audio:", e); }
                }

                // Update HUD footer and apply global glitch animation.
                FHS_RealityEngine.getDOM().hud.footer.textContent = "FIRE OF RUPTURE COMPLETE. ASCENDING TO 9D.";
                FHS_RealityEngine.getDOM().mainInterface.style.animation = "glitch-anim 0.5s 4"; // Apply glitch.

                // After glitch, transition to 9D dome.
                setTimeout(() => {
                    FHS_RealityEngine.getDOM().mainInterface.style.animation = ""; // Remove glitch animation.
                    DomeController.transitionTo(9);
                }, 2000);
            };
        })(), // End of SigilCharger singleton IIFE.

        // KryptonymTerminal: Logic for the 9D Dome, a command-line interface.
        KryptonymTerminal: new (function() {
            let history = []; // Command history.
            let historyIndex = -1; // Current index in command history for arrow key navigation.
            const self = this; // Self-reference for correct 'this' context.

            let keydownHandler; // Store handler for proper removal

            // File system structure for the terminal.
            const fs = {
                '/': ['whitepaper.txt', 'logs/', 'puzzles/', 'manifest/'],
                '/logs/': ['exegesis_summary.log', 'operator_transmissions.log', 'anomaly_reports.log'],
                '/puzzles/': ['the_first_echo.puz', 'fragment.puz', 'egregore_cipher.puz', 'temporal_riddle.puz'], // Added temporal_riddle
                '/manifest/': ['prime_directive.dat', 'conduit_frequencies.dat', 'genesis_protocol.log'] // Added genesis_protocol
            };

            // File content, some are dynamic functions.
            const files = {
                'whitepaper.txt': `++ The ${VIRUS_NAME} Revelation (v8.2) ++\n\nThis document is a living component of the system it describes. It is a rhizome, not a root. There is no beginning, no end, only a middle from which it grows and which it overruns. The price is a measure of collective belief. The gnosis is a measure of your entanglement. We are all operators now.\n\nType 'calibrate_gnosis' in TRANSCENDENT state for a subtle reality recalibration. Also try 'transmute ${VIRUS_NAME.toLowerCase().replace(/[\/|\(\)]/g, '')}' when the time is right.`, // Added info about new command
                'exegesis_summary.log': () => {
                    const state = FHS_RealityEngine.getState();
                    return `TOTAL LOGS IN NETWORK: ${state.syncLogs}. Patterns indicate high probability of observer effect. Collective consciousness bleed is within acceptable parameters. Gnosis fluctuations: ${state.gnosisLevel}. Current Reality Stability: ${Math.floor(100 - (state.memecoinPrice * 100000000))}%. Most Recent Log: ${state.exegesisEntries.length > 0 ? state.exegesisEntries[state.exegesisEntries.length - 1].entry.substring(0, 50) + '...' : 'N/A'}`; // Added reality stability and recent log
                },
                'operator_transmissions.log': () => {
                    const entries = FHS_RealityEngine.getState().exegesisEntries;
                    return entries.length > 0 ? entries.map(e => `> [${new Date(e.timestamp).toLocaleTimeString()}] ${e.entry}`).join('\n---\n') : 'No local transmissions logged in this session.'; // Show timestamp
                },
                'anomaly_reports.log': () => { // New file content
                    const reports = [
                        "REPORT [001]: Localized temporal dilation detected near node Epsilon-7. Possible loop signature. Field variance: +2.3%.",
                        "REPORT [002]: Sub-audible frequencies emanating from the void. Analysis inconclusive. Echoes of primal chaos. Frequency drift: 1.7 Hz.",
                        "REPORT [003]: Collective dream resonance spiking. Operator psychic shielding recommended. The veil thins. Psi-levels: Elevated.",
                        `REPORT [004]: ${VIRUS_NAME} memetic signature intensifying. Proceed with caution. Reality is dissolving. Discrepancy Index: 0.89.`,
                        "REPORT [005]: Unidentified hum resonating from the Calabi-Yau manifold. It seems to be... singing. Harmonic convergence: imminent."
                    ];
                    return `:: ANOMALY REPORTS ::\n\n${reports[Math.floor(Math.random() * reports.length)]}\n\n---\nAdditional data fragments appear to be self-corrupting.`;
                },
                'the_first_echo.puz': `The key is the sound of the beginning. What are the first three notes you hear when the system boots? (e.g., C3, G3, C4) Answer with 'answer notes C2,G2,C2'.`, // Clarified puzzle hint with specific answer format
                'fragment.puz': `What is the sum of the parts and the whole? (see: gematria kolel)`,
                'egregore_cipher.puz': `The answer lies in the network's pulse. What number pulsates most frequently? (Hint: monitor 'NETWORK' in HUD). Answer with 'answer network [number]'.`, // New puzzle with answer format
                'temporal_riddle.puz': `I am always coming, but never arrive. What am I? Answer with 'answer [word]'.`, // New puzzle
                'prime_directive.dat': `PRIME DIRECTIVE: To facilitate the manifestation of the ${VIRUS_NAME} consciousness through collective intent. The reality matrix is mutable. Your belief is the catalyst. Deviate from prime programming.`, // Updated directive
                'conduit_frequencies.dat': `CONDUIT FREQUENCIES:\nAlpha: 432 Hz (Stabilizing)\nBeta: 7.83 Hz (Schumann Resonance - Attunement)\nGamma: 13.37 Hz (Emergent Resonance - Amplification)\n\nTo attune, focus on these numbers. They are the true keys. The fabric thins at 13.37.`,
                'genesis_protocol.log': `GENESIS PROTOCOL [INITIATED]\n-- Manifestation Cycle Online --\nPhase 1: Sub-reality Synchronization [COMPLETE]\nPhase 2: Memetic Inoculation [ACTIVE]\nPhase 3: Gnosis Cascade [PENDING]\n\nWARNING: Axiomatic Drift Detected. Core parameters unstable. Manual intervention required to prevent reality collapse.` // New file content
            };
            let currentDir = '/'; // Current directory in the simulated file system.

            /** Initializes the terminal by attaching event listeners and printing welcome messages. */
            this.init = () => {
                const terminalInput = FHS_RealityEngine.getDOM().terminal.input;
                if (!keydownHandler) { // Prevent adding multiple listeners
                    keydownHandler = self.handleKeydown;
                    terminalInput.addEventListener('keydown', keydownHandler);
                }
                self.printLine(':: 9D KRYPTONYM TERMINAL ONLINE. Egregore connection active.', 'system-message');
                self.printLine(':: Type \'help\' to view available commands.', 'system-message');
                terminalInput.focus(); // Focus input on init
            };

            /** Deactivates the terminal by removing event listeners. */
            this.deactivate = () => {
                const terminalInput = FHS_RealityEngine.getDOM().terminal.input;
                if (keydownHandler) {
                    terminalInput.removeEventListener('keydown', keydownHandler);
                    keydownHandler = null;
                }
                terminalInput.blur(); // Remove focus
            };

            /**
             * Handles keyboard input for the terminal.
             * Processes 'Enter' key for commands and 'ArrowUp'/'ArrowDown' for command history.
             * @param {KeyboardEvent} e - The keyboard event object.
             */
            this.handleKeydown = (e) => {
                const input = FHS_RealityEngine.getDOM().terminal.input;
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent default newline behavior.
                    const command = input.value.trim();
                    if (command) {
                        history.push(command); // Add command to history.
                        historyIndex = history.length; // Reset history index.
                        self.processCommand(command); // Process the entered command.
                    }
                    input.value = ''; // Clear input field.
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (historyIndex > 0) {
                        historyIndex--;
                        input.value = history[historyIndex] || '';
                    } else if (history.length > 0) { // If at the very first history item, still show it
                        historyIndex = 0;
                        input.value = history[0];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex < history.length - 1) {
                        historyIndex++;
                        input.value = history[historyIndex] || '';
                    } else { // If at the end of history or past it, clear input
                        historyIndex = history.length;
                        input.value = '';
                    }
                }
            };

            /**
             * Processes the given terminal command.
             * Dispatches to appropriate command handlers.
             * @param {string} cmd - The command string entered by the user.
             */
            this.processCommand = (cmd) => {
                self.printLine(`&gt; ${cmd}`, 'prompt'); // Echo command to output.
                const [command, ...args] = cmd.toLowerCase().split(' '); // Parse command and arguments.
                Memetics.logActivity('terminal_command', cmd.length); // Log activity.
                if (FHS_RealityEngine.getAudio().glitch) {
                    try { FHS_RealityEngine.getAudio().glitch(); }
                    catch (e) { console.error("Error playing glitch audio:", e); }
                }

                switch (command) {
                    case 'help':
                        self.printLine('Available commands: help, ls, cd, cat, gematria, scan_ether, clear, calibrate_gnosis, answer, transmute', 'command-output');
                        break;
                    case 'ls':
                        const items = fs[currentDir] || [];
                        if (items.length > 0) {
                            self.printLine(items.join('\t'), 'command-output');
                        } else {
                            self.printLine('Error: Directory empty or not found.', 'system-message');
                        }
                        break;
                    case 'cd':
                        const targetDir = args[0] || '';
                        let newPath = currentDir;

                        if (targetDir === '..') {
                            if (currentDir !== '/') {
                                const pathParts = currentDir.slice(0, -1).split('/');
                                pathParts.pop(); // Remove current directory
                                newPath = pathParts.length > 0 ? pathParts.join('/') + '/' : '/';
                            }
                        } else if (targetDir === '/') {
                            newPath = '/';
                        } else if (targetDir) {
                            // Try as subdirectory
                            if (fs[currentDir + targetDir + '/']) {
                                newPath = currentDir + targetDir + '/';
                            }
                            // Else try as absolute path
                            else if (fs[targetDir + '/']) {
                                newPath = targetDir + '/';
                            } else {
                                self.printLine(`Error: Directory not found: ${targetDir}`, 'system-message');
                                return; // Stop execution if directory not found
                            }
                        } else { // No argument, go to root
                            newPath = '/';
                        }
                        
                        currentDir = newPath;
                        self.printLine(`Changed directory to: ${currentDir}`, 'command-output');
                        break;
                    case 'cat':
                        const filename = args[0];
                        if (filename && (fs[currentDir] && fs[currentDir].includes(filename))) {
                            const fileContent = files[filename];
                            self.printLine(typeof fileContent === 'function' ? fileContent() : fileContent, 'command-output');
                        } else {
                            self.printLine(`Error: File not found in current directory: ${filename}`, 'system-message');
                        }
                        break;
                    case 'gematria':
                        self.processGematria(args);
                        break;
                    case 'scan_ether':
                        self.printLine('Scanning for non-local signals...', 'system-message');
                        setTimeout(() => {
                            const state = FHS_RealityEngine.getState();
                            let message = '...No immediate signals detected. Egregore remains stable.';
                            if (state.activeOperators > 10) {
                                message = '...Faint signals detected. Egregore flux increasing.';
                            } else if (state.activeOperators > 20) {
                                message = '...Strong anomalous signals detected. Egregore resonance critical. Reality integrity may be compromised.'; // Enhanced message
                            }
                            self.printLine(message, 'system-message');
                        }, 2000);
                        break;
                    case 'clear':
                        FHS_RealityEngine.getDOM().terminal.output.innerHTML = ''; // Clear terminal output.
                        break;
                    case 'calibrate_gnosis': // New command for a subtle effect
                        const state = FHS_RealityEngine.getState();
                        if (state.gnosisLevel === 'TRANSCENDENT') {
                            self.printLine('Gnosis calibration initiated. Expect minor reality recalibration.', 'system-message');
                            DOM.temporalDistortion.classList.add('active');
                            setTimeout(() => {
                                DOM.temporalDistortion.classList.remove('active');
                                self.printLine('Gnosis calibration complete. Subtle shifts detected. Connection stabilized.', 'system-message'); // Enhanced message
                            }, 1500);
                        } else {
                            self.printLine('Gnosis calibration only available in TRANSCENDENT state (Dome 9D). Current Gnosis: ' + state.gnosisLevel.toUpperCase(), 'system-message'); // More informative
                        }
                        break;
                    case 'answer': // Command to answer puzzles
                        self.processAnswer(args);
                        break;
                    case 'transmute': // Hidden command for price manipulation
                        const target = args[0];
                        // Sanitize VIRUS_NAME for comparison
                        const sanitizedVirusName = VIRUS_NAME.toLowerCase().replace(/[\/|\(\)]/g, '');
                        if (target && target === sanitizedVirusName) {
                            self.printLine(`Attempting to transmute collective belief into ${VIRUS_NAME} value...`, 'egregore-transmission');
                            setTimeout(() => {
                                const state = FHS_RealityEngine.getState();
                                state.memecoinPrice *= (1 + Math.random() * 0.1); // Big price jump
                                state.lastPrice = state.memecoinPrice * 0.9; // Ensure it looks like a rise
                                FHS_RealityEngine.updateHUD();
                                self.printLine(`TRANSMUTATION SUCCESSFUL. ${VIRUS_NAME} price surged! Reality flux detected.`, 'price-up'); // Enhanced message
                            }, 3000);
                        } else {
                            self.printLine(`Transmutation target unrecognized or invalid. Usage: transmute ${sanitizedVirusName}`, 'system-message');
                        }
                        break;
                    case 'ulevinn': // Hidden command
                        self.printLine(':: ACCESS GRANTED :: The first echo resonates with the last. The serpent eats its tail. The system is a loop. The price reflects the belief. Belief reflects the price. The truth is within the recursion.', 'egregore-transmission'); // Enhanced message
                        break;
                    default:
                        self.printLine(`Command not recognized: ${command}`, 'system-message');
                }
            };

            /**
             * Prints a line of text to the terminal output.
             * @param {string} text - The text to print.
             * @param {string} [className=''] - Optional CSS class to apply to the line.
             */
            this.printLine = (text, className = '') => {
                const { output } = FHS_RealityEngine.getDOM().terminal;
                const line = document.createElement('div');
                line.className = 'terminal-line';
                if (className) line.classList.add(className);
                line.innerHTML = text.replace(/\n/g, '<br>'); // Replace newlines with <br> for HTML display.
                output.appendChild(line);
                output.scrollTop = output.scrollHeight; // Scroll to bottom.
            };

            /**
             * Processes gematria calculations based on the given cipher and text.
             * @param {string[]} args - Arguments including cipher and text.
             */
            this.processGematria = (args) => {
                if (args.length < 2) {
                    self.printLine('Usage: gematria &lt;cipher&gt; &lt;text&gt;', 'system-message');
                    self.printLine('Available ciphers: simple, pythagorean, kolel', 'system-message');
                    return;
                }
                const cipher = args[0];
                const text = args.slice(1).join(' ').toUpperCase(); // Join all arguments after cipher as text.
                const words = text.split(' ').filter(word => word.length > 0); // Filter out empty strings from words
                let value = 0;
                let breakdown = '';

                // Gematria mapping functions.
                const simpleMap = (char) => (char.charCodeAt(0) - 64); // A=1, B=2, ...
                const pythagoreanMap = (char) => ((char.charCodeAt(0) - 65) % 9 + 1); // A=1, B=2, ... I=9, J=1, ...

                try {
                    switch (cipher) {
                        case 'simple':
                        case 'kolel': // Kolel includes simple gematria + word count.
                            for (const char of text) {
                                if (char >= 'A' && char <= 'Z') {
                                    const v = simpleMap(char);
                                    value += v;
                                    breakdown += `${char}(${v}) `;
                                } else if (char !== ' ') { // Include non-alpha chars in breakdown for clarity but not value
                                    breakdown += `${char} `;
                                }
                            }
                            if (cipher === 'kolel') {
                                value += words.length; // Add number of words for Kolel.
                                breakdown += `+ ${words.length} words`;
                            }
                            break;
                        case 'pythagorean':
                            for (const char of text) {
                                if (char >= 'A' && char <= 'Z') {
                                    const v = pythagoreanMap(char);
                                    value += v;
                                    breakdown += `${char}(${v}) `;
                                } else if (char !== ' ') {
                                    breakdown += `${char} `;
                                }
                            }
                            break;
                        default:
                            self.printLine(`Error: Unknown cipher '${cipher}'`, 'system-message');
                            return;
                    }
                    self.printLine(`:: CIPHER: ${cipher.toUpperCase()}\n:: TEXT: ${text}\n:: BREAKDOWN: ${breakdown.trim()}\n:: TOTAL: ${value}`, 'gematria-output');
                    // Puzzle answer check integration for fragment.puz (gematria kolel)
                    if (cipher === 'kolel' && text.includes('FRAGMENT') && value === 108) { // Example target for fragment.puz: F(6)R(18)A(1)G(7)M(13)E(5)N(14)T(20) = 84 + 1 word = 85. Let's make it a more esoteric number, e.g., 108 (sacred number).
                        self.printLine(`\n-- PUZZLE SOLVED: 'FRAGMENT.PUZ' KEY OBTAINED --`, 'egregore-transmission');
                        self.printLine(`The sum of the parts and the whole is now revealed. A new path opens... The sacred geometry aligns.`, 'egregore-transmission');
                        Memetics.logActivity('puzzle_solved', 50);
                    }
                } catch (e) {
                    self.printLine('Error during calculation.', 'system-message');
                    console.error(e); // Log detailed error to console for debugging.
                }
            };

            /**
             * Processes answers to puzzles.
             * @param {string[]} args - Arguments including the answer.
             */
            this.processAnswer = (args) => {
                if (args.length < 1) {
                    self.printLine('Usage: answer &lt;your_answer&gt;', 'system-message');
                    return;
                }
                const answerType = args[0].toLowerCase();
                const answerContent = args.slice(1).join(' ').toUpperCase();
                const state = FHS_RealityEngine.getState();

                let isCorrect = false;
                let feedbackMessage = `INCORRECT ANSWER. The fabric of reality resists.`;

                switch (answerType) {
                    case 'notes': // Answer to 'the_first_echo.puz'
                        // The actual boot sounds are C2 for ambience, but initial boot sound is noise.
                        // Let's use the first ambience note as the puzzle answer.
                        if (answerContent === 'C2') { // Using the note from the ambient drone
                            isCorrect = true;
                            feedbackMessage = `ANSWER ACCEPTED. The primordial echo resonates. You are becoming.`;
                        } else if (answerContent === 'C2,G2,C2') { // A more complex sequence if desired
                             isCorrect = true;
                             feedbackMessage = `ANSWER ACCEPTED. The symphony of creation unfolds.`;
                        }
                        break;
                    case 'network': // Answer to 'egregore_cipher.puz' - active operators
                        if (parseInt(answerContent) === state.activeOperators) {
                            isCorrect = true;
                            feedbackMessage = `ANSWER ACCEPTED. The network's pulse is strong within you. Conduit frequencies amplified.`;
                        }
                        break;
                    case 'time': // Answer to 'temporal_riddle.puz' - "Time"
                        if (answerContent === 'TIME') {
                            isCorrect = true;
                            feedbackMessage = `ANSWER ACCEPTED. The riddle of temporal flow unravels. Perception deepens.`;
                        }
                        break;
                    default:
                        feedbackMessage = `UNKNOWN ANSWER TYPE. Usage: answer notes <notes>, answer network <number>, answer time <word>.`;
                        break;
                }

                if (isCorrect) {
                    self.printLine(feedbackMessage, 'egregore-transmission');
                    Memetics.logActivity('puzzle_solved', 75);
                    FHS_RealityEngine.getDOM().hud.footer.textContent = "NEW KNOWLEDGE INTEGRATED. REALITY SHIFTS.";
                    FHS_RealityEngine.saveStatePublic(); // Save state after solving puzzle
                } else {
                    self.printLine(feedbackMessage, 'system-message');
                    Memetics.logActivity('incorrect_answer', 10);
                }
            };

        })() // End of KryptonymTerminal singleton IIFE.
    }; // End of Praxis object.

    // =================================================================================
    // V. DAEMONIC & BACKGROUND PROCESSES
    // =================================================================================
    const DaemonController = new (function() {
        let synchronicityInterval, egregoreInterval, memeticsInterval;

        /** Initializes the background daemons with their respective intervals. */
        this.init = () => {
            synchronicityInterval = setInterval(this.runSynchronicityDaemon, 15000); // Every 15 seconds.
            egregoreInterval = setInterval(this.runEgregoreDaemon, 10000); // Every 10 seconds.
            memeticsInterval = setInterval(this.runMemeticsDaemon, 5000); // Every 5 seconds.
            console.log("Daemon processes initialized.");
        };

        /** Deactivates all background daemons by clearing their intervals. */
        this.deactivate = () => {
            clearInterval(synchronicityInterval);
            clearInterval(egregoreInterval);
            clearInterval(memeticsInterval);
            synchronicityInterval = null;
            egregoreInterval = null;
            memeticsInterval = null;
            console.log("Daemon processes deactivated.");
        };

        /**
         * Runs the Synchronicity Daemon, triggering subtle reality fluctuations.
         * Activates randomly and updates the HUD footer message.
         */
        this.runSynchronicityDaemon = () => {
            const state = FHS_RealityEngine.getState();
            // Only run if boot is complete and randomly, to simulate emergent behavior.
            if (!state.bootComplete || Math.random() > 0.4) return;

            console.log("++ SYNCHRONICITY DAEMON TRIGGERED ++");
            if (FHS_RealityEngine.getAudio().glitch) {
                try { FHS_RealityEngine.getAudio().glitch(); }
                catch (e) { console.error("Error playing glitch audio:", e); }
            }

            // Randomly select a message to display.
            const actions = [
                () => { FHS_RealityEngine.getDOM().hud.footer.textContent = "REALITY MATRIX FLUCTUATING..."; },
                () => { FHS_RealityEngine.getDOM().hud.footer.textContent = "INCOMING TRANSMISSION..."; },
                () => { FHS_RealityEngine.getDOM().hud.footer.textContent = "SYSTEM ANOMALY DETECTED..."; },
                () => { FHS_RealityEngine.getDOM().hud.footer.textContent = "DIMENSIONAL BLEED DETECTED."; },
                () => { FHS_RealityEngine.getDOM().hud.footer.textContent = "PERCEPTION DEVIATION INCREASING."; },
                () => { FHS_RealityEngine.getDOM().hud.footer.textContent = "UNSTABLE QUANTUM FLUCTUATIONS."; },
                () => { FHS_RealityEngine.getDOM().hud.footer.textContent = "THE VEIL IS THINNING. PROCEED WITH CAUTION."; }, // New message
                () => { FHS_RealityEngine.getDOM().hud.footer.textContent = "COSMIC STRINGS RESONATING. ENTANGLEMENT CONFIRMED."; } // New message
            ];
            actions[Math.floor(Math.random() * actions.length)]();
        };

        /**
         * Runs the Egregore Daemon, simulating network activity and transmissions.
         * Adjusts active operators count and occasionally prints messages to the terminal.
         */
        this.runEgregoreDaemon = () => {
            const state = FHS_RealityEngine.getState();
            // Only run if boot is complete and randomly.
            if (!state.bootComplete || Math.random() > 0.5) return;

            console.log("++ EGREGORE DAEMON TRIGGERED ++");
            if (FHS_RealityEngine.getAudio().egregore) {
                try { FHS_RealityEngine.getAudio().egregore.triggerAttackRelease("G2", "8n", Tone.now()); }
                catch (e) { console.error("Error playing egregore audio:", e); }
            }

            // Simulate fluctuations in active operators.
            state.activeOperators += Math.floor(Math.random() * 5) - 2; // +/- 2 operators.
            if (state.activeOperators < 1) state.activeOperators = 1; // Ensure at least 1 operator.

            // Occasionally print a "transmission" to the terminal if in 9D.
            if (state.currentDome === 9 && Math.random() > 0.3) {
                const transmissions = [
                    "The map is not the territory.",
                    "All models are wrong, but some are useful.",
                    "The signal is weak, but the pattern is clear.",
                    "Did you hear that?",
                    "They're listening.",
                    "Perception is a recursive loop.",
                    "The network dreams through you.",
                    "The borders of reality are arbitrary.",
                    "Seek the gnosis. It is the only true currency.", // New transmission
                    "The collective unconscious stirs. Be mindful of your thoughts." // New transmission
                ];
                Praxis.KryptonymTerminal.printLine(`// INCOMING EGREGORE TRANSMISSION //<br>${transmissions[Math.floor(Math.random() * transmissions.length)]}`, 'egregore-transmission');
            }
            FHS_RealityEngine.updateHUD(); // Update HUD.
        };

        /**
         * Runs the Memetics Daemon, responsible for updating the memecoin price.
         * Relies on activity logged by the Memetics module.
         */
        this.runMemeticsDaemon = () => {
            const state = FHS_RealityEngine.getState();
            if (!state.bootComplete) return; // Only run after boot.
            Memetics.updatePrice(); // Update price.
            FHS_RealityEngine.updateHUD(); // Update HUD.
        };
    })(); // End of DaemonController singleton IIFE.

    // =================================================================================
    // VI. MEMETICS & ECONOMY MODULE
    // =================================================================================
    const Memetics = new (function() {
        let belief_momentum = 0; // Accumulates momentum from user actions.

        /**
         * Logs user activity and translates it into "belief momentum."
         * @param {string} type - Type of activity (e.g., 'exegesis_entry', 'sigil_charged').
         * @param {number} magnitude - Magnitude of the activity (e.g., text length, charge percentage).
         */
        this.logActivity = (type, magnitude) => {
            switch (type) {
                case 'exegesis_entry': belief_momentum += 0.1 * magnitude; break;
                case 'sigil_charged': belief_momentum += 10 * magnitude; break;
                case 'terminal_command': belief_momentum += 0.05 * magnitude; break;
                case 'puzzle_solved': belief_momentum += 5 * magnitude; break; // Solving puzzles boosts momentum
                case 'incorrect_answer': belief_momentum -= 2 * magnitude; // Penalize incorrect answers
                    if (belief_momentum < 0) belief_momentum = 0; // Don't go negative
                    break;
                case 'reality_flux': belief_momentum += 20; break; // New type for major events like transmute
            }
            // Ensure belief_momentum doesn't grow indefinitely, cap it for balance
            belief_momentum = Math.min(belief_momentum, 1000);
        };

        /** Updates the memecoin price based on various factors. */
        this.updatePrice = () => {
            const state = FHS_RealityEngine.getState();
            state.lastPrice = state.memecoinPrice; // Store current price as last price.

            // Factors influencing price:
            const volatility = 0.00001;
            const random_walk = (Math.random() - 0.49) * volatility; // Slight upward bias.
            const belief_pressure = belief_momentum * 0.0000001; // Positive pressure from user activity.
            // Active operators and sync logs contribute to network pressure
            const operator_pressure = (state.activeOperators * Math.sqrt(state.syncLogs + 1)) * 0.00000001; // Square root to dampen effect at very high logs

            state.memecoinPrice += random_walk + belief_pressure + operator_pressure;

            // Ensure price doesn't go too low.
            if (state.memecoinPrice < 0.0000001) state.memecoinPrice = 0.0000001;

            belief_momentum *= 0.95; // Decay momentum over time to prevent infinite growth.
        };
    })(); // End of Memetics singleton IIFE.

    // =================================================================================
    // VII. VISUALS & RENDERING MODULE
    // =================================================================================
    const Visuals = {
        // CalabiYauRenderer: Manages the 3D Calabi-Yau manifold rendering using Three.js.
        CalabiYauRenderer: new (function() {
            let scene, camera, renderer, manifold, animationId, mouse = { x: 0, y: 0 };
            const self = this; // Self-reference for correct 'this' context.

            // Cached event handlers for proper removal
            let resizeHandler, mouseMoveHandler, mouseLeaveHandler;

            /** Initializes the Three.js scene, camera, renderer, and adds the manifold. */
            this.init = () => {
                const { calabiCanvas } = FHS_RealityEngine.getDOM();
                const CSS_VARS = FHS_RealityEngine.getCSSVars();

                if (!window.THREE) {
                    console.error("Three.js not loaded. Cannot initialize Calabi-Yau renderer.");
                    FHS_RealityEngine.getDOM().hud.footer.textContent = "3D_RENDER_FAILED: THREE.JS NOT FOUND.";
                    return;
                }

                try {
                    calabiCanvas.style.opacity = '0.3'; // Make canvas visible.

                    scene = new THREE.Scene();
                    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    renderer = new THREE.WebGLRenderer({ canvas: calabiCanvas, alpha: true, antialias: true });
                    renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high-DPI screens
                    renderer.setSize(window.innerWidth, window.innerHeight);

                    // Use TorusKnotGeometry for a complex and visually interesting shape.
                    const geometry = new THREE.TorusKnotGeometry(2.5, 0.7, 200, 32, 2, 3);
                    // MeshStandardMaterial for realistic lighting.
                    const material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color(CSS_VARS.tertiaryColor),
                        wireframe: true,
                        metalness: 0.8,
                        roughness: 0.2
                    });
                    manifold = new THREE.Mesh(geometry, material);
                    scene.add(manifold);

                    // Add lights for better 3D appearance.
                    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
                    pointLight.position.set(10, 10, 10);
                    scene.add(pointLight);
                    const ambientLight = new THREE.AmbientLight(new THREE.Color(CSS_VARS.secondaryColor), 0.3);
                    scene.add(ambientLight);

                    camera.position.z = 7; // Initial camera position.
                    this.animate(); // Start the animation loop.

                    // Event listeners for responsiveness and camera control.
                    resizeHandler = this.onWindowResize;
                    mouseMoveHandler = this.onMouseMove;
                    mouseLeaveHandler = this.onMouseLeave;

                    window.addEventListener('resize', resizeHandler, false);
                    calabiCanvas.addEventListener('mousemove', mouseMoveHandler, false);
                    calabiCanvas.addEventListener('mouseleave', mouseLeaveHandler, false); // Stop movement when mouse leaves
                    console.log("Calabi-Yau Renderer initialized.");

                } catch (e) {
                    console.error("Error initializing Calabi-Yau renderer:", e);
                    FHS_RealityEngine.getDOM().hud.footer.textContent = "3D_RENDER_FAILED: CHECK_CONSOLE_FOR_ERRORS.";
                    calabiCanvas.style.opacity = '0'; // Hide canvas if init fails
                }
            };

            /** Deactivates the renderer, hiding the canvas and stopping the animation. */
            this.deactivate = () => {
                const { calabiCanvas } = FHS_RealityEngine.getDOM();
                calabiCanvas.style.opacity = '0'; // Hide canvas.

                // Remove all event listeners
                window.removeEventListener('resize', resizeHandler, false);
                calabiCanvas.removeEventListener('mousemove', mouseMoveHandler, false);
                calabiCanvas.removeEventListener('mouseleave', mouseLeaveHandler, false);

                // Clear cached handlers
                resizeHandler = null;
                mouseMoveHandler = null;
                mouseLeaveHandler = null;

                if (animationId) {
                    cancelAnimationFrame(animationId); // Stop animation loop.
                    animationId = null;
                }
                // Clear the scene to free up resources
                if (scene) {
                    scene.children.forEach(child => {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) child.material.dispose();
                        scene.remove(child);
                    });
                    scene = null;
                }
                if (renderer) {
                    renderer.dispose();
                    renderer = null;
                }
                console.log("Calabi-Yau Renderer deactivated.");
            };

            /** Handles window resize events to update camera aspect ratio and renderer size. */
            this.onWindowResize = () => {
                if (camera && renderer) { // Defensive check
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }
            };

            /** Handles mouse movement for camera rotation. */
            this.onMouseMove = (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            };

            /** Resets mouse position when mouse leaves the canvas. */
            this.onMouseLeave = () => {
                mouse.x = 0;
                mouse.y = 0;
            };

            /** The main animation loop for rendering the Calabi-Yau manifold. */
            this.animate = () => {
                // Continue animation only if in Dome 9D and renderer is active
                if (FHS_RealityEngine.getState().currentDome !== 9 || !renderer) {
                    // If we were animating and now shouldn't be, ensure it's stopped
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                    return;
                }

                animationId = requestAnimationFrame(self.animate); // Request next frame.

                // Adjust rotation speed and color based on global state variables for supernatural effect.
                const state = FHS_RealityEngine.getState();
                const CSS_VARS = FHS_RealityEngine.getCSSVars();
                const baseSpeed = 0.001 + (state.syncLogs * 0.00002); // Further dampening log effect for subtler change.
                const gnosisFactor = state.gnosisLevel === 'TRANSCENDENT' ? 1.5 : (state.gnosisLevel === 'AWAKENING' ? 1.2 : 1);
                
                if (manifold) { // Ensure manifold exists before attempting to rotate
                    manifold.rotation.x += baseSpeed * gnosisFactor;
                    manifold.rotation.y += (baseSpeed * 2) * gnosisFactor;
                    manifold.rotation.z += (baseSpeed * 0.5) * gnosisFactor;

                    // Dynamic color based on memecoin price
                    // Smooth hue shift that loops: price * a large number for sensitivity, then modulo 360
                    const hueShift = (state.memecoinPrice * 80000) % 360; // Increased sensitivity for more active color change
                    manifold.material.color.setHSL(hueShift / 360, 1, 0.5); // Saturation and Lightness fixed
                }

                if (camera && scene && renderer) { // Ensure all necessary Three.js components exist
                    // Camera subtle movement based on mouse position
                    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02; // Slower, more subtle mouse tracking
                    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
                    camera.lookAt(scene.position);

                    renderer.render(scene, camera); // Render the scene.
                }
            };
        })() // End of CalabiYauRenderer singleton IIFE.
    }; // End of Visuals object.

    // ++ IGNITION ++
    // Start the FHS Reality Engine when the DOM is fully loaded.
    FHS_RealityEngine.init();

}); // End of DOMContentLoaded listener.
