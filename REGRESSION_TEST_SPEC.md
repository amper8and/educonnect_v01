# EduConnect Solution Builder - Regression Test Specification

**Version**: 1.0  
**Last Updated**: 2026-02-07  
**Current Stable Commit**: `8059883` - Fix: Replace escaped quotes with HTML entities in onclick handlers

---

## 🎯 Purpose

This document defines the regression testing guardrails to prevent functionality breakage when implementing new features or fixes. All changes must pass these tests before deployment.

---

## 🛡️ Regression Testing Guardrails

### Core Principles

1. **Test Before Deploy**: Run all regression tests before any deployment
2. **Fix Forward Only**: Never introduce new bugs while fixing old ones
3. **Incremental Changes**: Make small, testable changes with clear rollback points
4. **Document Changes**: Update this spec after each major feature addition

### Testing Workflow

```
1. Save Current State (git commit)
2. Make Changes
3. Run All Regression Tests (see sections below)
4. If ANY test fails:
   - Roll back (git reset --hard LAST_STABLE_COMMIT)
   - Fix issue in isolation
   - Retry from step 1
5. If ALL tests pass:
   - Commit changes
   - Update this document
   - Deploy
```

---

## 📋 Regression Test Checklist

### ✅ Phase 1: Core Functionality Tests

#### 1.1 Page Load & Initialization
- [ ] Navigate to `/solution-builder`
- [ ] Page loads without JavaScript errors (check browser console)
- [ ] No "Unexpected token" or "Unexpected string" errors
- [ ] Console shows: `🚀 SOLUTION BUILDER INITIALIZED`
- [ ] Console shows: `Total Builds: N` (where N ≥ 0)

**Pass Criteria**: Zero JavaScript parse/syntax errors, initialization log appears

---

#### 1.2 New Solution Creation
- [ ] Click "New Solution" button
- [ ] Console shows: `✨ NEW SOLUTION CREATED`
- [ ] Console shows: `Build ID: [timestamp]`
- [ ] New build appears in left sidebar "Recent History"
- [ ] New build is marked as "active" (highlighted)
- [ ] Form fields are cleared/reset to defaults
- [ ] New build has name "New Solution" until edited

**Pass Criteria**: New solution created, appears in history, becomes active

---

#### 1.3 Build History Persistence
- [ ] Create a new solution with a unique name (e.g., "Test Solution A")
- [ ] Refresh the page (F5)
- [ ] Verify "Test Solution A" still appears in Recent History
- [ ] Verify "Test Solution A" is still the active build
- [ ] Create another solution "Test Solution B"
- [ ] Verify both solutions appear in Recent History
- [ ] Verify "Test Solution B" is now active (most recent at top)

**Pass Criteria**: Solutions persist across page refreshes via localStorage

---

#### 1.4 Build Switching
- [ ] Create two solutions: "Solution 1" and "Solution 2"
- [ ] Enter unique data in "Solution 1" (e.g., site name "Campus A")
- [ ] Click on "Solution 2" in Recent History
- [ ] Verify "Solution 2" becomes active (highlighted)
- [ ] Verify form shows "Solution 2" data (empty or different)
- [ ] Click back on "Solution 1"
- [ ] Verify "Solution 1" data is restored ("Campus A")

**Pass Criteria**: Switching builds loads correct data, no data loss

---

#### 1.5 Auto-Save Functionality
- [ ] Create a new solution
- [ ] Enter site name: "Auto-Save Test"
- [ ] Wait 1 second (auto-save triggers on input change)
- [ ] Check console for: `💾 AUTO-SAVED: Auto-Save Test`
- [ ] Refresh page
- [ ] Verify "Auto-Save Test" appears in Recent History with correct name

**Pass Criteria**: Changes auto-save on input, persist after refresh

---

### ✅ Phase 2: Build Management Tests

#### 2.1 Delete Build (Saved Status Only)
- [ ] Create a new solution (status = "saved" by default)
- [ ] Verify trash icon appears on the build item
- [ ] Click trash icon
- [ ] Confirm deletion in dialog
- [ ] Verify build is removed from Recent History
- [ ] Verify console logs the deletion

**Pass Criteria**: Only "saved" builds can be deleted, deletion works correctly

---

#### 2.2 Archive Build (Active/Offered Status)
- [ ] Create a solution and change status to "active" (via manual edit or activation)
- [ ] Verify archive icon appears on the build item
- [ ] Click archive icon
- [ ] Confirm archiving in dialog
- [ ] Verify build status changes to "archived"
- [ ] Verify build moves in list according to sort order
- [ ] Verify console logs the archiving

**Pass Criteria**: "Active" and "offered" builds can be archived, status updates correctly

---

#### 2.3 Status Filtering
- [ ] Create builds with different statuses: saved, active, archived
- [ ] Select "Saved" from status filter dropdown
- [ ] Verify only "saved" builds appear
- [ ] Select "Active" from filter
- [ ] Verify only "active" builds appear
- [ ] Select "All" from filter
- [ ] Verify all builds appear
- [ ] Check console for: `🔍 FILTER APPLIED: [status]`

**Pass Criteria**: Filter correctly shows/hides builds by status

---

### ✅ Phase 3: Form Interaction Tests

#### 3.1 Form Input Validation
- [ ] Try to proceed without entering required fields
- [ ] Verify validation messages appear
- [ ] Enter valid data in all required fields
- [ ] Verify validation passes

**Pass Criteria**: Required fields are validated before proceeding

---

#### 3.2 Coverage Options Selection
- [ ] Click on "Indoor" coverage option
- [ ] Verify "Indoor" option is highlighted (selected class)
- [ ] Click on "Outdoor" coverage option
- [ ] Verify "Outdoor" becomes selected
- [ ] Verify "Indoor" is deselected
- [ ] Verify only one option can be selected at a time

**Pass Criteria**: Radio-style selection works for coverage options

---

#### 3.3 Auto-Expand Textarea (AI Assistant)
- [ ] Type multiple lines in AI assistant chat input
- [ ] Verify textarea expands to fit content
- [ ] Verify no scrollbar appears inside textarea
- [ ] Verify height adjusts dynamically

**Pass Criteria**: Textarea auto-expands based on content

---

### ✅ Phase 4: UI/UX Tests

#### 4.1 Three-Panel Layout
- [ ] Verify left sidebar (240px wide) contains:
  - "New Solution" button at top
  - "Recent History" section
  - List of builds with icons and status badges
- [ ] Verify main content area (center, flexible width) contains:
  - Configuration form
  - Input fields, selects, textareas
- [ ] Verify right sidebar (360px wide) contains:
  - AI Assistant panel
  - Chat interface

**Pass Criteria**: All three panels render correctly with proper widths

---

#### 4.2 Active Build Highlighting
- [ ] Click on a build in Recent History
- [ ] Verify build has "active" class (highlighted background)
- [ ] Click on a different build
- [ ] Verify first build loses "active" class
- [ ] Verify second build gains "active" class

**Pass Criteria**: Only one build is highlighted as active at a time

---

#### 4.3 Status Badges
- [ ] Verify each build shows a status badge
- [ ] Verify badge colors match status:
  - Saved = Gray
  - Active = Green
  - Offered = Blue
  - Archived = Red
- [ ] Verify badge text is capitalized (e.g., "Saved", not "saved")

**Pass Criteria**: Status badges display correct color and text

---

### ✅ Phase 5: Edge Cases & Error Handling

#### 5.1 Empty State Handling
- [ ] Clear localStorage: `localStorage.clear()` in console
- [ ] Refresh page
- [ ] Verify page creates first build automatically
- [ ] Verify "Recent History" shows the new build
- [ ] Verify no errors in console

**Pass Criteria**: Empty state handled gracefully, first build auto-created

---

#### 5.2 Concurrent Builds
- [ ] Create 5+ solutions rapidly
- [ ] Verify all appear in Recent History
- [ ] Verify no duplicate IDs
- [ ] Verify most recent is at top
- [ ] Click on each build and verify data is isolated (no cross-contamination)

**Pass Criteria**: Multiple builds can exist without conflicts

---

#### 5.3 Long Text Handling
- [ ] Enter a very long site name (100+ characters)
- [ ] Verify text truncates or wraps properly in build list
- [ ] Verify full text is preserved in form when loading build

**Pass Criteria**: Long text doesn't break UI layout

---

#### 5.4 Special Characters in Data
- [ ] Enter site name with special characters: `Test "Solution" & <Script>`
- [ ] Save and switch to another build
- [ ] Switch back to the special character build
- [ ] Verify text is displayed correctly (not escaped or broken)
- [ ] Verify no XSS vulnerabilities (script doesn't execute)

**Pass Criteria**: Special characters handled safely

---

## 🔧 Known Issues & Workarounds

### Issue 1: Favicon 500 Error
**Status**: Non-critical, harmless  
**Description**: Browser requests `/favicon.ico`, server returns 500  
**Impact**: None (no functional impact)  
**Workaround**: Add favicon route or ignore error  

---

## 📝 Testing Commands

### Manual Browser Testing
```bash
# 1. Start service
cd /home/user/webapp && pm2 restart educonnect

# 2. Open browser
https://3000-[sandbox-id].e2b.dev/solution-builder

# 3. Open browser console (F12)
# 4. Run through checklist above
```

### Automated Console Log Verification
```bash
# Check for initialization logs
cd /home/user/webapp && \
  curl -s http://localhost:3000/solution-builder 2>&1 | \
  grep -E "(INITIALIZED|createNewBuild|autoSave)"
```

### localStorage Inspection
```javascript
// In browser console:
JSON.parse(localStorage.getItem('educonnect_builds'))
```

---

## 🚨 Red Flags: When to STOP and Rollback

**Immediately rollback if you see:**

1. ❌ **JavaScript Errors on Page Load**
   - "Unexpected token", "Unexpected string", "Syntax error"
   - → Roll back to last stable commit

2. ❌ **Build Creation Fails**
   - "New Solution" button doesn't work
   - No console log `✨ NEW SOLUTION CREATED`
   - → Roll back immediately

3. ❌ **Build List Doesn't Render**
   - Recent History is blank after creating solutions
   - → Roll back and debug localStorage

4. ❌ **Auto-Save Broken**
   - Data doesn't persist after refresh
   - No console log `💾 AUTO-SAVED`
   - → Roll back and check event listeners

5. ❌ **Data Loss or Corruption**
   - Switching builds shows wrong data
   - Data from one build appears in another
   - → Roll back IMMEDIATELY, critical bug

---

## 📊 Test Results Template

```
Date: YYYY-MM-DD
Commit: [hash]
Tester: [name]

Phase 1: Core Functionality
- [ ] Page Load & Initialization: PASS/FAIL
- [ ] New Solution Creation: PASS/FAIL
- [ ] Build History Persistence: PASS/FAIL
- [ ] Build Switching: PASS/FAIL
- [ ] Auto-Save Functionality: PASS/FAIL

Phase 2: Build Management
- [ ] Delete Build: PASS/FAIL
- [ ] Archive Build: PASS/FAIL
- [ ] Status Filtering: PASS/FAIL

Phase 3: Form Interaction
- [ ] Form Input Validation: PASS/FAIL
- [ ] Coverage Options Selection: PASS/FAIL
- [ ] Auto-Expand Textarea: PASS/FAIL

Phase 4: UI/UX
- [ ] Three-Panel Layout: PASS/FAIL
- [ ] Active Build Highlighting: PASS/FAIL
- [ ] Status Badges: PASS/FAIL

Phase 5: Edge Cases
- [ ] Empty State Handling: PASS/FAIL
- [ ] Concurrent Builds: PASS/FAIL
- [ ] Long Text Handling: PASS/FAIL
- [ ] Special Characters: PASS/FAIL

Overall: PASS/FAIL
Notes: [any observations]
```

---

## 📚 Version History

### v1.0 (2026-02-07) - Initial Stable Version
- **Commit**: `8059883`
- **Changes**: Fixed onclick handler quote escaping issue
- **Status**: All Phase 1-5 tests passing ✅
- **Features Working**:
  - Page loads without errors
  - New Solution creation
  - Build history persistence (localStorage)
  - Build switching and isolation
  - Auto-save on input change
  - Delete builds (saved status)
  - Archive builds (active/offered status)
  - Status filtering
  - Three-panel layout
  - Active build highlighting
  - Status badges with colors

---

## 🎯 Next Steps (Future Deliveries)

### Delivery 3: Multi-Step Workflow
- **Goal**: Add Step 1 (Solution Name) and Step 2 (Target Definition)
- **Tests to Add**:
  - Step navigation (Next/Back buttons)
  - Step validation (can't proceed without required data)
  - Step completion indicators
  - Step-specific auto-save

### Delivery 4: Target Details & Solution Selection
- **Goal**: Add Step 3 (Target Details) and Step 4 (Solution Selection)
- **Tests to Add**:
  - Conditional forms based on target type
  - Add/remove targets dynamically
  - Solution hierarchy (Solution > Product > Package)
  - Compatibility rules

### Delivery 5: Commercials Review
- **Goal**: Add Step 5 (Pricing & Actions)
- **Tests to Add**:
  - Pricing calculations
  - Discount application
  - Contract term selection
  - Action buttons (Activate, Save, Offer, Archive)
  - Status transitions

---

## 📞 Support

**Issue Reporting**: Document any regression in this format:
```
Issue: [brief description]
Commit: [hash where bug appeared]
Steps to Reproduce:
1. ...
2. ...
Expected: [what should happen]
Actual: [what actually happened]
```

**Escalation**: If a critical regression is found in production:
1. Immediately rollback to last stable commit
2. Document the issue
3. Create a fix in isolation
4. Re-run ALL regression tests before redeploying
