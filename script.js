/* ============================================
   NexusID — Premium Authentication Forms
   Interactive Logic & Validation
   Developed by: Martaz Ahmad, Danial Ahmad Khadim, Danial Ahmad Anwar
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateCounters();
    initPasswordStrength();
    initUsernameCheck();
    initForgotModal();
    initFormListeners();
});

// === Floating Particles ===
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (8 + Math.random() * 12) + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
        container.appendChild(p);
    }
}

// === Counter Animation ===
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const start = performance.now();
        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = isDecimal ? (target * eased).toFixed(1) : Math.floor(target * eased);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// === Multi-Step Form Navigation ===
let currentStep = 1;
const totalSteps = 3;

function nextStep(from) {
    if (!validateStep(from)) return;
    const stepEl = document.getElementById('step' + from);
    stepEl.style.animation = 'none';
    stepEl.offsetHeight; // reflow
    stepEl.classList.remove('active');

    // Update progress
    document.querySelector(`.progress-step[data-step="${from}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${from}"]`).classList.add('completed');
    const fill = document.getElementById('progressFill' + from);
    if (fill) fill.style.width = '100%';

    currentStep = from + 1;
    const nextEl = document.getElementById('step' + currentStep);
    nextEl.style.animation = 'stepIn 0.5s ease-out';
    nextEl.classList.add('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');

    // Hide social buttons on step 2/3
    toggleSocialSection(currentStep === 1);
}

function prevStep(from) {
    document.getElementById('step' + from).classList.remove('active');
    currentStep = from - 1;
    const prevEl = document.getElementById('step' + currentStep);
    prevEl.style.animation = 'stepIn 0.5s ease-out';
    prevEl.classList.add('active');

    // Update progress
    document.querySelector(`.progress-step[data-step="${from}"]`).classList.remove('active');
    const fill = document.getElementById('progressFill' + currentStep);
    if (fill) fill.style.width = '0%';
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');

    toggleSocialSection(currentStep === 1);
}

function toggleSocialSection(show) {
    const divider = document.getElementById('socialDivider');
    const buttons = document.getElementById('socialButtons');
    const footer = document.getElementById('formFooter');
    if (divider) divider.style.display = show ? 'flex' : 'none';
    if (buttons) buttons.style.display = show ? 'grid' : 'none';
    if (footer) footer.style.display = show ? 'block' : 'none';
}

// === Validation ===
function validateStep(step) {
    let valid = true;
    if (step === 1) {
        valid = validateField('firstName', v => v.trim().length >= 2, 'First name must be at least 2 characters') && valid;
        valid = validateField('lastName', v => v.trim().length >= 2, 'Last name must be at least 2 characters') && valid;
        valid = validateField('username', v => /^[a-zA-Z0-9_]{3,20}$/.test(v), 'Username: 3-20 chars, letters, numbers, underscore') && valid;
        valid = validateField('dob', v => {
            if (!v) return false;
            const age = (new Date() - new Date(v)) / (365.25 * 24 * 60 * 60 * 1000);
            return age >= 13;
        }, 'You must be at least 13 years old') && valid;
        const gender = document.querySelector('input[name="gender"]:checked');
        const genderGroup = document.getElementById('group-gender');
        const genderError = document.getElementById('error-gender');
        if (!gender) { genderGroup.classList.add('has-error'); genderError.textContent = 'Please select your gender'; valid = false; }
        else { genderGroup.classList.remove('has-error'); }
    } else if (step === 2) {
        valid = validateField('email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email address') && valid;
        valid = validateField('country', v => v !== '', 'Please select your country') && valid;
    }
    return valid;
}

function validateField(id, check, message) {
    const el = document.getElementById(id);
    const group = document.getElementById('group-' + id);
    const error = document.getElementById('error-' + id);
    if (!el || !group) return true;
    const val = el.value;
    if (!check(val)) {
        group.classList.add('has-error');
        group.classList.remove('has-success');
        if (error) error.textContent = message;
        // shake animation
        group.style.animation = 'none';
        group.offsetHeight;
        group.style.animation = 'shake 0.4s ease-in-out';
        return false;
    }
    group.classList.remove('has-error');
    group.classList.add('has-success');
    return true;
}

// Shake keyframe injection
const shakeStyle = document.createElement('style');
shakeStyle.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}';
document.head.appendChild(shakeStyle);

// === Password Strength ===
function initPasswordStrength() {
    const pw = document.getElementById('password');
    if (!pw) return;
    pw.addEventListener('input', () => {
        const val = pw.value;
        const meter = document.getElementById('passwordStrength');
        const text = document.getElementById('strengthText');
        const checks = {
            length: val.length >= 8,
            upper: /[A-Z]/.test(val),
            lower: /[a-z]/.test(val),
            number: /[0-9]/.test(val),
            special: /[^A-Za-z0-9]/.test(val)
        };
        // Update requirement indicators
        Object.keys(checks).forEach(k => {
            const el = document.getElementById('req-' + k);
            if (el) el.classList.toggle('met', checks[k]);
        });
        const score = Object.values(checks).filter(Boolean).length;
        let strength = '';
        if (val.length === 0) { strength = ''; text.textContent = 'Password Strength'; }
        else if (score <= 1) { strength = 'weak'; text.textContent = 'Weak'; }
        else if (score <= 2) { strength = 'fair'; text.textContent = 'Fair'; }
        else if (score <= 3) { strength = 'good'; text.textContent = 'Good'; }
        else { strength = 'strong'; text.textContent = 'Strong'; }
        meter.setAttribute('data-strength', strength);
    });
}

// === Username Availability Simulation ===
function initUsernameCheck() {
    const un = document.getElementById('username');
    if (!un) return;
    let timeout;
    const indicator = document.getElementById('usernameAvailability');
    un.addEventListener('input', () => {
        clearTimeout(timeout);
        indicator.className = 'availability-indicator';
        indicator.textContent = '';
        if (un.value.length < 3) return;
        timeout = setTimeout(() => {
            const taken = ['admin', 'test', 'user', 'root'];
            if (taken.includes(un.value.toLowerCase())) {
                indicator.className = 'availability-indicator taken';
                indicator.textContent = '✗ Taken';
            } else {
                indicator.className = 'availability-indicator available';
                indicator.textContent = '✓ Available';
            }
        }, 600);
    });
}

// === Toggle Password Visibility ===
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// === Form Submissions ===
function initFormListeners() {
    // Sign Up
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', e => {
            e.preventDefault();
            // Validate step 3
            let valid = true;
            const pw = document.getElementById('password');
            const cpw = document.getElementById('confirmPassword');
            const terms = document.getElementById('terms');
            valid = validateField('password', v => v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v), 'Password must meet all requirements') && valid;
            valid = validateField('confirmPassword', v => v === pw.value && v.length > 0, 'Passwords do not match') && valid;
            if (!terms.checked) {
                document.getElementById('group-terms').classList.add('has-error');
                document.getElementById('error-terms').textContent = 'You must agree to the terms';
                valid = false;
            } else {
                document.getElementById('group-terms').classList.remove('has-error');
            }
            if (!valid) return;

            // Loading state
            const btn = document.getElementById('submitBtn');
            btn.classList.add('loading');
            btn.disabled = true;
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.disabled = false;
                document.getElementById('successModal').classList.add('active');
            }, 2000);
        });
    }

    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            let valid = true;
            valid = validateField('loginEmail', v => v.trim().length >= 3, 'Please enter your email or username') && valid;
            valid = validateField('loginPassword', v => v.length >= 1, 'Please enter your password') && valid;
            if (!valid) return;

            const btn = document.getElementById('loginBtn');
            btn.classList.add('loading');
            btn.disabled = true;
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.disabled = false;
                document.getElementById('loginToast').classList.add('active');
                setTimeout(() => {
                    document.getElementById('loginToast').classList.remove('active');
                }, 3500);
            }, 1500);
        });
    }

    // Forgot Password
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', e => {
            e.preventDefault();
            const valid = validateField('forgotEmail', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email');
            if (!valid) return;
            const btn = document.getElementById('resetBtn');
            btn.classList.add('loading');
            btn.disabled = true;
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.disabled = false;
                document.getElementById('forgotModal').classList.remove('active');
                // Show a brief confirmation
                const toast = document.getElementById('loginToast');
                if (toast) {
                    toast.querySelector('strong').textContent = 'Reset Link Sent!';
                    toast.querySelector('span').textContent = 'Check your email inbox.';
                    toast.classList.add('active');
                    setTimeout(() => toast.classList.remove('active'), 3500);
                }
            }, 1500);
        });
    }

    // Clear errors on input
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', () => {
            const group = el.closest('.input-group');
            if (group) group.classList.remove('has-error');
        });
    });
}

// === Forgot Password Modal ===
function initForgotModal() {
    const link = document.getElementById('forgotPasswordLink');
    const modal = document.getElementById('forgotModal');
    const close = document.getElementById('closeForgotModal');
    if (!link || !modal) return;
    link.addEventListener('click', e => { e.preventDefault(); modal.classList.add('active'); });
    if (close) close.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
}

// Make functions globally accessible
window.nextStep = nextStep;
window.prevStep = prevStep;
window.togglePassword = togglePassword;
