import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Landing page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EduConnect - MTN South Africa Education Solutions</title>
        <link href="/static/css/design-system.css" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            .hero-section {
                position: relative;
                height: 100vh;
                display: grid;
                grid-template-columns: 1fr 1fr;
                overflow: hidden;
            }
            
            .hero-left {
                position: relative;
                background-image: url('/static/images/hero/classroom-hero.jpg');
                background-size: cover;
                background-position: center;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding: 3rem 2rem;
            }
            
            .hero-left::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%);
            }
            
            .hero-text {
                position: relative;
                z-index: 1;
                text-align: center;
                color: white;
                max-width: 600px;
            }
            
            .hero-text h1 {
                font-size: 1.5rem;
                font-weight: 700;
                color: white;
                margin-bottom: 0.5rem;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            
            .hero-text p {
                font-size: 1rem;
                color: white;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            }
            
            .hero-right {
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .login-card {
                width: 100%;
                max-width: 450px;
                padding: 2.5rem;
            }
            
            .logo-container {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .logo-container img {
                height: 200px;
                width: auto;
                margin: 0 auto;
            }
            
            .tabs {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                border-bottom: 2px solid #E5E7EB;
            }
            
            .tab {
                flex: 1;
                padding: 0.75rem 1rem;
                background: none;
                border: none;
                font-family: 'MTN Brighter Sans', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                color: #6B7280;
                cursor: pointer;
                border-bottom: 3px solid transparent;
                transition: all 0.2s;
                position: relative;
                top: 2px;
            }
            
            .tab.active {
                color: #FFCB00;
                border-bottom-color: #FFCB00;
            }
            
            .tab-content {
                display: none;
            }
            
            .tab-content.active {
                display: block;
            }
            
            .phone-input-group {
                display: flex;
                gap: 0.5rem;
            }
            
            .country-code {
                width: 120px;
                padding: 0.75rem 0.5rem;
                border: 2px solid #D1D5DB;
                border-radius: 0.5rem;
                font-family: 'MTN Brighter Sans', sans-serif;
                font-size: 0.875rem;
            }
            
            .otp-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            
            .otp-card {
                background: white;
                border-radius: 1rem;
                padding: 2.5rem;
                max-width: 450px;
                width: 100%;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            }
            
            .otp-inputs {
                display: flex;
                gap: 0.75rem;
                justify-content: center;
                margin: 2rem 0;
            }
            
            .otp-input {
                width: 3rem;
                height: 3.5rem;
                text-align: center;
                font-size: 1.5rem;
                font-weight: 700;
                border: 2px solid #D1D5DB;
                border-radius: 0.5rem;
                transition: all 0.2s;
            }
            
            .otp-input:focus {
                outline: none;
                border-color: #FFCB00;
                box-shadow: 0 0 0 3px rgba(255, 203, 0, 0.1);
            }
            
            .success-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1001;
                align-items: center;
                justify-content: center;
            }
            
            .success-card {
                background: white;
                border-radius: 1rem;
                padding: 3rem 2rem;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 1.5rem;
                background-color: #10B981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: white;
            }
            
            @media (max-width: 768px) {
                .hero-section {
                    grid-template-columns: 1fr;
                    height: auto;
                }
                
                .hero-left {
                    min-height: 40vh;
                }
                
                .hero-text h1 {
                    font-size: 1.25rem;
                }
                
                .logo-container img {
                    height: 150px;
                }
                
                .otp-inputs {
                    gap: 0.5rem;
                }
                
                .otp-input {
                    width: 2.5rem;
                    height: 3rem;
                    font-size: 1.25rem;
                }
            }
        </style>
    </head>
    <body>
        <!-- Main Landing Page -->
        <div class="hero-section">
            <!-- Left: Hero Image -->
            <div class="hero-left">
                <div class="hero-text">
                    <h1>Empowering Education Through Connectivity</h1>
                    <p>MTN South Africa Education Solutions</p>
                </div>
            </div>
            
            <!-- Right: Login Form -->
            <div class="hero-right">
                <div class="login-card">
                    <div class="logo-container">
                        <img src="/static/images/logos/mtn-educonnect-logo.png" alt="MTN EduConnect">
                    </div>
                    
                    <!-- Tabs -->
                    <div class="tabs">
                        <button class="tab active" onclick="switchTab('phone')">
                            <i class="fas fa-mobile-alt mr-2"></i> Phone
                        </button>
                        <button class="tab" onclick="switchTab('email')">
                            <i class="fas fa-envelope mr-2"></i> Email
                        </button>
                    </div>
                    
                    <!-- Phone Login -->
                    <div id="phone-tab" class="tab-content active">
                        <form onsubmit="handlePhoneLogin(event)">
                            <div class="form-group">
                                <div class="phone-input-group">
                                    <select class="country-code">
                                        <option value="+27">🇿🇦 +27</option>
                                    </select>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        class="form-input" 
                                        placeholder="Enter phone number"
                                        pattern="[0-9]{9,10}"
                                        required
                                    >
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary w-full">
                                Request OTP
                            </button>
                        </form>
                    </div>
                    
                    <!-- Email Login -->
                    <div id="email-tab" class="tab-content">
                        <form onsubmit="handleEmailLogin(event)">
                            <div class="form-group">
                                <input 
                                    type="email" 
                                    id="email" 
                                    class="form-input" 
                                    placeholder="Enter your email"
                                    required
                                >
                            </div>
                            <button type="submit" class="btn btn-primary w-full">
                                Request OTP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- OTP Modal -->
        <div id="otp-modal" class="otp-modal">
            <div class="otp-card">
                <div class="text-center mb-4">
                    <img src="/static/images/logos/mtn-educonnect-logo.png" alt="EduConnect" style="height: 80px; margin: 0 auto 1rem;">
                    <h3 class="mb-2">Enter Verification Code</h3>
                    <p class="text-secondary">We've sent a 6-digit code to<br><strong id="otp-destination"></strong></p>
                </div>
                
                <form onsubmit="handleOTPVerify(event)">
                    <div class="otp-inputs">
                        <input type="text" class="otp-input" maxlength="1" data-index="0">
                        <input type="text" class="otp-input" maxlength="1" data-index="1">
                        <input type="text" class="otp-input" maxlength="1" data-index="2">
                        <input type="text" class="otp-input" maxlength="1" data-index="3">
                        <input type="text" class="otp-input" maxlength="1" data-index="4">
                        <input type="text" class="otp-input" maxlength="1" data-index="5">
                    </div>
                    
                    <div id="otp-error" class="form-error text-center" style="display: none;"></div>
                    
                    <button type="submit" class="btn btn-primary w-full mb-3">
                        Verify
                    </button>
                    
                    <div class="text-center text-secondary">
                        <span>Resend in </span>
                        <strong id="resend-timer">0:45</strong>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Success Modal -->
        <div id="success-modal" class="success-modal">
            <div class="success-card">
                <div class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h3 class="mb-2">Authentication Successful!</h3>
                <p class="text-secondary mb-0">Redirecting to dashboard...</p>
            </div>
        </div>
        
        <script>
            // Tab switching
            function switchTab(tab) {
                // Update tab buttons
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                event.target.closest('.tab').classList.add('active');
                
                // Update tab content
                document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
                document.getElementById(tab + '-tab').classList.add('active');
            }
            
            // Store destination for OTP
            let otpDestination = '';
            
            // Phone login handler
            async function handlePhoneLogin(event) {
                event.preventDefault();
                const phone = document.getElementById('phone').value;
                const fullPhone = '+27' + phone;
                
                // Show loading state
                const btn = event.target.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner animate-spin"></i> Sending...';
                btn.disabled = true;
                
                try {
                    const response = await fetch('/api/auth/request-otp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ phone: fullPhone })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        otpDestination = fullPhone;
                        // Show OTP in browser console and alert (demo mode)
                        console.log('🔐 DEMO MODE - Your OTP:', data.otp);
                        alert('🔐 DEMO MODE\\n\\nYour OTP Code: ' + data.otp + '\\n\\n(Check browser console for details)');
                        showOTPModal(fullPhone);
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to send OTP. Please try again.');
                } finally {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            }
            
            // Email login handler
            async function handleEmailLogin(event) {
                event.preventDefault();
                const email = document.getElementById('email').value;
                
                // Show loading state
                const btn = event.target.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner animate-spin"></i> Sending...';
                btn.disabled = true;
                
                try {
                    const response = await fetch('/api/auth/request-otp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        otpDestination = email;
                        // Show OTP in browser console and alert (demo mode)
                        console.log('🔐 DEMO MODE - Your OTP:', data.otp);
                        alert('🔐 DEMO MODE\\n\\nYour OTP Code: ' + data.otp + '\\n\\n(Check browser console for details)');
                        showOTPModal(email);
                    } else {
                        alert('Error: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to send OTP. Please try again.');
                } finally {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            }
            
            // Show OTP modal
            function showOTPModal(destination) {
                document.getElementById('otp-destination').textContent = destination;
                document.getElementById('otp-modal').style.display = 'flex';
                
                // Focus first input
                const firstInput = document.querySelector('.otp-input[data-index="0"]');
                if (firstInput) firstInput.focus();
                
                // Start countdown
                startResendTimer();
                
                // Setup OTP input auto-advance
                setupOTPInputs();
            }
            
            // Close OTP modal
            function closeOTPModal() {
                document.getElementById('otp-modal').style.display = 'none';
                document.querySelectorAll('.otp-input').forEach(input => input.value = '');
                document.getElementById('otp-error').style.display = 'none';
            }
            
            // Setup OTP input auto-advance
            function setupOTPInputs() {
                const inputs = document.querySelectorAll('.otp-input');
                
                inputs.forEach((input, index) => {
                    input.addEventListener('input', (e) => {
                        if (e.target.value.length === 1 && index < inputs.length - 1) {
                            inputs[index + 1].focus();
                        }
                    });
                    
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                            inputs[index - 1].focus();
                        }
                    });
                    
                    // Only allow numbers
                    input.addEventListener('beforeinput', (e) => {
                        if (e.data && !/^[0-9]$/.test(e.data)) {
                            e.preventDefault();
                        }
                    });
                });
            }
            
            // Resend timer
            function startResendTimer() {
                let seconds = 45;
                const timerElement = document.getElementById('resend-timer');
                
                const interval = setInterval(() => {
                    seconds--;
                    const mins = Math.floor(seconds / 60);
                    const secs = seconds % 60;
                    timerElement.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
                    
                    if (seconds <= 0) {
                        clearInterval(interval);
                        timerElement.textContent = 'Resend now';
                        timerElement.style.color = '#FFCB00';
                        timerElement.style.cursor = 'pointer';
                        timerElement.onclick = () => {
                            // Resend OTP
                            timerElement.textContent = '0:45';
                            timerElement.style.color = '';
                            timerElement.style.cursor = '';
                            timerElement.onclick = null;
                            startResendTimer();
                        };
                    }
                }, 1000);
            }
            
            // OTP verification handler
            async function handleOTPVerify(event) {
                event.preventDefault();
                
                // Get OTP code
                const inputs = document.querySelectorAll('.otp-input');
                const otp = Array.from(inputs).map(input => input.value).join('');
                
                if (otp.length !== 6) {
                    showOTPError('Please enter all 6 digits');
                    return;
                }
                
                // Show loading state
                const btn = event.target.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner animate-spin"></i> Verifying...';
                btn.disabled = true;
                
                try {
                    const response = await fetch('/api/auth/verify-otp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            destination: otpDestination,
                            otp: otp 
                        })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        closeOTPModal();
                        showSuccessModal();
                    } else {
                        showOTPError(data.message || 'Invalid OTP code');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    showOTPError('Verification failed. Please try again.');
                } finally {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            }
            
            // Show OTP error
            function showOTPError(message) {
                const errorDiv = document.getElementById('otp-error');
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
                errorDiv.classList.add('animate-shake');
                
                setTimeout(() => {
                    errorDiv.classList.remove('animate-shake');
                }, 500);
            }
            
            // Show success modal
            function showSuccessModal() {
                document.getElementById('success-modal').style.display = 'flex';
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            }
            
            // Close modal on backdrop click
            document.getElementById('otp-modal')?.addEventListener('click', (e) => {
                if (e.target.id === 'otp-modal') {
                    closeOTPModal();
                }
            });
        </script>
    </body>
    </html>
  `)
})

// Dashboard placeholder
app.get('/dashboard', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - EduConnect</title>
        <link href="/static/css/design-system.css" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100">
        <div class="container mx-auto p-8">
            <div class="card text-center">
                <img src="/static/images/logos/mtn-educonnect-logo.png" alt="EduConnect" style="height: 120px; margin: 0 auto 2rem;">
                <h1 class="mb-4">Welcome to EduConnect!</h1>
                <p class="text-secondary mb-6">Complete your profile to get started</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <a href="/onboarding" class="btn btn-primary">
                        <i class="fas fa-user-check mr-2"></i> Complete Profile
                    </a>
                    <a href="/" class="btn btn-secondary">
                        <i class="fas fa-arrow-left mr-2"></i> Back to Login
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `)
})

// Onboarding wizard
app.get('/onboarding', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Complete Your Profile - EduConnect</title>
        <link href="/static/css/design-system.css" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            .onboarding-container {
                min-height: 100vh;
                background-color: #F9FAFB;
                padding: 2rem 1rem;
            }
            
            .onboarding-card {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                border-radius: 1rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .stepper {
                display: flex;
                justify-content: space-between;
                padding: 2rem;
                background: linear-gradient(135deg, #FFCB00 0%, #E6B800 100%);
                position: relative;
            }
            
            .step {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                z-index: 1;
            }
            
            .step-number {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.2);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 1.25rem;
                margin-bottom: 0.5rem;
                transition: all 0.3s;
            }
            
            .step.active .step-number {
                background: #000;
                transform: scale(1.1);
            }
            
            .step.completed .step-number {
                background: #10B981;
            }
            
            .step-label {
                font-size: 0.875rem;
                font-weight: 600;
                color: rgba(0, 0, 0, 0.7);
                text-align: center;
            }
            
            .step.active .step-label {
                color: #000;
            }
            
            .step-content {
                padding: 3rem 2rem;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .form-row.full {
                grid-template-columns: 1fr;
            }
            
            .role-options {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .role-card {
                padding: 1.5rem;
                border: 2px solid #E5E7EB;
                border-radius: 0.75rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .role-card:hover {
                border-color: #FFCB00;
                background: #FFFBF0;
            }
            
            .role-card.selected {
                border-color: #FFCB00;
                background: #FFCB00;
                color: #000;
            }
            
            .role-card i {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                display: block;
            }
            
            .upload-zone {
                border: 2px dashed #D1D5DB;
                border-radius: 0.75rem;
                padding: 3rem 2rem;
                text-align: center;
                transition: all 0.2s;
                cursor: pointer;
                margin-bottom: 1.5rem;
            }
            
            .upload-zone:hover {
                border-color: #FFCB00;
                background: #FFFBF0;
            }
            
            .upload-zone.dragover {
                border-color: #FFCB00;
                background: #FFCB00;
                color: #000;
            }
            
            .upload-icon {
                font-size: 3rem;
                color: #9CA3AF;
                margin-bottom: 1rem;
            }
            
            .upload-zone.dragover .upload-icon {
                color: #000;
            }
            
            .file-preview {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: #F3F4F6;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .actions {
                display: flex;
                justify-content: space-between;
                padding: 2rem;
                border-top: 1px solid #E5E7EB;
            }
            
            .success-screen {
                text-align: center;
                padding: 4rem 2rem;
            }
            
            .success-icon {
                width: 100px;
                height: 100px;
                margin: 0 auto 2rem;
                background: #10B981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                color: white;
            }
            
            @media (max-width: 768px) {
                .stepper {
                    padding: 1.5rem 1rem;
                }
                
                .step-label {
                    font-size: 0.75rem;
                }
                
                .step-number {
                    width: 40px;
                    height: 40px;
                    font-size: 1rem;
                }
                
                .form-row {
                    grid-template-columns: 1fr;
                }
                
                .role-options {
                    grid-template-columns: 1fr;
                }
                
                .step-content {
                    padding: 2rem 1.5rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="onboarding-container">
            <div class="onboarding-card">
                <!-- Progress Stepper -->
                <div class="stepper">
                    <div class="step active" id="step-indicator-1">
                        <div class="step-number">1</div>
                        <div class="step-label">Identity</div>
                    </div>
                    <div class="step" id="step-indicator-2">
                        <div class="step-number">2</div>
                        <div class="step-label">Authorization</div>
                    </div>
                    <div class="step" id="step-indicator-3">
                        <div class="step-number">3</div>
                        <div class="step-label">Verification</div>
                    </div>
                    <div class="step" id="step-indicator-4">
                        <div class="step-number">4</div>
                        <div class="step-label">Documents</div>
                    </div>
                </div>
                
                <!-- Step 1: Identity -->
                <div id="step-1" class="step-content">
                    <h2 class="mb-2">Complete Your Profile</h2>
                    <p class="text-secondary mb-4">Step 1 of 4 - Personal Information</p>
                    
                    <form id="form-step-1">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">First Name *</label>
                                <input type="text" name="firstName" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Last Name *</label>
                                <input type="text" name="lastName" class="form-input" required>
                            </div>
                        </div>
                        
                        <div class="form-row full">
                            <div class="form-group">
                                <label class="form-label">South African ID Number *</label>
                                <input 
                                    type="text" 
                                    name="idNumber" 
                                    class="form-input" 
                                    placeholder="13-digit ID number"
                                    pattern="[0-9]{13}"
                                    maxlength="13"
                                    required
                                >
                                <small class="text-secondary">Must be 13 digits</small>
                            </div>
                        </div>
                        
                        <div class="form-row full">
                            <div class="form-group">
                                <label class="form-label">Date of Birth *</label>
                                <input type="date" name="dateOfBirth" class="form-input" required>
                            </div>
                        </div>
                    </form>
                </div>
                
                <!-- Step 2: Authorization -->
                <div id="step-2" class="step-content" style="display: none;">
                    <h2 class="mb-2">Authorization</h2>
                    <p class="text-secondary mb-4">Step 2 of 4 - Role & Institution</p>
                    
                    <form id="form-step-2">
                        <div class="form-row full">
                            <div class="form-group">
                                <label class="form-label">Institution Name *</label>
                                <select name="institution" class="form-input" required>
                                    <option value="">Select your institution</option>
                                    <option value="school1">Johannesburg High School</option>
                                    <option value="school2">Cape Town Primary</option>
                                    <option value="school3">Pretoria Secondary</option>
                                    <option value="school4">Durban College</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Your Role *</label>
                            <div class="role-options">
                                <div class="role-card" data-role="student">
                                    <i class="fas fa-user-graduate"></i>
                                    <div>Student</div>
                                </div>
                                <div class="role-card" data-role="teacher">
                                    <i class="fas fa-chalkboard-teacher"></i>
                                    <div>Teacher</div>
                                </div>
                                <div class="role-card" data-role="administrator">
                                    <i class="fas fa-user-tie"></i>
                                    <div>Administrator</div>
                                </div>
                            </div>
                            <input type="hidden" name="role" required>
                        </div>
                        
                        <div class="form-row full">
                            <div class="form-group">
                                <label class="form-label" id="id-label">Student ID / Staff ID *</label>
                                <input type="text" name="staffId" class="form-input" placeholder="Enter your ID" required>
                            </div>
                        </div>
                    </form>
                </div>
                
                <!-- Step 3: Verification -->
                <div id="step-3" class="step-content" style="display: none;">
                    <h2 class="mb-2">Verification</h2>
                    <p class="text-secondary mb-4">Step 3 of 4 - Proof of Identity</p>
                    
                    <form id="form-step-3">
                        <div class="upload-zone" id="selfie-upload-zone">
                            <i class="fas fa-camera upload-icon"></i>
                            <h3 class="mb-2">Upload Selfie</h3>
                            <p class="text-secondary mb-3">Take a clear photo of your face</p>
                            <p class="text-secondary"><small>JPG or PNG • Max 5MB</small></p>
                            <input type="file" id="selfie-input" name="selfie" accept="image/*" style="display: none;" required>
                        </div>
                        <div id="selfie-preview"></div>
                    </form>
                </div>
                
                <!-- Step 4: Documents -->
                <div id="step-4" class="step-content" style="display: none;">
                    <h2 class="mb-2">Documents</h2>
                    <p class="text-secondary mb-4">Step 4 of 4 - Required Documents</p>
                    
                    <form id="form-step-4">
                        <div class="form-group">
                            <label class="form-label">ID Document *</label>
                            <div class="upload-zone" id="id-upload-zone">
                                <i class="fas fa-id-card upload-icon"></i>
                                <h4 class="mb-2">Upload ID Document</h4>
                                <p class="text-secondary mb-2">Drag & drop or click to upload</p>
                                <p class="text-secondary"><small>PDF, JPG, PNG • Max 5MB</small></p>
                                <input type="file" id="id-input" name="idDocument" accept=".pdf,.jpg,.jpeg,.png" style="display: none;" required>
                            </div>
                            <div id="id-preview"></div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Proof of Residence *</label>
                            <div class="upload-zone" id="residence-upload-zone">
                                <i class="fas fa-home upload-icon"></i>
                                <h4 class="mb-2">Upload Proof of Residence</h4>
                                <p class="text-secondary mb-2">Drag & drop or click to upload</p>
                                <p class="text-secondary"><small>PDF, JPG, PNG • Max 5MB</small></p>
                                <input type="file" id="residence-input" name="proofOfResidence" accept=".pdf,.jpg,.jpeg,.png" style="display: none;" required>
                            </div>
                            <div id="residence-preview"></div>
                        </div>
                    </form>
                </div>
                
                <!-- Success Screen -->
                <div id="step-success" class="step-content" style="display: none;">
                    <div class="success-screen">
                        <div class="success-icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <h1 class="mb-3">Profile Complete!</h1>
                        <div class="mb-4">
                            <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #FEF3C7; border-radius: 0.5rem;">
                                <i class="fas fa-clock" style="color: #F59E0B;"></i>
                                <span style="color: #92400E; font-weight: 600;">Verification in progress</span>
                            </div>
                        </div>
                        <p class="text-secondary mb-2">Thank you for submitting your documents.</p>
                        <p class="text-secondary mb-4">Your profile is under review and will be verified within <strong>24-48 hours</strong>.</p>
                        <a href="/dashboard" class="btn btn-primary">Go to Dashboard</a>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="actions" id="action-buttons">
                    <button type="button" class="btn btn-secondary" onclick="saveAndExit()">
                        <i class="fas fa-save mr-2"></i> Save & Exit
                    </button>
                    <div style="display: flex; gap: 1rem;">
                        <button type="button" class="btn btn-outline" id="btn-back" onclick="prevStep()" style="display: none;">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <button type="button" class="btn btn-primary" id="btn-continue" onclick="nextStep()">
                            Continue <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
            let currentStep = 1;
            const totalSteps = 4;
            const formData = {};
            
            // Role selection
            document.querySelectorAll('.role-card').forEach(card => {
                card.addEventListener('click', function() {
                    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    document.querySelector('input[name="role"]').value = this.dataset.role;
                    
                    // Update ID label based on role
                    const label = document.getElementById('id-label');
                    const role = this.dataset.role;
                    if (role === 'student') {
                        label.textContent = 'Student ID *';
                    } else if (role === 'teacher') {
                        label.textContent = 'Staff ID *';
                    } else {
                        label.textContent = 'Administrator ID *';
                    }
                });
            });
            
            // File upload handlers
            setupFileUpload('selfie-upload-zone', 'selfie-input', 'selfie-preview', 'image/*');
            setupFileUpload('id-upload-zone', 'id-input', 'id-preview', '.pdf,.jpg,.jpeg,.png');
            setupFileUpload('residence-upload-zone', 'residence-input', 'residence-preview', '.pdf,.jpg,.jpeg,.png');
            
            function setupFileUpload(zoneId, inputId, previewId, accept) {
                const zone = document.getElementById(zoneId);
                const input = document.getElementById(inputId);
                const preview = document.getElementById(previewId);
                
                zone.addEventListener('click', () => input.click());
                
                zone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    zone.classList.add('dragover');
                });
                
                zone.addEventListener('dragleave', () => {
                    zone.classList.remove('dragover');
                });
                
                zone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    zone.classList.remove('dragover');
                    const file = e.dataTransfer.files[0];
                    handleFile(file, input, preview, zone);
                });
                
                input.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    handleFile(file, input, preview, zone);
                });
            }
            
            function handleFile(file, input, preview, zone) {
                if (!file) return;
                
                // Validate file size (5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size must be less than 5MB');
                    return;
                }
                
                // Show preview
                preview.innerHTML = \`
                    <div class="file-preview">
                        <i class="fas fa-file text-2xl" style="color: #FFCB00;"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 600;">\${file.name}</div>
                            <div class="text-secondary" style="font-size: 0.875rem;">\${(file.size / 1024).toFixed(1)} KB</div>
                        </div>
                        <i class="fas fa-check-circle text-2xl" style="color: #10B981;"></i>
                    </div>
                \`;
                
                zone.style.display = 'none';
            }
            
            // Navigation
            function nextStep() {
                // Validate current step
                const form = document.getElementById('form-step-' + currentStep);
                if (form && !form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                
                // Save form data
                if (form) {
                    const data = new FormData(form);
                    for (let [key, value] of data.entries()) {
                        formData[key] = value;
                    }
                }
                
                if (currentStep === totalSteps) {
                    // Submit all data
                    submitOnboarding();
                    return;
                }
                
                // Move to next step
                document.getElementById('step-' + currentStep).style.display = 'none';
                document.getElementById('step-indicator-' + currentStep).classList.remove('active');
                document.getElementById('step-indicator-' + currentStep).classList.add('completed');
                
                currentStep++;
                
                document.getElementById('step-' + currentStep).style.display = 'block';
                document.getElementById('step-indicator-' + currentStep).classList.add('active');
                
                // Update buttons
                document.getElementById('btn-back').style.display = currentStep > 1 ? 'block' : 'none';
                document.getElementById('btn-continue').innerHTML = currentStep === totalSteps 
                    ? '<i class="fas fa-check mr-2"></i> Submit' 
                    : 'Continue <i class="fas fa-arrow-right ml-2"></i>';
            }
            
            function prevStep() {
                if (currentStep <= 1) return;
                
                document.getElementById('step-' + currentStep).style.display = 'none';
                document.getElementById('step-indicator-' + currentStep).classList.remove('active');
                
                currentStep--;
                
                document.getElementById('step-' + currentStep).style.display = 'block';
                document.getElementById('step-indicator-' + currentStep).classList.remove('completed');
                document.getElementById('step-indicator-' + currentStep).classList.add('active');
                
                // Update buttons
                document.getElementById('btn-back').style.display = currentStep > 1 ? 'block' : 'none';
                document.getElementById('btn-continue').innerHTML = 'Continue <i class="fas fa-arrow-right ml-2"></i>';
            }
            
            async function submitOnboarding() {
                // Show loading
                const btn = document.getElementById('btn-continue');
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i> Submitting...';
                
                try {
                    const response = await fetch('/api/onboarding/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        // Show success screen
                        document.getElementById('step-' + currentStep).style.display = 'none';
                        document.getElementById('step-indicator-' + currentStep).classList.remove('active');
                        document.getElementById('step-indicator-' + currentStep).classList.add('completed');
                        document.getElementById('step-success').style.display = 'block';
                        document.getElementById('action-buttons').style.display = 'none';
                    } else {
                        alert('Error: ' + data.message);
                        btn.disabled = false;
                        btn.innerHTML = '<i class="fas fa-check mr-2"></i> Submit';
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Submission failed. Please try again.');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-check mr-2"></i> Submit';
                }
            }
            
            function saveAndExit() {
                if (confirm('Save your progress and exit? You can continue later.')) {
                    // Save to localStorage
                    localStorage.setItem('onboardingProgress', JSON.stringify({
                        step: currentStep,
                        data: formData
                    }));
                    window.location.href = '/dashboard';
                }
            }
            
            // Load saved progress
            window.addEventListener('load', () => {
                const saved = localStorage.getItem('onboardingProgress');
                if (saved) {
                    const progress = JSON.parse(saved);
                    if (confirm('Continue from where you left off?')) {
                        // TODO: Restore progress
                    }
                }
            });
        </script>
    </body>
    </html>
  `)
})

// API: Request OTP
app.post('/api/auth/request-otp', async (c) => {
  const body = await c.req.json()
  const { phone, email } = body
  const destination = phone || email
  
  // Generate random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  
  // Log OTP to console (demo mode)
  console.log('\\n========================================')
  console.log('📱 OTP REQUEST')
  console.log('========================================')
  console.log('Destination:', destination)
  console.log('OTP Code:', otp)
  console.log('Valid for: 45 seconds')
  console.log('========================================\\n')
  
  return c.json({
    success: true,
    message: 'OTP sent successfully. Check console for OTP code.',
    destination,
    otp // Include in response for demo mode
  })
})

// API: Verify OTP
app.post('/api/auth/verify-otp', async (c) => {
  const body = await c.req.json()
  const { destination, otp } = body
  
  // Demo mode: Accept any 6-digit OTP
  if (otp && otp.length === 6) {
    console.log('\\n========================================')
    console.log('✅ OTP VERIFIED')
    console.log('========================================')
    console.log('Destination:', destination)
    console.log('OTP:', otp)
    console.log('Status: Success')
    console.log('========================================\\n')
    
    return c.json({
      success: true,
      message: 'OTP verified successfully',
      role: 'user' // Default role
    })
  } else {
    return c.json({
      success: false,
      message: 'Invalid OTP code'
    }, 400)
  }
})

// API: Submit onboarding
app.post('/api/onboarding/submit', async (c) => {
  const body = await c.req.json()
  
  // Log onboarding data (demo mode)
  console.log('\n========================================')
  console.log('📝 ONBOARDING SUBMISSION')
  console.log('========================================')
  console.log('Name:', body.firstName, body.lastName)
  console.log('ID Number:', body.idNumber)
  console.log('Date of Birth:', body.dateOfBirth)
  console.log('Institution:', body.institution)
  console.log('Role:', body.role)
  console.log('Staff ID:', body.staffId)
  console.log('Status: Pending Verification')
  console.log('Expected Review Time: 24-48 hours')
  console.log('========================================\n')
  
  return c.json({
    success: true,
    message: 'Onboarding completed successfully',
    status: 'pending_verification',
    estimatedReviewTime: '24-48 hours'
  })
})

// Health check
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok', 
    service: 'educonnect', 
    version: '1.0.0' 
  })
})

export default app
