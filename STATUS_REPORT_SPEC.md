# Status Report - Feature Specification

## Overview
The Status Report page provides comprehensive analytics and insights into solution performance, revenue metrics, and activity tracking for EduConnect users.

## Page Structure

### 1. Header Bar
**Location**: Top of page  
**Components**:
- **Left Side**: EduConnect landscape logo + "Status Report" heading
- **Right Side**: Date range selector with calendar icon
  - Default: Current month (e.g., "Oct 1, 2023 - Oct 31, 2023")
  - Interactive: Click to change date range

### 2. Key Metrics Bar
**Layout**: 4-column grid (responsive: 2 columns on tablet, 1 column on mobile)

**Metric 1: Total Solutions**
- Icon: Layer group (yellow background #FFCB00)
- Value: Count of all solutions for current user
- Calculation: Total builds in localStorage
- Trend: "+12% vs last month" (calculated comparison)
- User Scope: 
  - Regular users: Only their solutions
  - Admin users: All solutions across all users

**Metric 2: Activated Solutions**
- Icon: Chart line (blue background #DBEAFE)
- Value: Count of solutions with status === 'active'
- Calculation: Filter builds where status === 'active'
- Trend: "+8% vs last week"

**Metric 3: Next Payment**
- Icon: Money bill wave (green background #D1FAE5)
- Value: Sum of next monthly payments due
- Calculation: Sum of all monthly recurring costs for active solutions
- Trend: "+8% growth"
- Pricing Logic:
  - EduStudent: Selected option price × quantity
  - AI-Mobile: R25 × quantity
  - EduFlex: Selected option price × quantity
  - EduSchool: Selected option price × quantity
  - Campus WiFi: R450 × quantity
  - EduSafe: Selected option price × quantity

**Metric 4: YTD Payments**
- Icon: Filter (orange background #FEF3C7)
- Value: Sum of payments for the year-to-date
- Calculation: Next Payment × 12 (annualized estimate)
- Trend: "+2% improvement"

### 3. Tab Navigation
**Tabs**:
1. **Overview** (Default active)
   - Shows all solutions aggregated
   
2. **By Solution** (Dropdown)
   - EduStudent
   - EduFlex
   - EduSchool
   - EduSafe
   - Filters charts and table by selected solution type
   
3. **By Target** (Dropdown)
   - Persons
   - Sites
   - Assets
   - Filters charts and table by target type

### 4. Charts Section
**Layout**: 2-column grid (responsive: 1 column on mobile)

#### Chart 1: Monthly Spend
- **Type**: Multi-line chart (Chart.js)
- **X-axis**: Last 5 months (Jul, Aug, Sep, Oct, Nov)
- **Y-axis**: Spend amount (in thousands)
- **Lines**:
  - EduStudent (Yellow #FFCB00)
  - EduSchool (Blue #1E40AF)
  - EduFlex (Green #10B981)
- **Features**: 
  - Filled area under lines
  - Smooth curves (tension: 0.4)
  - Legend at bottom
  - Responsive canvas

#### Chart 2: Solution Profile
- **Type**: Multi-line chart (Chart.js)
- **X-axis**: Last 5 months (Jul, Aug, Sep, Oct, Nov)
- **Y-axis**: Revenue/count
- **Lines**:
  - EduStudent (Yellow #FFCB00)
  - EduSchool (Blue #1E40AF)
  - EduFlex (Green #10B981)
- **Features**: Same as Monthly Spend chart

### 5. Recent Activity Table
**Layout**: Full-width table with 6 columns

**Columns**:
1. **Build Name**: Solution name (bold)
2. **Target**: Target type (Person/Site/Asset)
3. **Solution**: Primary solution name (abbreviated)
4. **Status**: Badge with color coding
   - Active: Blue (#DBEAFE)
   - Offered: Yellow (#FEF3C7)
   - Saved: Green (#D1FAE5)
5. **Amount**: Monthly recurring amount (R format)
6. **Date**: Last accessed date (formatted)

**Features**:
- Shows 6 most recent solutions
- Sorted by lastAccessed (descending)
- Hover effect on rows
- Empty state message if no solutions

## Data Sources

### localStorage Structure
```javascript
{
  educonnect_builds: [
    {
      id: "timestamp",
      name: "Solution Name",
      status: "saved|offered|active|archived",
      lastAccessed: "ISO 8601 date string",
      data: {
        solutionName: "string",
        targets: [
          {
            type: "Person|Site|Asset",
            solutions: [
              {
                name: "Solution Name - Description",
                selectedOption: { price: "number" },
                quantity: number
              }
            ]
          }
        ]
      }
    }
  ]
}
```

## Responsive Behavior

### Desktop (>1024px)
- 4-column metrics grid
- 2-column charts grid
- Full table with all columns

### Tablet (641px - 1024px)
- 2-column metrics grid
- 1-column charts grid
- Full table with reduced padding

### Mobile (≤640px)
- 1-column metrics grid
- 1-column charts grid
- Scrollable table with smaller fonts
- Tabs wrap to multiple rows
- Date selector full width

## Color Scheme

### Primary Colors
- MTN Yellow: #FFCB00 (primary actions, EduStudent)
- Black: #000 (headings, primary text)
- Background: #F9FAFB

### Status Colors
- Active: #DBEAFE (background), #1E40AF (text)
- Offered: #FEF3C7 (background), #92400E (text)
- Saved: #D1FAE5 (background), #065F46 (text)

### Chart Colors
- Yellow: #FFCB00 (EduStudent)
- Blue: #1E40AF (EduSchool)
- Green: #10B981 (EduFlex)

## Navigation
- **Route**: `/reports`
- **Access**: Click "Reports" in main navigation
- **Header Link**: Updates to show active state

## Technical Implementation

### Dependencies
- Chart.js 4.4.0 (CDN)
- Font Awesome 6.4.0 (icons)
- Tailwind CSS (utility classes)
- MTN Brighter Sans (typography)

### JavaScript Functions
1. `loadBuilds()` - Load builds from localStorage
2. `calculateMetrics()` - Calculate and display 4 key metrics
3. `renderActivityTable()` - Populate recent activity table
4. `initCharts()` - Initialize Chart.js line charts
5. `switchTab(tab)` - Handle tab switching
6. `filterBySolution(solution)` - Filter by solution type
7. `filterByTarget(target)` - Filter by target type

### Performance Considerations
- Charts rendered on DOMContentLoaded
- Lazy loading for chart library
- Efficient DOM updates
- Minimal re-renders

## Future Enhancements
1. **Real Date Picker**: Interactive date range selection
2. **Export Functionality**: PDF/CSV export
3. **Drill-down**: Click metrics to see detailed views
4. **Real-time Data**: API integration for live data
5. **Custom Filters**: Advanced filtering options
6. **Comparison View**: Compare multiple periods
7. **Email Reports**: Scheduled report delivery

## Testing Checklist
- [ ] All 4 metrics display correctly
- [ ] Charts render without errors
- [ ] Table shows recent solutions
- [ ] Tab switching works
- [ ] Dropdown filters work
- [ ] Responsive on all screen sizes
- [ ] Date selector displays correctly
- [ ] Status badges have correct colors
- [ ] Amounts formatted correctly (R currency)
- [ ] Empty states handled gracefully
- [ ] Navigation link shows active state
- [ ] Logo displays correctly

## Version History
- **v1.0.0** (2026-02-08): Initial Status Report implementation
  - 4 key metrics
  - 2 line charts
  - Recent activity table
  - Tab navigation with filters
  - Responsive design
  - Integration with localStorage

---

**Last Updated**: February 8, 2026  
**Status**: ✅ Complete  
**Live URL**: https://3000-ihz6ps7hsriy71demiu2p-b32ec7bb.sandbox.novita.ai/reports
