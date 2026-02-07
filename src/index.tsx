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
                <p class="text-secondary mb-0" id="success-message">Redirecting...</p>
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
                        // Store user info for redirect
                        sessionStorage.setItem('educonnect_user', JSON.stringify(data.user));
                        closeOTPModal();
                        showSuccessModal(data.user);
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
            function showSuccessModal(user) {
                const modal = document.getElementById('success-modal');
                const message = document.getElementById('success-message');
                
                // Update success message based on user type
                if (user.type === 'single') {
                    message.textContent = 'Welcome! Redirecting to complete your profile...';
                } else {
                    message.textContent = 'Welcome back! Redirecting to dashboard...';
                }
                
                modal.style.display = 'flex';
                
                // Redirect after 2 seconds to appropriate page
                setTimeout(() => {
                    window.location.href = user.redirectTo;
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
                <p class="text-secondary mb-6">Your education solutions portal</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="/solution-builder" class="btn btn-primary">
                        <i class="fas fa-rocket mr-2"></i> Solution Builder
                    </a>
                    <a href="/onboarding" class="btn btn-outline">
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

// Solution Builder
app.get('/solution-builder', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solution Builder - EduConnect</title>
        <link href="/static/css/design-system.css" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            body {
                margin: 0;
                font-family: 'MTN Brighter Sans', sans-serif;
                overflow: hidden;
            }
            
            .builder-container {
                display: grid;
                grid-template-columns: 240px 1fr 360px;
                grid-template-rows: 64px 1fr;
                height: 100vh;
                background: #F9FAFB;
            }
            
            /* Header */
            .header {
                grid-column: 1 / -1;
                background: white;
                border-bottom: 1px solid #E5E7EB;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 1.5rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                z-index: 100;
            }
            
            .header-left {
                display: flex;
                align-items: center;
                gap: 2rem;
            }
            
            .logo-section {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-weight: 700;
                font-size: 1.125rem;
            }
            
            .logo-icon {
                width: 32px;
                height: 32px;
                background: #FFCB00;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
            }
            
            .header-right {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .nav-link {
                padding: 0.5rem 1rem;
                color: #6B7280;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.2s;
            }
            
            .nav-link:hover {
                color: #000;
            }
            
            .nav-link.active {
                color: #000;
                border-bottom: 2px solid #FFCB00;
            }
            
            .icon-button {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #F3F4F6;
                border: none;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .icon-button:hover {
                background: #E5E7EB;
            }
            
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #FFCB00, #E6B800);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: #000;
                cursor: pointer;
            }
            
            /* Left Sidebar - Build History */
            .left-sidebar {
                background: white;
                border-right: 1px solid #E5E7EB;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .sidebar-header {
                padding: 1.5rem 1rem;
                border-bottom: 1px solid #E5E7EB;
            }
            
            .sidebar-title {
                font-size: 0.75rem;
                font-weight: 700;
                color: #6B7280;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 1rem;
            }
            
            .create-build-btn {
                width: 100%;
                padding: 0.75rem 1rem;
                background: #FFCB00;
                border: none;
                border-radius: 0.5rem;
                font-weight: 700;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                transition: background 0.2s;
            }
            
            .create-build-btn:hover {
                background: #E6B800;
            }
            
            .build-list {
                flex: 1;
                padding: 0.5rem;
            }
            
            .build-item {
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                border-radius: 0.5rem;
                cursor: pointer;
                transition: background 0.2s;
                border: 1px solid transparent;
            }
            
            .build-item:hover {
                background: #F9FAFB;
            }
            
            .build-item.active {
                background: #FFFBF0;
                border-color: #FFCB00;
            }
            
            .build-item-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            
            .build-icon {
                width: 32px;
                height: 32px;
                background: #F3F4F6;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .build-details {
                flex: 1;
                margin-left: 0.75rem;
            }
            
            .build-name {
                font-weight: 600;
                font-size: 0.875rem;
                color: #111827;
                margin-bottom: 0.25rem;
            }
            
            .build-meta {
                font-size: 0.75rem;
                color: #6B7280;
            }
            
            .status-badge {
                display: inline-block;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                font-weight: 600;
                margin-top: 0.5rem;
            }
            
            .status-active {
                background: #DBEAFE;
                color: #1E40AF;
            }
            
            .status-saved {
                background: #D1FAE5;
                color: #065F46;
            }
            
            .status-offered {
                background: #FEF3C7;
                color: #92400E;
            }
            
            /* Center Panel - Main Content */
            .main-content {
                overflow-y: auto;
                padding: 2rem;
            }
            
            /* Progress Stepper */
            .stepper {
                display: flex;
                justify-content: space-between;
                background: white;
                padding: 2rem;
                border-radius: 0.75rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                margin-bottom: 2rem;
                position: relative;
            }
            
            .stepper::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 5%;
                right: 5%;
                height: 2px;
                background: #E5E7EB;
                z-index: 0;
            }
            
            .stepper-step {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                z-index: 1;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .stepper-number {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: #F3F4F6;
                color: #9CA3AF;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 1.125rem;
                margin-bottom: 0.75rem;
                transition: all 0.3s;
                border: 3px solid white;
                box-shadow: 0 0 0 2px #E5E7EB;
            }
            
            .stepper-step.active .stepper-number {
                background: #FFCB00;
                color: #000;
                box-shadow: 0 0 0 3px #FFCB00;
                transform: scale(1.1);
            }
            
            .stepper-step.completed .stepper-number {
                background: #10B981;
                color: white;
                box-shadow: 0 0 0 2px #10B981;
            }
            
            .stepper-label {
                font-size: 0.875rem;
                font-weight: 600;
                color: #9CA3AF;
                text-align: center;
                transition: all 0.3s;
            }
            
            .stepper-step.active .stepper-label {
                color: #000;
                font-weight: 700;
            }
            
            .stepper-step.completed .stepper-label {
                color: #10B981;
            }
            
            /* Step Content */
            .step-content {
                display: none;
            }
            
            .step-header {
                margin-bottom: 2rem;
            }
            
            /* Target Cards */
            .targets-container {
                margin-bottom: 2rem;
            }
            
            .target-card {
                background: #F9FAFB;
                border: 2px solid #E5E7EB;
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                transition: all 0.2s;
            }
            
            .target-card:hover {
                border-color: #FFCB00;
                background: #FFFBF0;
            }
            
            .target-icon {
                width: 48px;
                height: 48px;
                border-radius: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            
            .target-info {
                flex: 1;
            }
            
            .target-type {
                font-size: 0.75rem;
                color: #6B7280;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 0.25rem;
            }
            
            .target-name {
                font-weight: 600;
                font-size: 1rem;
                margin-bottom: 0.25rem;
            }
            
            .target-details {
                font-size: 0.875rem;
                color: #6B7280;
            }
            
            .target-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .icon-btn {
                width: 36px;
                height: 36px;
                border-radius: 0.5rem;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                background: white;
                color: #6B7280;
            }
            
            .icon-btn:hover {
                background: #F3F4F6;
                color: #000;
            }
            
            .icon-btn.delete {
                color: #EF4444;
            }
            
            .icon-btn.delete:hover {
                background: #FEE2E2;
            }
            
            /* Modal Styles */
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                align-items: center;
                justify-content: center;
            }
            
            .modal.active {
                display: flex;
            }
            
            .modal-content {
                background: white;
                border-radius: 0.75rem;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow: auto;
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #E5E7EB;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .modal-header h3 {
                font-size: 1.25rem;
                font-weight: 700;
                margin: 0;
            }
            
            .modal-close {
                width: 32px;
                height: 32px;
                border-radius: 0.5rem;
                border: none;
                background: #F3F4F6;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            
            .modal-close:hover {
                background: #E5E7EB;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            /* Target Type Grid */
            .target-type-grid {
                display: grid;
                gap: 1rem;
            }
            
            .target-type-card {
                padding: 1.5rem;
                border: 2px solid #E5E7EB;
                border-radius: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .target-type-card:hover {
                border-color: #FFCB00;
                background: #FFFBF0;
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .target-type-icon {
                width: 56px;
                height: 56px;
                border-radius: 0.75rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .target-type-name {
                font-weight: 700;
                font-size: 1.125rem;
                margin-bottom: 0.25rem;
            }
            
            .target-type-desc {
                font-size: 0.875rem;
                color: #6B7280;
            }
            
            /* Form Hint */
            .form-hint {
                font-size: 0.875rem;
                color: #6B7280;
                margin-top: 0.5rem;
            }
            
            /* Target Detail Forms */
            .target-detail-section {
                border: 2px solid #E5E7EB;
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
                background: #F9FAFB;
            }
            
            .target-detail-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #E5E7EB;
            }
            
            .target-detail-icon {
                width: 48px;
                height: 48px;
                border-radius: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            
            .target-detail-info h3 {
                font-size: 1.125rem;
                font-weight: 700;
                margin: 0 0 0.25rem 0;
            }
            
            .target-detail-info .target-type-label {
                font-size: 0.75rem;
                color: #6B7280;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            
            /* Solution Selection */
            .solution-target-section {
                border: 2px solid #E5E7EB;
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
                background: white;
            }
            
            .solution-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .solution-item {
                background: #F9FAFB;
                border: 2px solid #E5E7EB;
                border-radius: 0.75rem;
                padding: 1.5rem;
                position: relative;
            }
            
            .mandatory-solution {
                background: #FEF3C7;
                border: 2px solid #F59E0B;
                position: relative;
            }
            
            .mandatory-solution::before {
                content: '⚠️ Mandatory';
                position: absolute;
                top: -12px;
                left: 12px;
                background: #F59E0B;
                color: white;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 700;
            }
            
            .solution-item-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 1rem;
            }
            
            .solution-item-number {
                font-weight: 700;
                color: #6B7280;
                font-size: 0.875rem;
            }
            
            .solution-remove-btn {
                background: #FEE2E2;
                color: #EF4444;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 0.875rem;
                font-weight: 600;
                transition: all 0.2s;
            }
            
            .solution-remove-btn:hover {
                background: #EF4444;
                color: white;
            }
            
            .hierarchy-select {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .add-solution-btn {
                width: 100%;
                padding: 1rem;
                border: 2px dashed #D1D5DB;
                border-radius: 0.75rem;
                background: white;
                color: #6B7280;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s;
                margin-top: 1rem;
            }
            
            .add-solution-btn:hover {
                border-color: #FFCB00;
                background: #FFFBF0;
                color: #000;
            }
            
            /* Completion Badge Styles */
            .completion-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.375rem;
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.025em;
            }
            
            .completion-badge.complete {
                background: #D1FAE5;
                color: #065F46;
            }
            
            .completion-badge.incomplete {
                background: #FEE2E2;
                color: #991B1B;
            }
            
            .completion-badge.pending {
                background: #F3F4F6;
                color: #6B7280;
            }
            
            .completion-badge i {
                font-size: 0.875rem;
            }
            
            .config-card {
                background: white;
                border-radius: 0.75rem;
                padding: 2rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                margin-bottom: 2rem;
            }
            .config-card {
                background: white;
                border-radius: 0.75rem;
                padding: 2rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                margin-bottom: 2rem;
            }
            
            .card-title {
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
            }
            
            .card-subtitle {
                color: #6B7280;
                margin-bottom: 2rem;
            }
            
            .section-header {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid #E5E7EB;
            }
            
            .section-icon {
                width: 40px;
                height: 40px;
                background: #FFFBF0;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #000;
            }
            
            .section-title {
                font-weight: 700;
                font-size: 1.125rem;
            }
            
            .form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .form-grid.full {
                grid-template-columns: 1fr;
            }
            
            .location-section {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .map-preview {
                width: 150px;
                height: 150px;
                background: #E5E7EB;
                border-radius: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #9CA3AF;
            }
            
            .coverage-options {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .coverage-option {
                flex: 1;
                padding: 1rem;
                border: 2px solid #E5E7EB;
                border-radius: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .coverage-option:hover {
                border-color: #FFCB00;
                background: #FFFBF0;
            }
            
            .coverage-option.selected {
                border-color: #FFCB00;
                background: #FFFBF0;
            }
            
            .coverage-radio {
                width: 20px;
                height: 20px;
                border: 2px solid #D1D5DB;
                border-radius: 50%;
                position: relative;
            }
            
            .coverage-option.selected .coverage-radio {
                border-color: #FFCB00;
            }
            
            .coverage-option.selected .coverage-radio::after {
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                background: #FFCB00;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            
            .action-bar {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                padding-top: 2rem;
                border-top: 1px solid #E5E7EB;
            }
            
            .action-bar > div {
                display: flex;
                gap: 1rem;
            }
            
            /* Right Sidebar - AI Assistant */
            .right-sidebar {
                background: white;
                border-left: 1px solid #E5E7EB;
                display: flex;
                flex-direction: column;
                position: relative;
            }
            
            .right-sidebar.collapsed {
                width: 48px;
            }
            
            .assistant-header {
                padding: 1.5rem;
                border-bottom: 1px solid #E5E7EB;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .assistant-info {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .assistant-avatar {
                width: 40px;
                height: 40px;
                background: #FFCB00;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                position: relative;
            }
            
            .online-indicator {
                width: 12px;
                height: 12px;
                background: #10B981;
                border: 2px solid white;
                border-radius: 50%;
                position: absolute;
                bottom: 0;
                right: 0;
            }
            
            .assistant-name {
                font-weight: 700;
            }
            
            .assistant-status {
                font-size: 0.75rem;
                color: #10B981;
            }
            
            .collapse-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                color: #6B7280;
            }
            
            .chat-container {
                flex: 1;
                overflow-y: auto;
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .message {
                display: flex;
                gap: 0.75rem;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: #FFCB00;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.875rem;
                font-weight: 700;
                flex-shrink: 0;
            }
            
            .message-content {
                flex: 1;
                background: #F9FAFB;
                padding: 1rem;
                border-radius: 0.75rem;
                font-size: 0.875rem;
                line-height: 1.5;
            }
            
            .message-time {
                font-size: 0.75rem;
                color: #9CA3AF;
                margin-top: 0.25rem;
            }
            
            .recommendation-card {
                background: #FFFBF0;
                border: 1px solid #FFCB00;
                border-radius: 0.5rem;
                padding: 1rem;
                margin-top: 0.5rem;
            }
            
            .recommendation-title {
                font-weight: 700;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .recommendation-options {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-top: 0.75rem;
            }
            
            .recommendation-option {
                padding: 0.75rem;
                background: white;
                border-radius: 0.5rem;
                font-size: 0.875rem;
            }
            
            .option-title {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .option-detail {
                color: #6B7280;
                font-size: 0.75rem;
            }
            
            .chat-input-container {
                padding: 1rem 1.5rem;
                border-top: 1px solid #E5E7EB;
            }
            
            .chat-input-wrapper {
                display: flex;
                gap: 0.75rem;
                align-items: flex-end;
            }
            
            .chat-input {
                flex: 1;
                padding: 0.75rem 1rem;
                border: 1px solid #E5E7EB;
                border-radius: 0.5rem;
                resize: none;
                font-family: inherit;
                font-size: 0.875rem;
            }
            
            .send-btn {
                padding: 0.75rem 1rem;
                background: #FFCB00;
                border: none;
                border-radius: 0.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }
            
            .send-btn:hover {
                background: #E6B800;
            }
            
            .compare-link {
                margin-top: 0.5rem;
                font-size: 0.75rem;
            }
            
            .compare-link a {
                color: #3B82F6;
                text-decoration: none;
            }
            
            .compare-link a:hover {
                text-decoration: underline;
            }
            
            /* Mobile Responsive */
            /* Mobile Menu Button */
            .mobile-menu-btn {
                display: none;
                background: none;
                border: none;
                color: #6B7280;
                font-size: 1.25rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 0.5rem;
                transition: all 0.2s;
            }
            
            .mobile-menu-btn:hover {
                background: #F3F4F6;
                color: #000;
            }
            
            /* Floating Action Button (Chat FAB) */
            .chat-fab {
                display: none;
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 56px;
                height: 56px;
                background: #FFCB00;
                border: none;
                border-radius: 50%;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                cursor: pointer;
                z-index: 100;
                transition: all 0.3s;
            }
            
            .chat-fab:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
            }
            
            .chat-fab:active {
                transform: scale(0.95);
            }
            
            .chat-fab i {
                color: #000;
                font-size: 1.5rem;
            }
            
            /* Sidebar Overlay for Mobile */
            .sidebar-overlay {
                display: none;
                position: fixed;
                top: 64px;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 45;
                backdrop-filter: blur(2px);
            }
            
            /* Desktop/Mobile visibility helpers */
            .desktop-only {
                display: block;
            }
            
            .mobile-only {
                display: none;
            }
            
            @media (max-width: 1024px) {
                .builder-container {
                    grid-template-columns: 1fr;
                }
                
                /* Show mobile controls */
                .mobile-menu-btn {
                    display: block;
                }
                
                .mobile-only {
                    display: block;
                }
                
                .desktop-only {
                    display: none;
                }
                
                .chat-fab {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                /* Hide logo text on small screens */
                .logo-text {
                    display: none;
                }
                
                .left-sidebar {
                    position: fixed;
                    left: -240px;
                    top: 64px;
                    bottom: 0;
                    width: 240px;
                    z-index: 50;
                    transition: left 0.3s;
                    background: white;
                    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
                }
                
                .left-sidebar.open {
                    left: 0;
                }
                
                .right-sidebar {
                    position: fixed;
                    right: -360px;
                    top: 64px;
                    bottom: 0;
                    width: 360px;
                    z-index: 50;
                    transition: right 0.3s;
                    background: white;
                    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
                }
                
                .right-sidebar.open {
                    right: 0;
                }
                
                .form-grid {
                    grid-template-columns: 1fr;
                }
                
                /* Stack action bar buttons vertically on mobile */
                .action-bar {
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .action-bar > div {
                    width: 100%;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .action-bar button {
                    width: 100%;
                }
            }
            
            @media (max-width: 768px) {
                .logo-section span {
                    font-size: 0.875rem;
                }
                
                .right-sidebar {
                    width: 100%;
                    right: -100%;
                }
                
                .right-sidebar.open {
                    right: 0;
                }
                
                .left-sidebar {
                    width: 280px;
                    left: -280px;  /* Match width to fully hide */
                }
                
                .left-sidebar.open {
                    left: 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="builder-container">
            <!-- Header -->
            <div class="header">
                <div class="header-left">
                    <!-- Mobile Menu Button (Left Sidebar) -->
                    <button class="mobile-menu-btn" onclick="toggleLeftSidebar()" title="Toggle Build History">
                        <i class="fas fa-bars"></i>
                    </button>
                    
                    <div class="logo-section">
                        <div class="logo-icon">
                            <i class="fas fa-network-wired"></i>
                        </div>
                        <span class="logo-text">EduConnect Solution Builder</span>
                    </div>
                </div>
                <div class="header-right">
                    <a href="/dashboard" class="nav-link desktop-only">Dashboard</a>
                    <a href="/solution-builder" class="nav-link active desktop-only">Solutions</a>
                    <a href="/dashboard" class="nav-link desktop-only">Reports</a>
                    <button class="icon-button">
                        <i class="fas fa-bell"></i>
                    </button>
                    <div class="user-avatar">JM</div>
                    
                    <!-- Mobile Menu Button (Right Sidebar - AI Assistant) -->
                    <button class="mobile-menu-btn mobile-only" onclick="toggleRightSidebar()" title="Toggle AI Assistant">
                        <i class="fas fa-robot"></i>
                    </button>
                </div>
            </div>
            
            <!-- Left Sidebar - Build History -->
            <div class="left-sidebar" id="left-sidebar">
                <div class="sidebar-header">
                    <div class="sidebar-title">Recent History</div>
                    <button class="create-build-btn" onclick="createNewBuild()">
                        <i class="fas fa-plus"></i>
                        New Solution
                    </button>
                </div>
                
                <!-- Status Filter -->
                <div style="padding: 0 1rem 1rem;">
                    <select class="form-input" id="status-filter" onchange="filterBuilds()" style="width: 100%; font-size: 0.875rem;">
                        <option value="all">All Solutions</option>
                        <option value="saved">Saved</option>
                        <option value="active">Active</option>
                        <option value="offered">Offered</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
                
                <!-- Dynamic Build List -->
                <div class="build-list" id="build-list">
                    <!-- Builds will be rendered here dynamically -->
                </div>
            </div>
            
            <!-- Main Content -->
            <div class="main-content">
                <!-- Progress Stepper -->
                <div class="stepper" id="progress-stepper">
                    <div class="stepper-step active" data-step="1">
                        <div class="stepper-number">1</div>
                        <div class="stepper-label">Solution Name</div>
                    </div>
                    <div class="stepper-step" data-step="2">
                        <div class="stepper-number">2</div>
                        <div class="stepper-label">Target Definition</div>
                    </div>
                    <div class="stepper-step" data-step="3">
                        <div class="stepper-number">3</div>
                        <div class="stepper-label">Target Details</div>
                    </div>
                    <div class="stepper-step" data-step="4">
                        <div class="stepper-number">4</div>
                        <div class="stepper-label">Solution Selection</div>
                    </div>
                    <div class="stepper-step" data-step="5">
                        <div class="stepper-number">5</div>
                        <div class="stepper-label">Commercials</div>
                    </div>
                </div>
                
                <!-- Step 1: Solution Name -->
                <div class="config-card step-content" id="step-1" style="display: block;">
                    <div class="step-header">
                        <h2 class="card-title">Name Your Solution</h2>
                        <p class="card-subtitle">Give your educational connectivity solution a meaningful name</p>
                    </div>
                    
                    <form class="step-form">
                        <div class="form-group" style="margin-bottom: 2rem;">
                            <label class="form-label">Solution Name <span style="color: #EF4444;">*</span></label>
                            <input 
                                type="text" 
                                id="solution-name-input" 
                                class="form-input" 
                                placeholder="e.g., University WiFi Upgrade 2024, K-12 Connectivity Project" 
                                required
                            >
                            <p class="form-hint">This name will be used throughout the solution builder and in reports</p>
                        </div>
                        
                        <div class="action-bar">
                            <button type="button" class="btn btn-outline" onclick="saveDraft()">
                                <i class="fas fa-save mr-2"></i> Save Draft
                            </button>
                            <button type="button" class="btn btn-primary" onclick="goToStep(2)">
                                Next: Define Targets <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </form>
                </div>
                
                <!-- Step 2: Target Definition -->
                <div class="config-card step-content" id="step-2" style="display: none;">
                    <div class="step-header">
                        <h2 class="card-title">Define Targets</h2>
                        <p class="card-subtitle">Select who or what will receive connectivity solutions</p>
                    </div>
                    
                    <div class="targets-container">
                        <div class="empty-state" id="empty-targets" style="text-align: center; padding: 3rem; color: #6B7280;">
                            <i class="fas fa-bullseye" style="font-size: 3rem; margin-bottom: 1rem; color: #D1D5DB;"></i>
                            <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">No targets defined yet</p>
                            <p>Click "Add Target" below to get started</p>
                        </div>
                        
                        <div id="targets-list"></div>
                    </div>
                    
                    <div class="action-bar">
                        <button type="button" class="btn btn-secondary" onclick="goToStep(1)">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <div style="display: flex; gap: 1rem;">
                            <button type="button" class="btn btn-outline" onclick="addTarget()">
                                <i class="fas fa-plus mr-2"></i> Add Target
                            </button>
                            <button type="button" class="btn btn-outline" onclick="saveDraft()">
                                <i class="fas fa-save mr-2"></i> Save Draft
                            </button>
                            <button type="button" class="btn btn-primary" onclick="goToStep(3)">
                                Next: Target Details <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: Target Details -->
                <div class="config-card step-content" id="step-3" style="display: none;">
                    <div class="step-header">
                        <h2 class="card-title">Configure Target Details</h2>
                        <p class="card-subtitle">Provide specific information for each target</p>
                    </div>
                    
                    <div id="target-details-container"></div>
                    
                    <div class="action-bar">
                        <button type="button" class="btn btn-secondary" onclick="goToStep(2)">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <div style="display: flex; gap: 1rem;">
                            <button type="button" class="btn btn-outline" onclick="saveDraft()">
                                <i class="fas fa-save mr-2"></i> Save Draft
                            </button>
                            <button type="button" class="btn btn-primary" onclick="goToStep(4)">
                                Next: Select Solutions <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Step 4: Solution Selection -->
                <div class="config-card step-content" id="step-4" style="display: none;">
                    <div class="step-header">
                        <h2 class="card-title">Select Solutions</h2>
                        <p class="card-subtitle">Choose connectivity solutions for each target</p>
                    </div>
                    
                    <!-- Mandatory Rules Info Box (Collapsible) -->
                    <div id="rules-info-box" style="background: #FEF3C7; border-left: 4px solid #F59E0B; margin-bottom: 1.5rem; border-radius: 0.5rem; overflow: hidden;">
                        <div onclick="toggleRulesBox()" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; cursor: pointer; user-select: none;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <i class="fas fa-info-circle" style="color: #F59E0B;"></i>
                                <strong style="color: #92400E;">Mandatory Selection Rules</strong>
                            </div>
                            <i id="rules-toggle-icon" class="fas fa-chevron-up" style="color: #F59E0B; transition: transform 0.3s;"></i>
                        </div>
                        <div id="rules-content" style="padding: 0 1rem 1rem 1rem;">
                            <ul style="margin: 0.5rem 0 0 1.25rem; color: #78350F; font-size: 0.875rem;">
                                <li><strong>EduStudent:</strong> AI-Mobile is automatically added (mandatory). Must select one Education Prepaid package.</li>
                                <li><strong>EduFlex:</strong> Must select one Uncapped Wireless package.</li>
                                <li><strong>EduSchool:</strong> Must select one Education Fibre package.</li>
                                <li><strong>EduSafe:</strong> No mandatory requirements.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div id="solution-selection-container"></div>
                    
                    <div class="action-bar">
                        <button type="button" class="btn btn-secondary" onclick="goToStep(3)">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <div style="display: flex; gap: 1rem;">
                            <button type="button" class="btn btn-outline" onclick="saveDraft()">
                                <i class="fas fa-save mr-2"></i> Save Draft
                            </button>
                            <button type="button" class="btn btn-primary" onclick="goToStep(5)">
                                Next: Review Commercials <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Step 5: Commercials (Placeholder for Delivery 5) -->
                <div class="config-card step-content" id="step-5" style="display: none;">
                    <div class="step-header">
                        <h2 class="card-title">Commercials Review</h2>
                        <p class="card-subtitle">Review pricing and finalize your solution</p>
                    </div>
                    <div style="padding: 3rem; text-align: center; color: #6B7280;">
                        <i class="fas fa-file-invoice-dollar" style="font-size: 3rem; margin-bottom: 1rem; color: #D1D5DB;"></i>
                        <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Step 5: Coming in Delivery 5</p>
                        <p>Pricing calculations and actions will be implemented last</p>
                    </div>
                </div>
                
                <!-- Target Type Modal -->
                <div class="modal" id="target-type-modal">
                    <div class="modal-content" style="max-width: 600px;">
                        <div class="modal-header">
                            <h3>Select Target Type</h3>
                            <button class="modal-close" onclick="closeTargetModal()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="target-type-grid">
                                <div class="target-type-card" onclick="selectTargetType('Person')">
                                    <div class="target-type-icon" style="background: #DBEAFE; color: #1E40AF;">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="target-type-name">Person</div>
                                    <div class="target-type-desc">Individual users (students, teachers, staff)</div>
                                </div>
                                <div class="target-type-card" onclick="selectTargetType('Site')">
                                    <div class="target-type-icon" style="background: #FEF3C7; color: #92400E;">
                                        <i class="fas fa-building"></i>
                                    </div>
                                    <div class="target-type-name">Site</div>
                                    <div class="target-type-desc">Locations (campuses, schools, facilities)</div>
                                </div>
                                <div class="target-type-card" onclick="selectTargetType('Asset')">
                                    <div class="target-type-icon" style="background: #D1FAE5; color: #065F46;">
                                        <i class="fas fa-box"></i>
                                    </div>
                                    <div class="target-type-name">Asset</div>
                                    <div class="target-type-desc">Devices (tablets, laptops, routers)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Sidebar - AI Assistant -->
            <div class="right-sidebar" id="right-sidebar">
                <div class="assistant-header">
                    <div class="assistant-info">
                        <div class="assistant-avatar">
                            <span>AI</span>
                            <div class="online-indicator"></div>
                        </div>
                        <div>
                            <div class="assistant-name">EduAssistant</div>
                            <div class="assistant-status">● Online</div>
                        </div>
                    </div>
                    <button class="collapse-btn" onclick="toggleAssistant()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chat-container">
                    <div class="message">
                        <div class="message-avatar">AI</div>
                        <div>
                            <div class="message-content">
                                Hello! I see you're configuring a University site. Based on your student count of 2,500, would you like me to suggest bandwidth allocations?
                                <div class="message-time">10:42 AM</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="message">
                        <div class="message-avatar" style="background: #E5E7EB; color: #000;">You</div>
                        <div>
                            <div class="message-content" style="background: #FFCB00;">
                                Yes, what's recommended for high video streaming usage?
                                <div class="message-time">10:44 AM</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="message">
                        <div class="message-avatar">AI</div>
                        <div>
                            <div class="message-content">
                                For high-density streaming environments, we recommend a dedicated 1Gbps fiber link with redundancy. Here are two options:
                                <div class="recommendation-card">
                                    <div class="recommendation-title">
                                        <i class="fas fa-lightbulb" style="color: #FFCB00;"></i>
                                        Recommended Packages
                                    </div>
                                    <div class="recommendation-options">
                                        <div class="recommendation-option">
                                            <div class="option-title">Enterprise Dedicated</div>
                                            <div class="option-detail">1:1 Contention • 99.9% SLA</div>
                                        </div>
                                        <div class="recommendation-option" style="border-left: 3px solid #FFCB00;">
                                            <div class="option-title">Broadband Business <span style="color: #FFCB00;">✓ Best Performance</span></div>
                                            <div class="option-detail">1:10 Contention • Standard SLA</div>
                                        </div>
                                    </div>
                                    <div class="compare-link">
                                        <a href="#">Compare SLAs</a> • <a href="#">Add backup link</a>
                                    </div>
                                </div>
                                <div class="message-time">10:43 AM</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-container">
                    <div class="chat-input-wrapper">
                        <textarea class="chat-input" rows="1" placeholder="Ask about connectivity..."></textarea>
                        <button class="send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Mobile Sidebar Overlay -->
            <div id="sidebar-overlay" class="sidebar-overlay" onclick="closeSidebars()"></div>
            
            <!-- Floating Chat Button (Mobile Only) -->
            <button class="chat-fab mobile-only" onclick="toggleRightSidebar()" title="AI Assistant">
                <i class="fas fa-comments"></i>
            </button>
        </div>
        
        <script>
            // ============================================
            // STATE MANAGEMENT
            // ============================================
            let builds = [];
            let currentBuildId = null;
            let statusFilter = 'all';
            
            // Initialize on page load
            document.addEventListener('DOMContentLoaded', function() {
                loadBuilds();
                renderBuilds();
                
                // Load last active build or create new one
                if (builds.length > 0) {
                    const lastBuild = builds[0]; // Most recently accessed is first
                    loadBuild(lastBuild.id);
                } else {
                    createNewBuild();
                }
                
                console.log('🚀 SOLUTION BUILDER INITIALIZED');
                console.log('Total Builds:', builds.length);
                
                // Setup event listeners
                setupEventListeners();
            });
            
            function setupEventListeners() {
                // Coverage option selection
                document.querySelectorAll('.coverage-option').forEach(option => {
                    option.addEventListener('click', function() {
                        document.querySelectorAll('.coverage-option').forEach(o => o.classList.remove('selected'));
                        this.classList.add('selected');
                    });
                });
                
                // Auto-expand textarea
                const chatInput = document.querySelector('.chat-input');
                if (chatInput) {
                    chatInput.addEventListener('input', function() {
                        this.style.height = 'auto';
                        this.style.height = this.scrollHeight + 'px';
                    });
                }
                
                // Auto-save on input change
                document.addEventListener('input', function(e) {
                    if (e.target.matches('.form-input, .form-select, .form-textarea')) {
                        autoSaveCurrent();
                    }
                });
            }
            
            // Load builds from localStorage
            function loadBuilds() {
                const saved = localStorage.getItem('educonnect_builds');
                if (saved) {
                    builds = JSON.parse(saved);
                } else {
                    // Initialize with empty array - will create first build
                    builds = [];
                }
                
                // Sort by last accessed (most recent first)
                builds.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
            }
            
            // Save builds to localStorage
            function saveBuilds() {
                localStorage.setItem('educonnect_builds', JSON.stringify(builds));
            }
            
            // Get relative time string
            function getRelativeTime(isoString) {
                const date = new Date(isoString);
                const now = new Date();
                const diffMs = now - date;
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);
                
                if (diffMins < 1) return 'Just now';
                if (diffMins < 60) return diffMins + ' mins ago';
                if (diffHours < 24) return diffHours + ' hrs ago';
                if (diffDays < 30) return diffDays + ' days ago';
                return date.toLocaleDateString();
            }
            
            // Render build history list
            function renderBuilds() {
                const container = document.getElementById('build-list');
                const filteredBuilds = statusFilter === 'all' 
                    ? builds 
                    : builds.filter(b => b.status === statusFilter);
                
                if (filteredBuilds.length === 0) {
                    container.innerHTML = '<div style="padding: 2rem 1rem; text-align: center; color: #6B7280; font-size: 0.875rem;">No solutions found</div>';
                    return;
                }
                
                container.innerHTML = filteredBuilds.map(build => {
                    const isActive = build.id === currentBuildId;
                    const canDelete = build.status === 'saved';
                    const canArchive = build.status === 'active' || build.status === 'offered';
                    
                    let html = '<div class="build-item ' + (isActive ? 'active' : '') + '" onclick="loadBuild(&quot;' + build.id + '&quot;)" style="position: relative;">';
                    html += '<div class="build-item-header">';
                    html += '<div style="display: flex; align-items: flex-start; flex: 1;">';
                    html += '<div class="build-icon"><i class="fas fa-folder"></i></div>';
                    html += '<div class="build-details">';
                    html += '<div class="build-name">' + (build.name || 'Untitled Solution') + '</div>';
                    html += '<div class="build-meta">' + getRelativeTime(build.lastAccessed) + '</div>';
                    html += '<span class="status-badge status-' + build.status + '">' + build.status.charAt(0).toUpperCase() + build.status.slice(1) + '</span>';
                    html += '</div></div></div>';
                    
                    if (canDelete) {
                        html += '<button class="delete-btn" onclick="event.stopPropagation(); deleteBuild(&quot;' + build.id + '&quot;)" title="Delete" style="position: absolute; top: 0.5rem; right: 0.5rem; background: #EF4444; color: white; border: none; border-radius: 4px; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.75rem;"><i class="fas fa-trash"></i></button>';
                    }
                    
                    if (canArchive) {
                        html += '<button class="archive-btn" onclick="event.stopPropagation(); archiveBuild(&quot;' + build.id + '&quot;)" title="Archive" style="position: absolute; top: 0.5rem; right: 0.5rem; background: #6B7280; color: white; border: none; border-radius: 4px; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.75rem;"><i class="fas fa-archive"></i></button>';
                    }
                    
                    html += '</div>';
                    return html;
                }).join('');
            }
            
            // Filter builds by status
            function filterBuilds() {
                statusFilter = document.getElementById('status-filter').value;
                renderBuilds();
                console.log('🔍 FILTER APPLIED:', statusFilter);
            }
            
            // Get current form data
            function getCurrentFormData() {
                const solutionNameInput = document.getElementById('solution-name-input');
                return {
                    solutionName: solutionNameInput?.value || '',
                    targets: currentTargets
                };
            }
            
            // Auto-save current build
            function autoSaveCurrent() {
                if (!currentBuildId) return;
                
                const build = builds.find(b => b.id === currentBuildId);
                if (!build) return;
                
                build.data = getCurrentFormData();
                build.name = build.data.solutionName || 'New Solution';
                build.lastAccessed = new Date().toISOString();
                
                // Re-sort and save
                builds.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
                saveBuilds();
                renderBuilds();
                
                console.log('💾 AUTO-SAVED:', build.name);
            }
            
            // Create new build
            function createNewBuild() {
                // Auto-save current build before creating new one
                autoSaveCurrent();
                
                // Create new build with new data structure
                const newBuild = {
                    id: Date.now().toString(),
                    name: 'New Solution',
                    status: 'saved',
                    lastAccessed: new Date().toISOString(),
                    data: {
                        solutionName: '',
                        targets: []
                    }
                };
                
                builds.unshift(newBuild); // Add to beginning (most recent)
                saveBuilds();
                currentBuildId = newBuild.id;
                
                // Reset workflow state
                currentStep = 1;
                currentTargets = [];
                
                // Clear solution name input
                const solutionNameInput = document.getElementById('solution-name-input');
                if (solutionNameInput) {
                    solutionNameInput.value = '';
                }
                
                // Navigate to step 1
                goToStep(1);
                
                // Update UI
                renderBuilds();
                renderTargets();
                
                // Set focus to solution name input
                if (solutionNameInput) {
                    setTimeout(() => solutionNameInput.focus(), 100);
                }
                
                console.log('✨ NEW SOLUTION CREATED');
                console.log('Build ID:', newBuild.id);
            }
            
            // Load existing build
            function loadBuild(buildId) {
                // Auto-save current build before switching
                autoSaveCurrent();
                
                const build = builds.find(b => b.id === buildId);
                if (!build) {
                    console.error('Build not found:', buildId);
                    return;
                }
                
                currentBuildId = buildId;
                build.lastAccessed = new Date().toISOString();
                
                // Re-sort builds by last accessed
                builds.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
                saveBuilds();
                
                // Load data into workflow
                if (build.data) {
                    // Load solution name
                    const solutionNameInput = document.getElementById('solution-name-input');
                    if (solutionNameInput) {
                        solutionNameInput.value = build.data.solutionName || '';
                    }
                    
                    // Load targets
                    currentTargets = build.data.targets || [];
                    renderTargets();
                }
                
                // Reset to step 1
                currentStep = 1;
                goToStep(1);
                
                // Update UI
                renderBuilds();
                
                console.log('📂 LOADED BUILD:', build.name);
                console.log('Solution Name:', build.data?.solutionName || 'N/A');
                console.log('Targets:', currentTargets.length);
            }
            
            // Delete build (only for 'saved' status)
            function deleteBuild(buildId) {
                const build = builds.find(b => b.id === buildId);
                if (!build) return;
                
                if (build.status !== 'saved') {
                    alert('Only saved solutions can be deleted. Active and Offered solutions must be archived first.');
                    return;
                }
                
                if (!confirm('Are you sure you want to delete "' + build.name + '"?')) {
                    return;
                }
                
                builds = builds.filter(b => b.id !== buildId);
                saveBuilds();
                
                // If we deleted the current build, load another one or create new
                if (currentBuildId === buildId) {
                    if (builds.length > 0) {
                        loadBuild(builds[0].id);
                    } else {
                        createNewBuild();
                    }
                }
                
                renderBuilds();
                
                console.log('🗑️  BUILD DELETED');
                console.log('Build:', build.name);
            }
            
            // Archive build (for 'active' or 'offered' status)
            function archiveBuild(buildId) {
                const build = builds.find(b => b.id === buildId);
                if (!build) return;
                
                if (build.status !== 'active' && build.status !== 'offered') {
                    alert('Only active or offered solutions can be archived.');
                    return;
                }
                
                if (!confirm('Archive "' + build.name + '"? It will be moved to archived status.')) {
                    return;
                }
                
                build.status = 'archived';
                build.lastAccessed = new Date().toISOString();
                saveBuilds();
                renderBuilds();
                
                console.log('📦 BUILD ARCHIVED');
                console.log('Build:', build.name);
            }
            
            // ============================================
            // UI FUNCTIONS
            // ============================================
            function toggleAssistant() {
                document.getElementById('right-sidebar').classList.toggle('collapsed');
            }
            
            // Mobile sidebar toggles
            function toggleLeftSidebar() {
                const sidebar = document.getElementById('left-sidebar');
                const overlay = document.getElementById('sidebar-overlay');
                const rightSidebar = document.getElementById('right-sidebar');
                
                // Close right sidebar if open
                if (rightSidebar.classList.contains('open')) {
                    rightSidebar.classList.remove('open');
                }
                
                sidebar.classList.toggle('open');
                
                if (sidebar.classList.contains('open')) {
                    overlay.style.display = 'block';
                } else {
                    overlay.style.display = 'none';
                }
            }
            
            function toggleRightSidebar() {
                const sidebar = document.getElementById('right-sidebar');
                const overlay = document.getElementById('sidebar-overlay');
                const fab = document.querySelector('.chat-fab');
                const leftSidebar = document.getElementById('left-sidebar');
                
                // Close left sidebar if open
                if (leftSidebar.classList.contains('open')) {
                    leftSidebar.classList.remove('open');
                }
                
                // Remove desktop collapsed class if present
                sidebar.classList.remove('collapsed');
                
                // Toggle mobile open class
                const isOpen = sidebar.classList.contains('open');
                
                if (isOpen) {
                    // Closing
                    sidebar.classList.remove('open');
                    overlay.style.display = 'none';
                    if (fab) {
                        fab.style.display = 'flex';
                        fab.style.opacity = '1';
                    }
                } else {
                    // Opening
                    sidebar.classList.add('open');
                    overlay.style.display = 'block';
                    if (fab) {
                        fab.style.display = 'none';
                        fab.style.opacity = '0';
                    }
                }
            }
            
            function closeSidebars() {
                const leftSidebar = document.getElementById('left-sidebar');
                const rightSidebar = document.getElementById('right-sidebar');
                const overlay = document.getElementById('sidebar-overlay');
                const fab = document.querySelector('.chat-fab');
                
                leftSidebar.classList.remove('open');
                rightSidebar.classList.remove('open');
                overlay.style.display = 'none';
                if (fab) fab.style.display = 'flex';
            }
            
            // Toggle Mandatory Rules Info Box
            function toggleRulesBox() {
                const content = document.getElementById('rules-content');
                const icon = document.getElementById('rules-toggle-icon');
                
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'none';
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                    icon.style.transform = 'rotate(180deg)';
                }
            }
            
            // ============================================
            // MULTI-STEP WORKFLOW FUNCTIONS (Delivery 3)
            // ============================================
            let currentStep = 1;
            let currentTargets = [];
            
            // Navigate to a specific step
            function goToStep(stepNumber) {
                // Validate before moving forward
                if (stepNumber > currentStep) {
                    if (stepNumber === 2 && !validateStep1()) {
                        return;
                    }
                    if (stepNumber === 3 && currentTargets.length === 0) {
                        alert('Please add at least one target before proceeding.');
                        return;
                    }
                    // Validate solution rules when leaving Step 4
                    if (stepNumber === 5 && currentStep === 4) {
                        // Validate each target that has solutions
                        for (let i = 0; i < currentTargets.length; i++) {
                            if (currentTargets[i].solutions && currentTargets[i].solutions.length > 0) {
                                const validation = validateSolutionRules(i);
                                if (!validation.valid) {
                                    alert('Solution Selection Error for ' + currentTargets[i].name + ':\\n\\n' + validation.message);
                                    return;
                                }
                            }
                        }
                    }
                }
                
                // Hide all steps
                document.querySelectorAll('.step-content').forEach(step => {
                    step.style.display = 'none';
                });
                
                // Show target step
                const targetStepEl = document.getElementById('step-' + stepNumber);
                if (targetStepEl) {
                    targetStepEl.style.display = 'block';
                }
                
                // Render step-specific content
                if (stepNumber === 3) {
                    renderTargetDetails();
                } else if (stepNumber === 4) {
                    renderSolutionSelection();
                }
                
                // Update stepper UI
                document.querySelectorAll('.stepper-step').forEach((step, index) => {
                    const stepNum = index + 1;
                    step.classList.remove('active', 'completed');
                    
                    if (stepNum < stepNumber) {
                        step.classList.add('completed');
                        const numberEl = step.querySelector('.stepper-number');
                        if (numberEl) {
                            numberEl.innerHTML = '<i class="fas fa-check"></i>';
                        }
                    } else if (stepNum === stepNumber) {
                        step.classList.add('active');
                        const numberEl = step.querySelector('.stepper-number');
                        if (numberEl) {
                            numberEl.textContent = stepNum;
                        }
                    } else {
                        const numberEl = step.querySelector('.stepper-number');
                        if (numberEl) {
                            numberEl.textContent = stepNum;
                        }
                    }
                });
                
                currentStep = stepNumber;
                autoSaveCurrent();
                console.log('📍 NAVIGATED TO STEP:', stepNumber);
            }
            
            // Validate Step 1 (Solution Name)
            function validateStep1() {
                const input = document.getElementById('solution-name-input');
                if (!input || !input.value.trim()) {
                    alert('Please enter a solution name before proceeding.');
                    if (input) input.focus();
                    return false;
                }
                
                // Update current build name
                if (currentBuildId) {
                    const build = builds.find(b => b.id === currentBuildId);
                    if (build) {
                        build.name = input.value.trim();
                        build.data = build.data || {};
                        build.data.solutionName = input.value.trim();
                        build.lastAccessed = new Date().toISOString();
                        saveBuilds();
                        renderBuilds();
                    }
                }
                
                return true;
            }
            
            // Save draft
            function saveDraft() {
                autoSaveCurrent();
                alert('Solution saved successfully!');
            }
            
            // Add target
            function addTarget() {
                document.getElementById('target-type-modal').classList.add('active');
            }
            
            // Close target modal
            function closeTargetModal() {
                document.getElementById('target-type-modal').classList.remove('active');
            }
            
            // Select target type and add to list
            function selectTargetType(type) {
                const target = {
                    id: Date.now().toString(),
                    type: type,
                    name: '',
                    details: {}
                };
                
                currentTargets.push(target);
                renderTargets();
                closeTargetModal();
                
                // Auto-save
                if (currentBuildId) {
                    const build = builds.find(b => b.id === currentBuildId);
                    if (build) {
                        build.data = build.data || {};
                        build.data.targets = currentTargets;
                        saveBuilds();
                        renderBuilds();
                    }
                }
                
                console.log('✅ TARGET ADDED:', type);
            }
            
            // Render targets list
            function renderTargets() {
                const container = document.getElementById('targets-list');
                const emptyState = document.getElementById('empty-targets');
                
                if (!container) return;
                
                if (currentTargets.length === 0) {
                    container.innerHTML = '';
                    if (emptyState) emptyState.style.display = 'block';
                    return;
                }
                
                if (emptyState) emptyState.style.display = 'none';
                
                const iconMap = {
                    'Person': 'fa-user',
                    'Site': 'fa-building',
                    'Asset': 'fa-box'
                };
                
                const colorMap = {
                    'Person': { bg: '#DBEAFE', color: '#1E40AF' },
                    'Site': { bg: '#FEF3C7', color: '#92400E' },
                    'Asset': { bg: '#D1FAE5', color: '#065F46' }
                };
                
                container.innerHTML = currentTargets.map((target, index) => {
                    const colors = colorMap[target.type] || { bg: '#F3F4F6', color: '#6B7280' };
                    const icon = iconMap[target.type] || 'fa-circle';
                    const targetName = target.name || 'Unnamed ' + target.type;
                    
                    return '<div class="target-card">' +
                        '<div class="target-icon" style="background: ' + colors.bg + '; color: ' + colors.color + ';">' +
                            '<i class="fas ' + icon + '"></i>' +
                        '</div>' +
                        '<div class="target-info">' +
                            '<div class="target-type">' + target.type + '</div>' +
                            '<div class="target-name">' + targetName + '</div>' +
                            '<div class="target-details">Click "Next" to configure details</div>' +
                        '</div>' +
                        '<div class="target-actions">' +
                            '<button class="icon-btn delete" onclick="deleteTarget(' + index + ')" title="Delete">' +
                                '<i class="fas fa-trash"></i>' +
                            '</button>' +
                        '</div>' +
                    '</div>';
                }).join('');
                
                console.log('🎯 RENDERED', currentTargets.length, 'TARGETS');
            }
            
            // Delete target
            function deleteTarget(index) {
                if (confirm('Remove this target?')) {
                    currentTargets.splice(index, 1);
                    renderTargets();
                    autoSaveCurrent();
                    console.log('🗑️ TARGET DELETED');
                }
            }

            
            // ============================================
            // SOLUTION LIBRARY DATA (from Excel)
            // ============================================
            // SOLUTION LIBRARY DATA (from EduConnect Solution Library.xlsx)
            // ============================================
            const solutionLibrary = {
                'EduStudent': {
                    products: {
                        'Education Prepaid': ['Small - 5GB + 50mins', 'Medium - 10GB + 100mins', 'Large - 25GB + 200mins'],
                        'AI-Mobile': ['4EC + AI Tutor']
                    }
                },
                'EduFlex': {
                    products: {
                        'Uncapped Wireless': ['FWA Lite - 10Mbps', 'FWA Standard - 50Mbps', 'FWA Extra - 100Mbps']
                    }
                },
                'EduSchool': {
                    products: {
                        'Education Fibre': ['Fibre Lite - 50Mbps', 'Fibree Standard - 200Mbps', 'Fibre Extra - 500Mbps'],
                        'Campus WiFi': ['APN + Eagle Eye + Security']
                    }
                },
                'EduSafe': {
                    products: {
                        'PowerFleet - Vision AI': ['AI Video', 'AI Dash Cam'],
                        'PowerFleet - MiX': ['Vehicle Telematics'],
                        'PowerFleet - MyPanic': ['Panic / Emergency App']
                    }
                }
            };
            
            // Compatibility rules (Target Type -> Available Solutions)
            const compatibilityRules = {
                'Person': ['EduStudent', 'EduSafe'],
                'Site': ['EduFlex', 'EduSchool'],
                'Asset': ['EduSafe']
            };
            
            // ============================================
            // STEP 3: TARGET DETAILS FUNCTIONS
            // ============================================
            function renderTargetDetails() {
                const container = document.getElementById('target-details-container');
                if (!container) return;
                
                if (currentTargets.length === 0) {
                    container.innerHTML = '<div style="text-align: center; padding: 3rem; color: #6B7280;"><i class="fas fa-info-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i><p>No targets defined. Go back to Step 2 to add targets.</p></div>';
                    return;
                }
                
                container.innerHTML = currentTargets.map((target, index) => {
                    return renderTargetDetailForm(target, index);
                }).join('');
            }
            
            function renderTargetDetailForm(target, index) {
                const iconMap = {
                    'Person': 'fa-user',
                    'Site': 'fa-building',
                    'Asset': 'fa-box'
                };
                
                const colorMap = {
                    'Person': { bg: '#DBEAFE', color: '#1E40AF' },
                    'Site': { bg: '#FEF3C7', color: '#92400E' },
                    'Asset': { bg: '#D1FAE5', color: '#065F46' }
                };
                
                const colors = colorMap[target.type] || { bg: '#F3F4F6', color: '#6B7280' };
                const icon = iconMap[target.type] || 'fa-circle';
                
                let formHtml = '<div class="target-detail-section">';
                formHtml += '<div class="target-detail-header">';
                formHtml += '<div class="target-detail-icon" style="background: ' + colors.bg + '; color: ' + colors.color + ';"><i class="fas ' + icon + '"></i></div>';
                formHtml += '<div class="target-detail-info"><h3>Configure ' + target.type + ' Details</h3><div class="target-type-label">#' + (index + 1) + ' ' + target.type.toUpperCase() + '</div></div>';
                formHtml += '</div>';
                
                if (target.type === 'Person') {
                    formHtml += '<div class="form-grid">';
                    formHtml += '<div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-input" id="person-name-' + index + '" value="' + (target.details.name || '') + '" onchange="updateTargetDetail(' + index + ', &quot;name&quot;, this.value)" placeholder="e.g., John Doe"></div>';
                    formHtml += '<div class="form-group"><label class="form-label">ID Number *</label><input type="text" class="form-input" id="person-id-' + index + '" value="' + (target.details.idNumber || '') + '" onchange="updateTargetDetail(' + index + ', &quot;idNumber&quot;, this.value)" placeholder="e.g., 12345678"></div>';
                    formHtml += '</div>';
                    formHtml += '<div class="form-grid">';
                    formHtml += '<div class="form-group"><label class="form-label">Role *</label><select class="form-input" id="person-role-' + index + '" onchange="updateTargetDetail(' + index + ', &quot;role&quot;, this.value)"><option value="">Select role...</option><option value="Student"' + (target.details.role === 'Student' ? ' selected' : '') + '>Student</option><option value="Teacher"' + (target.details.role === 'Teacher' ? ' selected' : '') + '>Teacher</option><option value="Staff"' + (target.details.role === 'Staff' ? ' selected' : '') + '>Staff</option><option value="Other"' + (target.details.role === 'Other' ? ' selected' : '') + '>Other</option></select></div>';
                    formHtml += '<div class="form-group"><label class="form-label">Institution</label><input type="text" class="form-input" id="person-institution-' + index + '" value="' + (target.details.institution || '') + '" onchange="updateTargetDetail(' + index + ', &quot;institution&quot;, this.value)" placeholder="e.g., ABC University"></div>';
                    formHtml += '</div>';
                } else if (target.type === 'Site') {
                    formHtml += '<div class="form-grid">';
                    formHtml += '<div class="form-group"><label class="form-label">Site Name *</label><input type="text" class="form-input" id="site-name-' + index + '" value="' + (target.details.siteName || '') + '" onchange="updateTargetDetail(' + index + ', &quot;siteName&quot;, this.value)" placeholder="e.g., Main Campus"></div>';
                    formHtml += '<div class="form-group"><label class="form-label">Site Type *</label><select class="form-input" id="site-type-' + index + '" onchange="updateTargetDetail(' + index + ', &quot;siteType&quot;, this.value)"><option value="">Select type...</option><option value="School"' + (target.details.siteType === 'School' ? ' selected' : '') + '>School</option><option value="Technical College"' + (target.details.siteType === 'Technical College' ? ' selected' : '') + '>Technical College</option><option value="University"' + (target.details.siteType === 'University' ? ' selected' : '') + '>University</option><option value="Private"' + (target.details.siteType === 'Private' ? ' selected' : '') + '>Private</option><option value="Office"' + (target.details.siteType === 'Office' ? ' selected' : '') + '>Office</option><option value="Other"' + (target.details.siteType === 'Other' ? ' selected' : '') + '>Other</option></select></div>';
                    formHtml += '</div>';
                    formHtml += '<div class="form-group"><label class="form-label">Address *</label><input type="text" class="form-input" id="site-address-' + index + '" value="' + (target.details.address || '') + '" onchange="updateTargetDetail(' + index + ', &quot;address&quot;, this.value)" placeholder="e.g., 123 Main Street, City"></div>';
                    formHtml += '<div class="form-grid">';
                    formHtml += '<div class="form-group"><label class="form-label">Total Personnel</label><input type="number" class="form-input" id="site-students-' + index + '" value="' + (target.details.students || '') + '" onchange="updateTargetDetail(' + index + ', &quot;students&quot;, this.value)" placeholder="e.g., 500"></div>';
                    formHtml += '<div class="form-group"><label class="form-label">Coverage Type *</label><select class="form-input" id="site-coverage-' + index + '" onchange="updateTargetDetail(' + index + ', &quot;coverage&quot;, this.value)"><option value="">Select coverage...</option><option value="Indoor"' + (target.details.coverage === 'Indoor' ? ' selected' : '') + '>Indoor Only</option><option value="Outdoor"' + (target.details.coverage === 'Outdoor' ? ' selected' : '') + '>Outdoor Only</option><option value="Both"' + (target.details.coverage === 'Both' ? ' selected' : '') + '>Indoor & Outdoor</option></select></div>';
                    formHtml += '</div>';
                } else if (target.type === 'Asset') {
                    formHtml += '<div class="form-group"><label class="form-label">Asset Name *</label><input type="text" class="form-input" id="asset-name-' + index + '" value="' + (target.details.assetName || '') + '" onchange="updateTargetDetail(' + index + ', &quot;assetName&quot;, this.value)" placeholder="e.g., School Bus Fleet"></div>';
                    formHtml += '<div class="form-grid">';
                    formHtml += '<div class="form-group"><label class="form-label">Asset Type *</label><select class="form-input" id="asset-type-' + index + '" onchange="updateTargetDetail(' + index + ', &quot;deviceType&quot;, this.value)"><option value="">Select asset...</option><option value="Vehicle"' + (target.details.deviceType === 'Vehicle' ? ' selected' : '') + '>Vehicle</option><option value="Equipment"' + (target.details.deviceType === 'Equipment' ? ' selected' : '') + '>Equipment</option><option value="Electronics"' + (target.details.deviceType === 'Electronics' ? ' selected' : '') + '>Electronics</option><option value="Other"' + (target.details.deviceType === 'Other' ? ' selected' : '') + '>Other</option></select></div>';
                    formHtml += '<div class="form-group"><label class="form-label">Quantity *</label><input type="number" class="form-input" id="asset-quantity-' + index + '" value="' + (target.details.quantity || '') + '" onchange="updateTargetDetail(' + index + ', &quot;quantity&quot;, this.value)" placeholder="e.g., 50" min="1"></div>';
                    formHtml += '</div>';
                    formHtml += '<div class="form-group"><label class="form-label">Specifications / Notes</label><textarea class="form-input" id="asset-specs-' + index + '" onchange="updateTargetDetail(' + index + ', &quot;specifications&quot;, this.value)" rows="3" placeholder="Additional device specifications or requirements">' + (target.details.specifications || '') + '</textarea></div>';
                }
                
                formHtml += '</div>';
                return formHtml;
            }
            
            function updateTargetDetail(index, field, value) {
                if (!currentTargets[index]) return;
                if (!currentTargets[index].details) {
                    currentTargets[index].details = {};
                }
                currentTargets[index].details[field] = value;
                
                // Update target name based on details
                let nameChanged = false;
                if (currentTargets[index].type === 'Person' && field === 'name') {
                    currentTargets[index].name = value || 'Unnamed Person';
                    nameChanged = true;
                } else if (currentTargets[index].type === 'Site' && field === 'siteName') {
                    currentTargets[index].name = value || 'Unnamed Site';
                    nameChanged = true;
                } else if (currentTargets[index].type === 'Asset' && field === 'assetName') {
                    currentTargets[index].name = value || 'Unnamed Asset';
                    nameChanged = true;
                }
                
                // Immediately update the Defined Targets list if name changed
                if (nameChanged) {
                    renderTargets();
                }
                
                autoSaveCurrent();
            }
            
            // ============================================
            // STEP 4: SOLUTION SELECTION FUNCTIONS
            // ============================================
            function renderSolutionSelection() {
                const container = document.getElementById('solution-selection-container');
                if (!container) return;
                
                if (currentTargets.length === 0) {
                    container.innerHTML = '<div style="text-align: center; padding: 3rem; color: #6B7280;"><i class="fas fa-info-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i><p>No targets defined. Go back to Step 2 to add targets.</p></div>';
                    return;
                }
                
                container.innerHTML = currentTargets.map((target, targetIndex) => {
                    return renderTargetSolutions(target, targetIndex);
                }).join('');
            }
            
            function renderTargetSolutions(target, targetIndex) {
                const iconMap = {
                    'Person': 'fa-user',
                    'Site': 'fa-building',
                    'Asset': 'fa-box'
                };
                
                const colorMap = {
                    'Person': { bg: '#DBEAFE', color: '#1E40AF' },
                    'Site': { bg: '#FEF3C7', color: '#92400E' },
                    'Asset': { bg: '#D1FAE5', color: '#065F46' }
                };
                
                const colors = colorMap[target.type] || { bg: '#F3F4F6', color: '#6B7280' };
                const icon = iconMap[target.type] || 'fa-circle';
                
                // Initialize solutions array if not exists
                if (!target.solutions) {
                    target.solutions = [];
                }
                
                // Check if solution selection is complete for this target
                const validation = validateSolutionRules(targetIndex);
                const isComplete = validation.valid && target.solutions.length > 0;
                const hasAnySolutions = target.solutions.length > 0;
                
                let html = '<div class="solution-target-section">';
                html += '<div class="target-detail-header">';
                html += '<div class="target-detail-icon" style="background: ' + colors.bg + '; color: ' + colors.color + ';"><i class="fas ' + icon + '"></i></div>';
                html += '<div class="target-detail-info">';
                html += '<div style="display: flex; align-items: center; gap: 0.75rem;">';
                html += '<h3>' + (target.name || target.type) + '</h3>';
                
                // Completion indicator
                if (isComplete) {
                    html += '<span class="completion-badge complete" title="All mandatory requirements satisfied"><i class="fas fa-check-circle"></i> Complete</span>';
                } else if (hasAnySolutions) {
                    html += '<span class="completion-badge incomplete" title="Missing mandatory requirements"><i class="fas fa-exclamation-circle"></i> Incomplete</span>';
                } else {
                    html += '<span class="completion-badge pending" title="No solutions selected"><i class="fas fa-circle"></i> Pending</span>';
                }
                
                html += '</div>';
                html += '<div class="target-type-label">#' + (targetIndex + 1) + ' ' + target.type.toUpperCase() + '</div>';
                html += '</div>';
                html += '</div>';
                
                html += '<div class="solution-list">';
                
                // Render existing solutions
                if (target.solutions.length > 0) {
                    target.solutions.forEach((solution, solutionIndex) => {
                        html += renderSolutionItem(target, targetIndex, solution, solutionIndex);
                    });
                } else {
                    html += '<p style="text-align: center; color: #6B7280; padding: 1rem;">No solutions selected yet. Click "Add Solution" below.</p>';
                }
                
                html += '</div>';
                
                // Add solution button
                html += '<button class="add-solution-btn" onclick="addSolution(' + targetIndex + ')"><i class="fas fa-plus mr-2"></i> Add Solution for ' + target.type + '</button>';
                
                html += '</div>';
                return html;
            }
            
            function renderSolutionItem(target, targetIndex, solution, solutionIndex) {
                const availableSolutions = compatibilityRules[target.type] || [];
                const isMandatory = solution.isMandatory || false;
                
                let html = '<div class="solution-item' + (isMandatory ? ' mandatory-solution' : '') + '">';
                html += '<div class="solution-item-header">';
                html += '<span class="solution-item-number">Solution #' + (solutionIndex + 1);
                if (isMandatory) {
                    html += ' <span style="color: #DC2626; font-size: 0.75rem; font-weight: 600; margin-left: 0.5rem;">MANDATORY</span>';
                }
                html += '</span>';
                if (!isMandatory) {
                    html += '<button class="solution-remove-btn" onclick="removeSolution(' + targetIndex + ', ' + solutionIndex + ')"><i class="fas fa-trash mr-1"></i> Remove</button>';
                }
                html += '</div>';
                
                html += '<div class="hierarchy-select">';
                
                // Solution dropdown
                html += '<div class="form-group">';
                html += '<label class="form-label">Solution *</label>';
                html += '<select class="form-input" onchange="updateSolution(' + targetIndex + ', ' + solutionIndex + ', &quot;solution&quot;, this.value)"' + (isMandatory ? ' disabled' : '') + '>';
                html += '<option value="">Select solution...</option>';
                availableSolutions.forEach(sol => {
                    const selected = solution.solution === sol ? ' selected' : '';
                    html += '<option value="' + sol + '"' + selected + '>' + sol + '</option>';
                });
                html += '</select>';
                html += '</div>';
                
                // Product dropdown
                html += '<div class="form-group">';
                html += '<label class="form-label">Product *</label>';
                html += '<select class="form-input" onchange="updateSolution(' + targetIndex + ', ' + solutionIndex + ', &quot;product&quot;, this.value)"' + (isMandatory ? ' disabled' : '') + '>';
                html += '<option value="">Select product...</option>';
                if (solution.solution && solutionLibrary[solution.solution]) {
                    Object.keys(solutionLibrary[solution.solution].products).forEach(prod => {
                        const selected = solution.product === prod ? ' selected' : '';
                        html += '<option value="' + prod + '"' + selected + '>' + prod + '</option>';
                    });
                }
                html += '</select>';
                html += '</div>';
                
                // Package dropdown
                html += '<div class="form-group">';
                html += '<label class="form-label">Package *</label>';
                html += '<select class="form-input" onchange="updateSolution(' + targetIndex + ', ' + solutionIndex + ', &quot;package&quot;, this.value)"' + (isMandatory ? ' disabled' : '') + '>';
                html += '<option value="">Select package...</option>';
                if (solution.solution && solution.product && solutionLibrary[solution.solution] && solutionLibrary[solution.solution].products[solution.product]) {
                    solutionLibrary[solution.solution].products[solution.product].forEach(pkg => {
                        const selected = solution.package === pkg ? ' selected' : '';
                        html += '<option value="' + pkg + '"' + selected + '>' + pkg + '</option>';
                    });
                }
                html += '</select>';
                html += '</div>';
                
                html += '</div>';
                
                // Quantity input
                html += '<div class="form-group" style="margin-top: 1rem;">';
                html += '<label class="form-label">Quantity *</label>';
                html += '<input type="number" class="form-input" value="' + (solution.quantity || 1) + '" onchange="updateSolution(' + targetIndex + ', ' + solutionIndex + ', &quot;quantity&quot;, this.value)" min="1" placeholder="e.g., 10">';
                html += '</div>';
                
                html += '</div>';
                return html;
            }
            
            function addSolution(targetIndex) {
                if (!currentTargets[targetIndex].solutions) {
                    currentTargets[targetIndex].solutions = [];
                }
                
                currentTargets[targetIndex].solutions.push({
                    solution: '',
                    product: '',
                    package: '',
                    quantity: 1
                });
                
                renderSolutionSelection();
                autoSaveCurrent();
                console.log('➕ SOLUTION ADDED to target', targetIndex);
            }
            
            function removeSolution(targetIndex, solutionIndex) {
                if (confirm('Remove this solution?')) {
                    currentTargets[targetIndex].solutions.splice(solutionIndex, 1);
                    renderSolutionSelection();
                    autoSaveCurrent();
                    console.log('➖ SOLUTION REMOVED from target', targetIndex);
                }
            }
            
            function updateSolution(targetIndex, solutionIndex, field, value) {
                if (!currentTargets[targetIndex].solutions[solutionIndex]) return;
                
                currentTargets[targetIndex].solutions[solutionIndex][field] = value;
                
                // Clear dependent fields when parent changes
                if (field === 'solution') {
                    currentTargets[targetIndex].solutions[solutionIndex].product = '';
                    currentTargets[targetIndex].solutions[solutionIndex].package = '';
                    
                    // Apply mandatory rules when solution is selected
                    applyMandatoryRules(targetIndex, value);
                } else if (field === 'product') {
                    currentTargets[targetIndex].solutions[solutionIndex].package = '';
                }
                
                renderSolutionSelection();
                autoSaveCurrent();
            }
            
            // Apply mandatory selection rules for each solution
            function applyMandatoryRules(targetIndex, selectedSolution) {
                if (!currentTargets[targetIndex].solutions) {
                    currentTargets[targetIndex].solutions = [];
                }
                
                const solutions = currentTargets[targetIndex].solutions;
                
                // Rule 1: EduStudent - Mandatory AI-Mobile
                if (selectedSolution === 'EduStudent') {
                    // Check if AI-Mobile is already added
                    const hasAIMobile = solutions.some(sol => 
                        sol.solution === 'EduStudent' && sol.product === 'AI-Mobile'
                    );
                    
                    if (!hasAIMobile) {
                        // Auto-add AI-Mobile with its only package
                        solutions.push({
                            solution: 'EduStudent',
                            product: 'AI-Mobile',
                            package: '4EC + AI Tutor',
                            quantity: 1,
                            isMandatory: true
                        });
                        console.log('✅ AUTO-ADDED: AI-Mobile (Mandatory for EduStudent)');
                    }
                }
            }
            
            // Validate solution selection rules before proceeding
            function validateSolutionRules(targetIndex) {
                const target = currentTargets[targetIndex];
                if (!target.solutions || target.solutions.length === 0) {
                    return { valid: true, message: '' }; // No solutions selected yet
                }
                
                const solutions = target.solutions;
                const solutionTypes = [...new Set(solutions.map(s => s.solution).filter(s => s))];
                
                // Rule 1: EduStudent must have Education Prepaid
                if (solutionTypes.includes('EduStudent')) {
                    const hasEducationPrepaid = solutions.some(sol => 
                        sol.solution === 'EduStudent' && 
                        sol.product === 'Education Prepaid' && 
                        sol.package
                    );
                    const hasAIMobile = solutions.some(sol => 
                        sol.solution === 'EduStudent' && 
                        sol.product === 'AI-Mobile'
                    );
                    
                    if (!hasEducationPrepaid) {
                        return {
                            valid: false,
                            message: 'EduStudent requires one Education Prepaid package to be selected.'
                        };
                    }
                    if (!hasAIMobile) {
                        return {
                            valid: false,
                            message: 'EduStudent requires AI-Mobile (this should be auto-added).'
                        };
                    }
                }
                
                // Rule 2: EduFlex must have Uncapped Wireless
                if (solutionTypes.includes('EduFlex')) {
                    const hasUncappedWireless = solutions.some(sol => 
                        sol.solution === 'EduFlex' && 
                        sol.product === 'Uncapped Wireless' && 
                        sol.package
                    );
                    
                    if (!hasUncappedWireless) {
                        return {
                            valid: false,
                            message: 'EduFlex requires one Uncapped Wireless package to be selected.'
                        };
                    }
                }
                
                // Rule 3: EduSchool must have Education Fibre
                if (solutionTypes.includes('EduSchool')) {
                    const hasEducationFibre = solutions.some(sol => 
                        sol.solution === 'EduSchool' && 
                        sol.product === 'Education Fibre' && 
                        sol.package
                    );
                    
                    if (!hasEducationFibre) {
                        return {
                            valid: false,
                            message: 'EduSchool requires one Education Fibre package to be selected.'
                        };
                    }
                }
                
                // Rule 4: EduSafe has no mandatory rules (optional)
                
                return { valid: true, message: '' };
            }
        </script>
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
    // Check if user exists and get their status
    // In demo mode, we'll use a whitelist to simulate database lookup
    const knownUsers = {
      '+27123456789': { 
        role: 'admin', 
        onboardingComplete: true, 
        name: 'Admin User' 
      },
      'admin@educonnect.mtn.co.za': { 
        role: 'admin', 
        onboardingComplete: true, 
        name: 'Admin User' 
      },
      '+27987654321': { 
        role: 'account', 
        onboardingComplete: true, 
        name: 'Account Manager' 
      },
      'account@school.co.za': { 
        role: 'account', 
        onboardingComplete: true, 
        name: 'Account Manager' 
      }
    }
    
    const user = knownUsers[destination]
    
    // Determine user type and onboarding status
    let userType, onboardingComplete, userName
    
    if (user) {
      // Returning user (known in system)
      userType = user.role
      onboardingComplete = user.onboardingComplete
      userName = user.name
    } else {
      // New "Single" user (not in system)
      userType = 'single'
      onboardingComplete = false
      userName = 'New User'
    }
    
    console.log('\\n========================================')
    console.log('✅ OTP VERIFIED')
    console.log('========================================')
    console.log('Destination:', destination)
    console.log('OTP:', otp)
    console.log('User Type:', userType)
    console.log('Onboarding Complete:', onboardingComplete)
    console.log('Redirect To:', onboardingComplete ? 'Dashboard' : 'Onboarding')
    console.log('========================================\\n')
    
    return c.json({
      success: true,
      message: 'OTP verified successfully',
      user: {
        destination,
        type: userType,
        name: userName,
        onboardingComplete: onboardingComplete,
        redirectTo: onboardingComplete ? '/dashboard' : '/onboarding'
      }
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
  console.log('Status: Onboarding Complete - Pending Verification')
  console.log('Expected Review Time: 24-48 hours')
  console.log('User can now access dashboard')
  console.log('========================================\n')
  
  return c.json({
    success: true,
    message: 'Onboarding completed successfully',
    status: 'pending_verification',
    estimatedReviewTime: '24-48 hours',
    onboardingComplete: true
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
