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
    </head>
    <body class="bg-gray-100">
        <div class="container mx-auto p-8">
            <div class="card text-center">
                <img src="/static/images/logos/mtn-educonnect-logo.png" alt="EduConnect" style="height: 120px; margin: 0 auto 2rem;">
                <h1 class="mb-4">Welcome to EduConnect!</h1>
                <p class="text-secondary mb-4">Dashboard coming soon...</p>
                <a href="/" class="btn btn-primary">Back to Login</a>
            </div>
        </div>
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

// Health check
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok', 
    service: 'educonnect', 
    version: '1.0.0' 
  })
})

export default app
