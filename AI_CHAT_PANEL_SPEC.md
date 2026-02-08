# AI Chat Panel Functionality Specification

## Current State Investigation (Before Fix)

### Desktop Behavior (>1024px):
- [ ] Panel visible by default at 360px width
- [ ] Click X button → Should collapse to 48px
- [ ] Click X button → Should show FAB button
- [ ] FAB button hidden when panel open
- [ ] FAB button visible when panel collapsed

### Mobile Behavior (≤1024px):
- [ ] Panel off-screen by default (right: -360px)
- [ ] Click FAB button → Panel slides in (right: 0)
- [ ] Overlay appears
- [ ] Click X button → Panel slides out (right: -360px)
- [ ] Overlay disappears
- [ ] FAB button reappears

### CSS Classes:
- `.right-sidebar.collapsed` - Desktop collapsed state (48px width)
- `.right-sidebar.open` - Mobile open state (right: 0)
- `.chat-fab` - Floating action button

### JavaScript Functions:
- `toggleAssistant()` - Called by X button in panel header
- `toggleRightSidebar()` - Called by FAB button
- Window width check: `window.innerWidth <= 1024`

## Issues to Fix:
1. Desktop X button not working properly
2. FAB button not appearing after close
3. Need proper state management

## Requirements:
- Desktop and mobile must work independently
- No cross-contamination of mobile/desktop states
- FAB visibility must be mutually exclusive with panel open state

## Root Cause Analysis:
1. **Inline styles override CSS** - The CSS rule `.right-sidebar.collapsed ~ .chat-fab { display: flex; }` was being overridden by inline styles
2. **toggleAssistant()** - Desktop was setting `fab.style.display = ''` which doesn't remove the inline style, causing browser to ignore CSS rules
3. **toggleRightSidebar()** - Was explicitly setting inline styles that prevented CSS rules from working

## Critical Understanding:
- **CSS Specificity**: Inline styles ALWAYS override CSS rules
- **CSS Rule**: `.right-sidebar.collapsed ~ .chat-fab { display: flex; }` should automatically show FAB when sidebar is collapsed
- **CSS Rule**: `.chat-fab { display: none; }` is the default state
- **Solution**: Remove ALL inline styles and let CSS handle the display logic

## Fix Applied (FINAL):
### toggleAssistant() (X button):
- Desktop: Toggle `.collapsed` class only
- Desktop: Remove ALL inline styles using `fab.style.removeProperty('display')` and `removeProperty('opacity')`
- Desktop: Let CSS rule `.right-sidebar.collapsed ~ .chat-fab` handle FAB visibility
- Mobile: Unchanged (uses open class + overlay + inline styles for mobile-specific behavior)

### toggleRightSidebar() (FAB button):
- Desktop: Remove `.collapsed` class only
- Desktop: Remove ALL inline styles to let CSS hide FAB
- Mobile: Use open class + overlay + inline styles

## Expected Behavior After Fix:
### Desktop (>1024px):
1. Panel starts expanded (360px)
2. Click X → collapsed class added → panel 48px → FAB appears
3. Click FAB → collapsed class removed → panel 360px → FAB hidden
4. **Main content area expands to fill available space when collapsed**
5. **No white space or visible chat text when collapsed**

### Mobile (≤1024px):
1. Panel starts off-screen
2. Click FAB → open class added → panel slides in → overlay appears
3. Click X → open class removed → panel slides out → FAB appears

## Layout Fix (Added):
### Grid Layout Change:
- **Before**: `grid-template-columns: 240px 1fr 360px;` (fixed 360px for right sidebar)
- **After**: `grid-template-columns: 240px 1fr auto;` (auto-sizing for right sidebar)

### Right Sidebar CSS:
- **Default width**: `360px` (expanded state)
- **Collapsed width**: `48px` (collapsed state)
- **Transition**: `width 0.3s ease` (smooth animation)
- **Overflow**: `hidden` (prevents text from showing when collapsed)

### Result:
- Main content area automatically expands when sidebar collapses
- No visible chat text or white space when collapsed
- Smooth transition animation
