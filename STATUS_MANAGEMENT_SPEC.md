# Build Status Management Specification

## Status Flow

```
┌─────────┐
│  SAVED  │ ◄─── Initial state when build is created
└────┬────┘
     │
     │ Save button
     ▼
┌─────────┐
│  SAVED  │ ◄─── Draft state (can edit, can delete)
└────┬────┘
     │
     │ Generate Offer button
     ▼
┌──────────┐
│ OFFERED  │ ◄─── Offer generated (can archive)
└────┬─────┘
     │
     │ Activate button
     ▼
┌─────────┐
│ ACTIVE  │ ◄─── Service active (can archive)
└────┬────┘
     │
     │ Archive button
     ▼
┌──────────┐
│ARCHIVED │ ◄─── Historical record (read-only)
└──────────┘
```

## Status Definitions

### 1. SAVED (Draft)
- **Color**: Green (#D1FAE5 / #065F46)
- **Description**: Draft solution being worked on
- **Actions Available**:
  - ✅ Edit
  - ✅ Delete
  - ✅ Save (keeps status as saved)
  - ✅ Generate Offer (changes to offered)
  - ✅ Activate (changes to active)
- **Buttons in Recent History**: Delete (red trash icon)

### 2. OFFERED
- **Color**: Yellow (#FEF3C7 / #92400E)
- **Description**: Offer has been generated for customer
- **Actions Available**:
  - ✅ Edit
  - ✅ Archive
  - ✅ Activate (changes to active)
  - ❌ Delete (only saved builds can be deleted)
- **Buttons in Recent History**: Archive (gray archive icon)

### 3. ACTIVE
- **Color**: Blue (#DBEAFE / #1E40AF)
- **Description**: Service is active and running
- **Actions Available**:
  - ✅ View
  - ✅ Archive
  - ❌ Edit (active services should not be edited)
  - ❌ Delete (only saved builds can be deleted)
- **Buttons in Recent History**: Archive (gray archive icon)

### 4. ARCHIVED
- **Color**: Gray (#E5E7EB / #374151)
- **Description**: Historical record, no longer active
- **Actions Available**:
  - ✅ View only
  - ❌ Edit
  - ❌ Delete
  - ❌ Archive (already archived)
- **Buttons in Recent History**: None (read-only)

## Action Buttons in Step 5

### Save Button
- **Icon**: fa-save
- **Color**: Gray (#F3F4F6)
- **Function**: `saveBuild()`
- **Behavior**:
  - Keeps status as 'saved'
  - Updates lastAccessed timestamp
  - Auto-saves all changes
  - Re-renders build list
  - Shows success message

### Generate Offer Button
- **Icon**: fa-file-invoice
- **Color**: Gray (#F3F4F6)
- **Function**: `generateOffer()`
- **Behavior**:
  - Changes status to 'offered'
  - Updates lastAccessed timestamp
  - Auto-saves changes
  - Re-renders build list
  - Shows offer details in alert
  - Logs status change

### Activate Button
- **Icon**: fa-check-circle
- **Color**: MTN Yellow (#FFCB00)
- **Function**: `activateBuild()`
- **Behavior**:
  - Shows confirmation dialog with Bill Due amount
  - Changes status to 'active' (after confirmation)
  - Updates lastAccessed timestamp
  - Auto-saves changes
  - Re-renders build list
  - Shows success message
  - Logs status change

### Archive Button
- **Icon**: fa-archive
- **Color**: Gray (#6B7280)
- **Function**: `archiveCurrentBuild()`
- **Behavior**:
  - Only works for 'active' or 'offered' builds
  - Shows confirmation dialog
  - Changes status to 'archived'
  - Updates lastAccessed timestamp
  - Saves changes
  - Re-renders build list
  - Logs status change

## Status Filter in Left Sidebar

Users can filter builds by status:
- **All Solutions** - Shows all builds
- **Saved** - Shows only draft builds
- **Offered** - Shows only offered builds
- **Active** - Shows only active builds
- **Archived** - Shows only archived builds

## Implementation Details

### Build Object Structure
```javascript
{
    id: "1707849600000",
    name: "Student Connectivity Solution",
    status: "saved", // "saved" | "offered" | "active" | "archived"
    lastAccessed: "2024-02-13T10:00:00.000Z",
    data: {
        solutionName: "Student Connectivity Solution",
        targets: [...]
    }
}
```

### Status Update Functions

#### saveBuild()
```javascript
build.status = 'saved';
build.lastAccessed = new Date().toISOString();
autoSaveCurrent();
renderBuilds();
```

#### generateOffer()
```javascript
build.status = 'offered';
build.lastAccessed = new Date().toISOString();
autoSaveCurrent();
renderBuilds();
```

#### activateBuild()
```javascript
if (confirm(...)) {
    build.status = 'active';
    build.lastAccessed = new Date().toISOString();
    autoSaveCurrent();
    renderBuilds();
}
```

#### archiveBuild()
```javascript
if (build.status !== 'active' && build.status !== 'offered') {
    alert('Only active or offered solutions can be archived.');
    return;
}
if (confirm(...)) {
    build.status = 'archived';
    build.lastAccessed = new Date().toISOString();
    saveBuilds();
    renderBuilds();
}
```

## Status Badge CSS

```css
.status-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    margin-top: 0.5rem;
}

.status-saved {
    background: #D1FAE5;
    color: #065F46;
}

.status-offered {
    background: #FEF3C7;
    color: #92400E;
}

.status-active {
    background: #DBEAFE;
    color: #1E40AF;
}

.status-archived {
    background: #E5E7EB;
    color: #374151;
}
```

## User Experience Flow

### Typical User Journey:

1. **Create New Solution**
   - User clicks "New Solution"
   - Status: SAVED (green)
   - User completes Steps 1-4

2. **Review and Save**
   - User goes to Step 5
   - Reviews pricing
   - Clicks "Save" button
   - Status remains: SAVED

3. **Generate Offer**
   - User clicks "Generate Offer"
   - Status changes: SAVED → OFFERED (yellow)
   - Build list updates automatically

4. **Activate Service**
   - User clicks "Activate"
   - Confirms Bill Due amount
   - Status changes: OFFERED → ACTIVE (blue)
   - Build list updates automatically

5. **Archive Old Service**
   - User clicks "Archive" button
   - Confirms archival
   - Status changes: ACTIVE → ARCHIVED (gray)
   - Build list updates automatically

## Testing Checklist

- [ ] Create new build → Status is 'saved'
- [ ] Click Save → Status remains 'saved'
- [ ] Click Generate Offer → Status changes to 'offered'
- [ ] Click Activate → Status changes to 'active'
- [ ] Click Archive → Status changes to 'archived'
- [ ] Status badges display correct colors
- [ ] Build list filters work correctly
- [ ] Delete button only shows for 'saved' builds
- [ ] Archive button only shows for 'active'/'offered' builds
- [ ] No buttons show for 'archived' builds
- [ ] Status persists after page refresh (localStorage)
