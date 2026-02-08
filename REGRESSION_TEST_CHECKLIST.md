# EduConnect Solution Builder - Regression Test Checklist

## Test Environment
- **Last Updated**: 2026-02-07
- **Current Commit**: abb376e
- **Branch**: main
- **Live URL**: https://3000-ihz6ps7hsriy71demiu2p-b32ec7bb.sandbox.novita.ai/solution-builder

## Critical Functionality Tests

### 1. Authentication & Onboarding (Delivery 1)
- [ ] OTP Login - Phone number
- [ ] OTP Login - Email address
- [ ] User Onboarding - Personal Details
- [ ] User Onboarding - Role Selection (Student/Teacher)
- [ ] KYC - ID Number validation
- [ ] KYC - School/Institution selection
- [ ] Session persistence (localStorage)

### 2. Build Management
- [ ] **NEW SOLUTION BUTTON** - Creates new build
- [ ] **RECENT HISTORY** - Loads saved builds from localStorage
- [ ] Build Details - Name input
- [ ] Build Details - Description textarea
- [ ] Build switching between existing builds
- [ ] Auto-save functionality

### 3. Target Management (Delivery 2)
- [ ] Add Target button - Opens modal
- [ ] Select Target Type - Person/Site/Asset
- [ ] Target card displays with correct icon and color
- [ ] Delete target with confirmation
- [ ] Empty state message when no targets

### 4. Target Details (Delivery 3)
- [ ] **Person Details**:
  - [ ] Student ID / Staff ID (role-based)
  - [ ] Name field
  - [ ] Grade/Department dropdown
- [ ] **Site Details**:
  - [ ] Site Name field
  - [ ] Site Type dropdown (Campus/School/Branch/Facility)
  - [ ] Address field
- [ ] **Asset Details**:
  - [ ] Asset Name field
  - [ ] Serial Number field
- [ ] Auto-save on field change
- [ ] Validation messages

### 5. Solution Selection (Delivery 4)
- [ ] Solution hierarchy dropdowns (Solution/Product/Package)
- [ ] Compatibility rules (target type filters solutions)
- [ ] Quantity input (default 1)
- [ ] Add Solution button
- [ ] Remove Solution button (with confirmation)
- [ ] Mandatory solution enforcement:
  - [ ] EduStudent: requires Education Prepaid + AI-Mobile
  - [ ] EduFlex: requires Uncapped Wireless
  - [ ] EduSchool: requires Education Fibre
- [ ] Completion badges (Complete/Incomplete/Pending)
- [ ] **MOBILE**: Stack solution dropboxes vertically
- [ ] **MOBILE**: Icon-only completion badges
- [ ] **MOBILE**: Icon-only remove button

### 6. Commercials Review (Delivery 5)
- [ ] **Bill Due** label (not Annual Total)
- [ ] Once-off setup cost display
- [ ] Monthly recurring cost display
- [ ] Contract term selector (0/6/12/24 months)
- [ ] 24-month discount badge (10%)
- [ ] Discount code input
- [ ] Discount code validation (EDUDEMO/LAUNCH10/PROMO5)
- [ ] **Bill Due calculation**: Setup + 1st month (not annual)
- [ ] **Save Build action** - Updates status to 'saved'
- [ ] **Generate Offer action** - Updates status to 'offered'
- [ ] **Activate Build action** - Updates status to 'active'
- [ ] **Archive button** - Archives active/offered builds
- [ ] **Status badges** display correctly (Saved/Offered/Active/Archived)
- [ ] **Status colors**:
  - [ ] Saved - Green (#D1FAE5 / #065F46)
  - [ ] Offered - Yellow (#FEF3C7 / #92400E)
  - [ ] Active - Blue (#DBEAFE / #1E40AF)
  - [ ] Archived - Gray (#E5E7EB / #374151)

### 7. UI Components - Desktop (>1024px)
- [ ] Left Sidebar - Navigation
- [ ] Right Sidebar - AI Assistant (360px width)
- [ ] **AI Assistant X button** - Collapses to 48px
- [ ] **Chat FAB button** - Appears when collapsed
- [ ] **Chat FAB button** - Expands panel when clicked
- [ ] **Chat FAB button** - Hides when panel expanded
- [ ] Step navigation (5 steps)
- [ ] Progress indicator
- [ ] Action buttons (Back/Continue)

### 8. UI Components - Mobile (≤1024px)
- [ ] Left Sidebar - Slide-in from left
- [ ] Right Sidebar - Slide-in from right
- [ ] Sidebar Overlay - Appears with sidebars
- [ ] **Chat FAB button** - Opens right sidebar
- [ ] **Chat FAB button** - Reappears when closed
- [ ] Mobile menu button
- [ ] Collapsible sections
- [ ] Touch-friendly button sizes

### 9. Data Persistence
- [ ] localStorage - Saves builds
- [ ] localStorage - Saves current build ID
- [ ] localStorage - Loads on page refresh
- [ ] localStorage - Version check (future)

### 10. Error Handling
- [ ] Form validation messages
- [ ] Required field indicators
- [ ] Confirmation dialogs (delete/archive)
- [ ] Network error handling (future)
- [ ] Browser console errors (should be none)

## Known Issues & Fixes

### Issue History:
1. ✅ **FIXED**: Mobile sidebar not collapsing completely
2. ✅ **FIXED**: AI chat close button not working on mobile
3. ✅ **FIXED**: Solution selection dropboxes not stacking on mobile
4. ✅ **FIXED**: Completion badges showing full text on mobile
5. ✅ **FIXED**: Remove button showing full text on mobile
6. ✅ **FIXED**: JavaScript syntax error in alert strings (Delivery 5)
7. ✅ **FIXED**: AI chat panel not closing on desktop (inline styles issue)
8. ✅ **FIXED**: Bill Due label and calculation (was Annual Total)
9. ✅ **FIXED**: AI chat panel not expanding main content (grid layout)
10. ✅ **FIXED**: Status not changing from Saved (status management implemented)

### Current Status (Commit 4be809c):
- All known issues resolved
- Desktop and mobile AI chat panel working correctly
- Bill Due showing correct amount (Setup + 1st month)
- All 5 deliveries completed and functional
- **Status management complete**: Saved → Offered → Active → Archived

## CSS Specificity Learnings

### Critical Rule:
**Inline styles ALWAYS override CSS rules, regardless of specificity**

### Solution:
Use `element.style.removeProperty('property')` instead of setting to empty string

### Example:
```javascript
// ❌ WRONG - Empty string doesn't remove inline style
fab.style.display = '';

// ✅ CORRECT - Removes inline style, lets CSS rules work
fab.style.removeProperty('display');
```

### CSS Rule for FAB:
```css
/* Base state - hidden */
.chat-fab {
    display: none;
}

/* When sidebar collapsed - show FAB */
.right-sidebar.collapsed ~ .chat-fab {
    display: flex;
}
```

## Testing Instructions

### Manual Testing:
1. Open in desktop browser (>1024px width)
2. Click through all 5 steps
3. Test AI chat panel collapse/expand
4. Verify FAB button appears/disappears
5. Resize to mobile (<1024px)
6. Test all mobile interactions
7. Check browser console for errors

### Automated Testing (Future):
- Playwright tests for critical paths
- Visual regression tests
- Mobile device testing
- Cross-browser testing

## Deployment Checklist

Before each deployment:
- [ ] Run build: `npm run build`
- [ ] Check for JavaScript syntax errors
- [ ] Test in browser (desktop)
- [ ] Test in browser (mobile)
- [ ] Check browser console for errors
- [ ] Verify localStorage functionality
- [ ] Test all 5 workflow steps
- [ ] Commit with descriptive message
- [ ] Push to GitHub
- [ ] Update this checklist
