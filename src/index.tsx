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
            
            .progress-stepper {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                background: white;
                padding: 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .step-item {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                position: relative;
            }
            
            .step-item:not(:last-child)::after {
                content: '';
                position: absolute;
                right: -0.5rem;
                width: 100%;
                height: 2px;
                background: #E5E7EB;
                top: 20px;
                z-index: 0;
            }
            
            .step-item.completed::after {
                background: #FFCB00;
            }
            
            .step-number {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #F3F4F6;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: #9CA3AF;
                z-index: 1;
                flex-shrink: 0;
            }
            
            .step-item.active .step-number {
                background: #FFCB00;
                color: #000;
            }
            
            .step-item.completed .step-number {
                background: #10B981;
                color: white;
            }
            
            .step-info {
                flex: 1;
            }
            
            .step-name {
                font-weight: 600;
                font-size: 0.875rem;
                color: #6B7280;
            }
            
            .step-item.active .step-name {
                color: #000;
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
            @media (max-width: 1024px) {
                .builder-container {
                    grid-template-columns: 1fr;
                }
                
                .left-sidebar {
                    position: fixed;
                    left: -240px;
                    top: 64px;
                    bottom: 0;
                    width: 240px;
                    z-index: 50;
                    transition: left 0.3s;
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
                }
                
                .right-sidebar.open {
                    right: 0;
                }
                
                .form-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <div class="builder-container">
            <!-- Header -->
            <div class="header">
                <div class="header-left">
                    <div class="logo-section">
                        <div class="logo-icon">
                            <i class="fas fa-network-wired"></i>
                        </div>
                        <span>EduConnect Solution Builder</span>
                    </div>
                </div>
                <div class="header-right">
                    <a href="/dashboard" class="nav-link">Dashboard</a>
                    <a href="/solution-builder" class="nav-link active">Solutions</a>
                    <a href="/dashboard" class="nav-link">Reports</a>
                    <button class="icon-button">
                        <i class="fas fa-bell"></i>
                    </button>
                    <div class="user-avatar">JM</div>
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
                <div class="progress-stepper">
                    <div class="step-item completed">
                        <div class="step-number">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="step-info">
                            <div class="step-name">Persons</div>
                        </div>
                    </div>
                    <div class="step-item active">
                        <div class="step-number">2</div>
                        <div class="step-info">
                            <div class="step-name">Sites</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-info">
                            <div class="step-name">Assets</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">4</div>
                        <div class="step-info">
                            <div class="step-name">Review</div>
                        </div>
                    </div>
                </div>
                
                <!-- Configuration Card -->
                <div class="config-card">
                    <h2 class="card-title">Configure Site Requirements</h2>
                    <p class="card-subtitle">Enter the connectivity parameters for the primary educational campus.</p>
                    
                    <!-- Campus Details -->
                    <div class="section-header">
                        <div class="section-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="section-title">Campus Details</div>
                    </div>
                    
                    <form>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Site Name</label>
                                <input type="text" class="form-input" value="UCT Main Campus" placeholder="Enter site name">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Campus Type</label>
                                <select class="form-input">
                                    <option>University / Higher Ed</option>
                                    <option>High School</option>
                                    <option>Primary School</option>
                                    <option>Technical College</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Total Students</label>
                                <input type="number" class="form-input" value="2500" placeholder="Number of students">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Staff Count</label>
                                <input type="number" class="form-input" value="450" placeholder="Number of staff">
                            </div>
                        </div>
                        
                        <!-- Location & Coverage -->
                        <div class="section-header">
                            <div class="section-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="section-title">Location & Coverage</div>
                            <a href="#" style="margin-left: auto; color: #FFCB00; font-size: 0.875rem; text-decoration: none;">Edit coordinates</a>
                        </div>
                        
                        <div class="location-section">
                            <div>
                                <div class="form-group">
                                    <label class="form-label">Address</label>
                                    <input type="text" class="form-input" value="Rondebosch, Cape Town, 7700" placeholder="Enter address">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Coverage Requirement</label>
                                    <div class="coverage-options">
                                        <div class="coverage-option">
                                            <div class="coverage-radio"></div>
                                            <div>
                                                <div style="font-weight: 600; font-size: 0.875rem;">Indoor Only</div>
                                            </div>
                                        </div>
                                        <div class="coverage-option selected">
                                            <div class="coverage-radio"></div>
                                            <div>
                                                <div style="font-weight: 600; font-size: 0.875rem;">Indoor & Outdoor</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 0.75rem; border-radius: 0.5rem; margin-top: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 0.5rem; color: #1E40AF; font-size: 0.875rem;">
                                        <i class="fas fa-info-circle"></i>
                                        <span><strong>Based on this location, fiber</strong></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="map-preview">
                                <i class="fas fa-map text-4xl"></i>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="action-bar">
                            <button type="button" class="btn btn-secondary">
                                <i class="fas fa-arrow-left mr-2"></i> Back
                            </button>
                            <div style="display: flex; gap: 1rem;">
                                <button type="button" class="btn btn-outline">Save Draft</button>
                                <button type="submit" class="btn btn-primary">
                                    Next Step <i class="fas fa-arrow-right ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </form>
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
                    
                    let html = '<div class="build-item ' + (isActive ? 'active' : '') + '" onclick="loadBuild(\'' + build.id + '\')" style="position: relative;">';
                    html += '<div class="build-item-header">';
                    html += '<div style="display: flex; align-items: flex-start; flex: 1;">';
                    html += '<div class="build-icon"><i class="fas fa-folder"></i></div>';
                    html += '<div class="build-details">';
                    html += '<div class="build-name">' + (build.name || 'Untitled Solution') + '</div>';
                    html += '<div class="build-meta">' + getRelativeTime(build.lastAccessed) + '</div>';
                    html += '<span class="status-badge status-' + build.status + '">' + build.status.charAt(0).toUpperCase() + build.status.slice(1) + '</span>';
                    html += '</div></div></div>';
                    
                    if (canDelete) {
                        html += '<button class="delete-btn" onclick="event.stopPropagation(); deleteBuild(\'' + build.id + '\')" title="Delete" style="position: absolute; top: 0.5rem; right: 0.5rem; background: #EF4444; color: white; border: none; border-radius: 4px; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.75rem;"><i class="fas fa-trash"></i></button>';
                    }
                    
                    if (canArchive) {
                        html += '<button class="archive-btn" onclick="event.stopPropagation(); archiveBuild(\'' + build.id + '\')" title="Archive" style="position: absolute; top: 0.5rem; right: 0.5rem; background: #6B7280; color: white; border: none; border-radius: 4px; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.75rem;"><i class="fas fa-archive"></i></button>';
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
                return {
                    siteName: document.querySelector('input[placeholder*="site name"]')?.value || '',
                    campusType: document.querySelector('select')?.value || '',
                    students: document.querySelector('input[placeholder*="students"]')?.value || '',
                    staff: document.querySelector('input[placeholder*="staff"]')?.value || '',
                    address: document.querySelector('input[placeholder*="address"]')?.value || ''
                };
            }
            
            // Auto-save current build
            function autoSaveCurrent() {
                if (!currentBuildId) return;
                
                const build = builds.find(b => b.id === currentBuildId);
                if (!build) return;
                
                build.data = getCurrentFormData();
                build.name = build.data.siteName || 'New Solution';
                build.lastAccessed = new Date().toISOString();
                
                saveBuilds();
                
                console.log('💾 AUTO-SAVED:', build.name);
            }
            
            // Create new build
            function createNewBuild() {
                // Auto-save current build before creating new one
                autoSaveCurrent();
                
                // Create new build
                const newBuild = {
                    id: Date.now().toString(),
                    name: 'New Solution',
                    status: 'saved',
                    target: '',
                    lastAccessed: new Date().toISOString(),
                    data: {}
                };
                
                builds.unshift(newBuild); // Add to beginning (most recent)
                saveBuilds();
                currentBuildId = newBuild.id;
                
                // Clear all form inputs
                document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
                    if (input.type === 'checkbox') {
                        input.checked = false;
                    } else if (input.type === 'radio') {
                        input.checked = false;
                    } else {
                        input.value = '';
                    }
                });
                
                // Reset radio buttons to default (first option)
                const firstRadio = document.querySelector('input[type="radio"]');
                if (firstRadio) firstRadio.checked = true;
                
                // Reset all steps to inactive
                document.querySelectorAll('.step-item').forEach(step => {
                    step.classList.remove('active', 'completed');
                });
                
                // Activate first step
                document.querySelector('.step-item').classList.add('active');
                
                // Show first step content
                document.querySelectorAll('.config-card').forEach(card => {
                    card.style.display = 'none';
                });
                const firstCard = document.querySelector('.config-card');
                if (firstCard) firstCard.style.display = 'block';
                
                // Update UI
                renderBuilds();
                
                // Set focus to first input field
                const firstInput = document.querySelector('.form-input');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 100);
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
                
                // Load form data
                if (build.data) {
                    const siteNameInput = document.querySelector('input[placeholder*="site name"]');
                    if (siteNameInput) siteNameInput.value = build.data.siteName || '';
                    
                    const campusTypeSelect = document.querySelector('select');
                    if (campusTypeSelect) campusTypeSelect.value = build.data.campusType || '';
                    
                    const studentsInput = document.querySelector('input[placeholder*="students"]');
                    if (studentsInput) studentsInput.value = build.data.students || '';
                    
                    const staffInput = document.querySelector('input[placeholder*="staff"]');
                    if (staffInput) staffInput.value = build.data.staff || '';
                    
                    const addressInput = document.querySelector('input[placeholder*="address"]');
                    if (addressInput) addressInput.value = build.data.address || '';
                }
                
                // Update UI
                renderBuilds();
                
                console.log('📂 BUILD LOADED');
                console.log('Build:', build.name);
                console.log('Status:', build.status);
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
                document.getElementById('left-sidebar').classList.toggle('open');
            }
            
            function toggleRightSidebar() {
                document.getElementById('right-sidebar').classList.toggle('open');
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
